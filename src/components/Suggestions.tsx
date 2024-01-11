import { type DataSeoAI } from '@/types'
import { IconCopy } from './Icons'

interface Props {
  data: DataSeoAI
}

export function Suggestions({ data: { title, description, keyword, active } }: Props) {
  const handleClipBoard = (text: string) => () => {
    navigator.clipboard.writeText(text)
    console.log('Copiado')
    return false
  }

  return (
    <section
      id='suggestions'
      className={`
        overflow-hidden transition-[max-height] duration-500 ease-in 
       ${active ? 'max-h-96' : 'max-h-0'}
    `}
    >
      <div className={`flex flex-col gap-5 w-[700px] bg-blue-950 rounded text-white pt-8 pl-5 pr-5 pb-8 mb-7`}>
        <h2 className='text-xl text-balance'>
          Sugerencias de título y descripción generadas con inteligencia artificial{' '}
          <strong className='dark:text-rose-600 text-rose-700'>(AI)</strong>
        </h2>
        <div className='relative'>
          <textarea
            disabled
            rows={2}
            value={title}
            className={`w-full pl-5 pr-3 py-2   outline-none border  shadow-sm rounded-lg resize-none bg-transparent text-slate-200 dark:text-slate-300  border-blue-500`}
          ></textarea>
          <button
            className='absolute bottom-3 right-2 z-10 active:scale-50 transition-all hover:opacity-80'
            title='Copiar'
            type='button'
            aria-label='Copiar'
            onClick={handleClipBoard(title)}
          >
            <IconCopy color='#e2e8f0' />
          </button>
        </div>

        <div className='relative'>
          <textarea
            disabled
            rows={3}
            value={description}
            className={`w-full pl-5 pr-3 py-2   outline-none border  shadow-sm rounded-lg resize-none bg-transparent text-slate-200 dark:text-slate-300  border-blue-500`}
          ></textarea>
          <button
            className='absolute bottom-3 right-2 z-10 active:scale-50 transition-all hover:opacity-80'
            title='Copiar'
            type='button'
            aria-label='Copiar'
            onClick={handleClipBoard(description)}
          >
            <IconCopy color='#e2e8f0' />
          </button>
        </div>

        {keyword && (
          <input
            type='text'
            disabled
            value={keyword}
            className={`w-full pl-5 pr-3 py-2   outline-none border  shadow-sm rounded-lg resize-none bg-transparent text-slate-200 dark:text-slate-300  border-blue-500`}
          />
        )}
      </div>
    </section>
  )
}
