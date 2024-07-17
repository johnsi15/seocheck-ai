import { CoreMessage, streamText } from 'ai'
import { openai } from '@ai-sdk/openai'

export const runtime = 'edge'

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY environment variable is required.')
}

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
