import { IconCopy } from './Icons'
import { Message } from 'ai'

interface Props {
  data: Message[]
  active?: boolean
}

export function Suggestions({ data }: Props) {
  const handleClipBoard = (text: string) => () => {
    navigator.clipboard.writeText(text)
    console.log('Copiado')
    return false
  }

  const assistantMessages = data.filter(message => message.role === 'assistant')
  const lastAssistantMessage = assistantMessages[assistantMessages.length - 1]

  if (lastAssistantMessage?.content && lastAssistantMessage.content.length > 0) {
    const [title, description, keywords] = lastAssistantMessage.content.split('\n')

    const cleanTitle = title?.split(':')[1] ?? ''
    const cleanDescription = description?.split(':')[1] ?? ''

    return (
      <section
        id='suggestions'
        className={`
          w-full
          md:w-[700px]
          overflow-hidden transition-[max-height] duration-500 ease-in 
      `}
      >
        <div className={`flex flex-col gap-5 bg-blue-950 rounded text-white pt-8 pl-5 pr-5 pb-8 mb-7`}>
          <h2 className='text-xl text-balance'>
            Sugerencias de título y descripción generadas con inteligencia artificial{' '}
            <strong className='dark:text-rose-600 text-rose-700'>(AI)</strong>
          </h2>
          <div className='relative'>
            <textarea
              disabled
              rows={2}
              value={cleanTitle}
              className={`w-full pl-5 pr-3 py-2   outline-none border  shadow-sm rounded-lg resize-none bg-transparent text-slate-200 dark:text-slate-300  border-blue-500`}
            ></textarea>
            <button
              className='absolute bottom-3 right-2 z-10 active:scale-50 transition-all hover:opacity-80'
              title='Copiar'
              type='button'
              aria-label='Copiar'
              onClick={handleClipBoard(cleanTitle)}
            >
              <IconCopy color='#e2e8f0' />
            </button>
          </div>

          <div className='relative'>
            <textarea
              disabled
              rows={3}
              value={cleanDescription}
              className={`w-full pl-5 pr-3 py-2   outline-none border  shadow-sm rounded-lg resize-none bg-transparent text-slate-200 dark:text-slate-300  border-blue-500`}
            ></textarea>
            <button
              className='absolute bottom-3 right-2 z-10 active:scale-50 transition-all hover:opacity-80'
              title='Copiar'
              type='button'
              aria-label='Copiar'
              onClick={handleClipBoard(cleanDescription)}
            >
              <IconCopy color='#e2e8f0' />
            </button>
          </div>

          {keywords && keywords.length > 0 && (
            <input
              type='text'
              disabled
              value={keywords.split(':')[1]}
              className={`w-full pl-5 pr-3 py-2   outline-none border  shadow-sm rounded-lg resize-none bg-transparent text-slate-200 dark:text-slate-300  border-blue-500`}
            />
          )}
        </div>
      </section>
    )
  }

  return
}
