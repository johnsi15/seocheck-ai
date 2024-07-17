import { CoreMessage, streamText } from 'ai'
import { openai } from '@ai-sdk/openai'

export const runtime = 'edge'

interface SeoData {
  title: string
  description: string
  keywords: string[]
}

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY environment variable is required.')
}

const defaultMessages: CoreMessage[] = [
  {
    role: 'system',
    content:
      'You are a helpful assistant that provides SEO suggestions. The goal is to optimize the title and description for search engines. Titles should be between 55 and 80 characters, and descriptions should be between 120 and 160 characters. If a keyword or keywords are provided, ensure that it appears in both the title and description. The answer must be in Spanish.',
  },
  {
    role: 'user',
    content: `Title: De la ilusión a la angustia: El ‘sueño americano’ convertido en pesadilla para una familia cucuteña\nDescription: Padres cucuteños ruegan ayuda para rescatar a su familia secuestrada en su ruta a los Estados Unidos.`,
  },
  {
    role: 'assistant',
    content: `Título: De la ilusión a la angustia: El ‘sueño americano’ de una familia cucuteña\nDescripción: Familia cucuteña vive angustia en travesía a EE. UU. Padres ruegan ayuda para rescatar seres queridos secuestrados en odisea del ‘sueño americano’.`,
  },
  {
    role: 'user',
    content: `Title: De la ilusión a la angustia: El ‘sueño americano’ convertido en pesadilla para una familia cucuteña\nDescription: Padres cucuteños ruegan ayuda para rescatar a su familia secuestrada en su ruta a los Estados Unidos.`,
  },
  {
    role: 'assistant',
    content: `Título: Pesadilla en ruta: Familia cucuteña ruega ayuda para rescatar a seres queridos\nDescripción: Esperanza de familia cucuteña se torna desesperación. Padres ruegan asistencia para liberar seres queridos secuestrados en peligrosa ruta hacia Estados Unidos.`,
  },
  {
    role: 'user',
    content: `Title: De la ilusión a la angustia: El ‘sueño americano’ convertido en pesadilla para una familia cucuteña\nDescription: Padres cucuteños ruegan ayuda para rescatar a su familia secuestrada en su ruta a los Estados Unidos.\n Keywords: familia cucuteña`,
  },
  {
    role: 'assistant',
    content: `Título: De la ilusión a la angustia: El ‘Sueño Americano’ de una familia cucuteña\nDescripción: Familia cucuteña vive angustia en travesía a EE. UU. Padres ruegan ayuda para rescatar seres queridos secuestrados en odisea del ‘Sueño Americano’.\nPalabra Clave: familia cucuteña`,
  },
]

async function suggestions({ messages }: { messages: CoreMessage[] }) {
  const result = await streamText({
    model: openai('gpt-3.5-turbo'),
    messages: [...defaultMessages, ...messages],
    temperature: 0.75,
  })

  return result
}

export async function GET() {
  const data = {
    name: 'John Serrano',
    title: 'OpenAI',
  }

  return Response.json({ data, status: 200 })
}

export async function POST(req: Request) {
  const { messages }: { messages: CoreMessage[] } = await req.json()

  const messageSuggestions = await suggestions({ messages })

  return messageSuggestions.toAIStreamResponse()
}
