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
    messages: [
      {
        role: 'system',
        content:
          'You are a helpful assistant that provides SEO suggestions. The goal is to optimize the title and description for search engines. Titles should be between 55 and 80 characters, and descriptions should be between 120 and 160 characters. If a keyword or keywords are provided, ensure that it appears in both the title and description. The answer must be in Spanish.',
      },
      {
        role: 'user',
        content: `Title: De la ilusión a la angustia: El ‘sueño americano’ convertido en pesadilla para una familia cucuteña \n 
          Description: Padres cucuteños ruegan ayuda para rescatar a su familia secuestrada en su ruta a los Estados Unidos.`,
      },
      {
        role: 'assistant',
        content: `Título: De la ilusión a la angustia: El ‘sueño americano’ de una familia cucuteña \n 
          Descripción: Familia cucuteña vive angustia en travesía a EE. UU. Padres ruegan ayuda para rescatar seres queridos secuestrados en odisea del ‘sueño americano’.`,
      },
      {
        role: 'user',
        content: `Title: De la ilusión a la angustia: El ‘sueño americano’ convertido en pesadilla para una familia cucuteña \n 
          Description: Padres cucuteños ruegan ayuda para rescatar a su familia secuestrada en su ruta a los Estados Unidos.`,
      },
      {
        role: 'assistant',
        content: `Título: Pesadilla en ruta: Familia cucuteña ruega ayuda para rescatar a seres queridos \n 
          Descripción: Esperanza de familia cucuteña se torna desesperación. Padres ruegan asistencia para liberar seres queridos secuestrados en peligrosa ruta hacia Estados Unidos.`,
      },
      {
        role: 'user',
        content: `Title: De la ilusión a la angustia: El ‘sueño americano’ convertido en pesadilla para una familia cucuteña \n 
          Description: Padres cucuteños ruegan ayuda para rescatar a su familia secuestrada en su ruta a los Estados Unidos. \n Keywords: familia cucuteña`,
      },
      {
        role: 'assistant',
        content: `Título: De la ilusión a la angustia: El ‘Sueño Americano’ de una familia cucuteña \n
          Descripción: Familia cucuteña vive angustia en travesía a EE. UU. Padres ruegan ayuda para rescatar seres queridos secuestrados en odisea del ‘Sueño Americano’. \n Palabra Clave: familia cucuteña`,
      },
      {
        role: 'user',
        content: `Title: ${title}\nDescription: ${description}\n ${keywords.length > 0 ? `Keywords: ${keywords}` : ''}`,
      },
    ],
    stream: true,
  })

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
  const keywords = keyword ?? ''

  const stream = await suggestions({ title, description, keywords })

  return new StreamingTextResponse(stream)
}
