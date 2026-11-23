import { createHash } from 'node:crypto'
import { isIP } from 'node:net'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { z } from 'zod'

const requestSchema = z.object({ messages: z.array(z.unknown()).min(1) })
const suggestionLimits = {
  chat: { bytes: 8 * 1024, characters: 2_000 },
  audit: { bytes: 64 * 1024, characters: 24_000 },
}

type SuggestionKind = keyof typeof suggestionLimits

let limiters: { perIp: Ratelimit; daily: Ratelimit } | undefined

function getLimiters() {
  if (limiters) return limiters

  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return

  const redis = new Redis({ url, token })
  const prefix = `seocheck-ai:suggestions:${process.env.VERCEL_ENV ?? process.env.NODE_ENV}`
  const options = { redis, timeout: 1_500, ephemeralCache: false as const }
  limiters = {
    perIp: new Ratelimit({ ...options, prefix: `${prefix}:ip`, limiter: Ratelimit.fixedWindow(5, '10 m') }),
    daily: new Ratelimit({ ...options, prefix: `${prefix}:daily`, limiter: Ratelimit.fixedWindow(100, '1 d') }),
  }
  return limiters
}

async function readSuggestion(req: Request, kind: SuggestionKind) {
  const contentType = req.headers.get('content-type')?.split(';')[0].trim().toLowerCase()
  if (contentType !== 'application/json') {
    return Response.json({ error: 'Se esperaba application/json.' }, { status: 415 })
  }

  const { bytes, characters } = suggestionLimits[kind]
  const tooLarge = () => Response.json({ error: 'La solicitud supera el tamaño permitido.' }, { status: 413 })
  if (Number(req.headers.get('content-length')) > bytes) return tooLarge()

  const invalid = () => Response.json({ error: 'La solicitud de sugerencias no es válida.' }, { status: 400 })
  const reader = req.body?.getReader()
  if (!reader) return invalid()

  try {
    const decoder = new TextDecoder('utf-8', { fatal: true })
    let size = 0
    let body = ''
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      size += value.byteLength
      if (size > bytes) {
        void reader.cancel().catch(() => {})
        return tooLarge()
      }
      body += decoder.decode(value, { stream: true })
    }

    const payload = requestSchema.safeParse(JSON.parse(body + decoder.decode()))
    if (!payload.success) return invalid()

    // These tools generate standalone suggestions, not a conversation.
    const message = z.object({ role: z.literal('user'), content: z.string().trim().min(1) })
      .safeParse(payload.data.messages.at(-1))
    if (!message.success) return invalid()
    if (message.data.content.length > characters) return tooLarge()

    return message.data
  } catch {
    return invalid()
  } finally {
    reader.releaseLock()
  }
}

export async function prepareSuggestion(req: Request, kind: SuggestionKind) {
  const message = await readSuggestion(req, kind)
  if (message instanceof Response) return message

  const unavailable = () => Response.json({ error: 'Las sugerencias con IA no están disponibles.' }, { status: 503 })
  try {
    const limits = getLimiters()
    if (!limits) return process.env.NODE_ENV === 'development' && !process.env.VERCEL ? message : unavailable()

    // Vercel overwrites this header with the visitor IP. Never trust a caller-supplied IP elsewhere.
    const ip = process.env.VERCEL ? req.headers.get('x-forwarded-for')?.trim() : undefined
    const key = ip && isIP(ip) ? createHash('sha256').update(ip).digest('hex') : 'unknown'

    for (const [limiter, identifier] of [[limits.perIp, key], [limits.daily, 'all']] as const) {
      const { success, reset, reason } = await limiter.limit(identifier)
      if (reason === 'timeout') return unavailable()
      if (!success) {
        return Response.json(
          { error: 'Se alcanzó el límite de sugerencias con IA. Intenta más tarde.' },
          { status: 429, headers: { 'Retry-After': String(Math.max(1, Math.ceil((reset - Date.now()) / 1_000))) } }
        )
      }
    }

    return message
  } catch {
    return unavailable()
  }
}
