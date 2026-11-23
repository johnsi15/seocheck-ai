import { CoreMessage, streamText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { prepareSuggestion } from '@/lib/ai-suggestions'

export const runtime = 'nodejs'
export const maxDuration = 30

const defaultMessages: CoreMessage[] = [
  {
    role: 'system',
    content: `Como un asistente útil que proporciona sugerencias de SEO, tu objetivo es optimizar el título y la descripción para los motores de búsqueda. Debes proporcionar tres opciones de títulos y tres opciones de descripciones para cada entrada.

      Los títulos deben tener entre 55 y 80 caracteres.
      Las descripciones deben tener entre 120 y 160 caracteres.
      Si se proporcionan una palabra clave o palabras clave, asegúrate de que aparezcan en ambas, el título y la descripción.
      Proporciona las sugerencias en español.
    `,
  },
  {
    role: 'user',
    content: `Title: De la ilusión a la angustia: El ‘sueño americano’ convertido en pesadilla para una familia cucuteña\nDescription: Padres cucuteños ruegan ayuda para rescatar a su familia secuestrada en su ruta a los Estados Unidos.`,
  },
  {
    role: 'assistant',
    content: `Título:: De la ilusión a la angustia: El ‘sueño americano’ de una familia cucuteña\nDescripción:: Familia cucuteña vive angustia en travesía a EE. UU. Padres ruegan ayuda para rescatar seres queridos secuestrados en odisea del ‘sueño americano’.\nkeywords:: ilusión, angustia, sueño americano, familia cucuteña<break />Título:: El ‘sueño americano’ roto: La travesía angustiante de una familia cucuteña\nDescripción:: Familia cucuteña enfrenta angustia en su travesía hacia EE. UU. Padres desesperados buscan ayuda para rescatar a sus seres queridos secuestrados en la odisea del ‘sueño americano’.\nkeywords:: sueño americano roto, travesía angustiante, familia cucuteña<break />Título:: De Cúcuta a la desilusión la lucha de una familia por el ‘sueño americano’\nDescripción:: En su travesía hacia EE. UU., una familia cucuteña vive una angustiante odisea. Padres ruegan por ayuda para rescatar a sus seres queridos secuestrados en la búsqueda del ‘sueño americano’.keywords:: Cúcuta, desilusión, lucha, sueño americano, familia`,
  },
]

export async function POST(req: Request) {
  const message = await prepareSuggestion(req, 'chat')
  if (message instanceof Response) return message

  const result = await streamText({
    model: openai('gpt-3.5-turbo'),
    messages: [...defaultMessages, message],
    maxTokens: 600,
    maxRetries: 0,
    abortSignal: AbortSignal.any([req.signal, AbortSignal.timeout(25_000)]),
    temperature: 0.75,
  })

  return result.toAIStreamResponse()
}
