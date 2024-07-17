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
    const suggestionsList = lastAssistantMessage.content.split('<break />')

    console.log({ suggestionsList })

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
          <h2 className='text-2xl font-light leading-tight'>
            Sugerencias de títulos y descripciones generadas con inteligencia artificial{' '}
            <strong className='dark:text-rose-600 text-rose-700 font-bold'>(AI)</strong>
          </h2>
          <ul className='flex flex-col gap-4'>
            {suggestionsList.map((suggestion, index) => {
              const [title, description, keywords] = suggestion.split('\n')

              const cleanTitle = title?.split('::')[1] ?? ''
              const cleanDescription = description?.split('::')[1] ?? ''
              const cleanKeywords = keywords?.split('::')[1] ?? ''

              return (
                <li key={index}>
                  <span className='text-xl mb-2 inline-block font-semibold dark:text-rose-600 text-rose-700'>
                    Sugerencia #{index + 1}
                  </span>
                  <div className='relative mb-2'>
                    <h3 className='text-sm mb-2 absolute top-2 left-2 font-bold'>Título:</h3>
                    <textarea
                      disabled
                      rows={2}
                      value={cleanTitle}
                      className={`w-full pl-5 pr-3 pt-8 pb-2 md:pb-0 outline-none border  shadow-sm rounded-lg resize-none bg-transparent text-slate-200 dark:text-slate-300  border-blue-500`}
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

                  <div className='relative mb-2'>
                    <h3 className='text-sm mb-2 absolute top-2 left-2 font-bold'>Descripción:</h3>
                    <textarea
                      disabled
                      rows={3}
                      value={cleanDescription}
                      className={`w-full pl-5 pr-3 pt-8 pb-2 md:pb-0 outline-none border  shadow-sm rounded-lg resize-none bg-transparent text-slate-200 dark:text-slate-300  border-blue-500`}
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
                    <div className='relative'>
                      <h3 className='text-sm mb-2 absolute top-2 left-2 font-bold'>Palabras clave:</h3>
                      <input
                        type='text'
                        disabled
                        value={cleanKeywords}
                        className={`w-full pl-5 pr-3 pt-8 pb-2 outline-none border  shadow-sm rounded-lg resize-none bg-transparent text-slate-200 dark:text-slate-300  border-blue-500`}
                      />
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    )
  }

  return
}
