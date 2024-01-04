import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'

interface SeoData {
  title: string
  description: string
  keywords: string[]
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is also the default, can be omitted
})

async function suggestions({ title, description, keywords }: SeoData) {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [{ role: 'user', content: 'Hello!' }],
  })

  const stream = OpenAIStream(response)
  console.log({ stream })
  console.log(stream.choices[0].message)

  return stream
}

export const runtime = 'edge'

export async function GET() {
  const data = {
    name: 'John Serrano',
    title: 'OpenAI',
  }

  return Response.json({ data })
}

export async function POST(req: Request) {
  const { title, description, keyword } = await req.json()
  const keywords = keyword?.split(' ') ?? ''

  const stream = await suggestions({ title, description, keywords })

  return new StreamingTextResponse(stream)
}
