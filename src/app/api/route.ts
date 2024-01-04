import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'

interface SeoData {
  title: string
  description: string
  keywords: string[]
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

async function suggestions({ title, description, keywords }: SeoData) {
  console.log({ title, description, keywords })

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: 'system',
        content:
          'You are a helpful assistant that provides SEO suggestions. The goal is to optimize the title and description for search engines. Titles should be between 55 and 80 characters, and descriptions should be between 120 and 160 characters.',
      },
      {
        role: 'user',
        content: `Title: ${title}\nDescription: ${description}\n ${
          keywords.length > 0 ? `Keywords: ${keywords.join(',')}` : ''
        }`,
      },
    ],
  })

  // 'You are a helpful assistant that provides SEO suggestions. The goal is to optimize the title and description for search engines. Titles should be between 55 and 80 characters, and descriptions should be between 120 and 160 characters. If a keyword or keywords are provided, ensure that it appears in both the title and description.'

  const stream = OpenAIStream(response)
  console.log({ stream })
  // console.log(stream.choices[0].message)

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
  const keywords = keyword?.split(' ') ?? []

  const stream = await suggestions({ title, description, keywords })

  return new StreamingTextResponse(stream)
}
