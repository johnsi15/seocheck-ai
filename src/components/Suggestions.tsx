import { type DataSeoAI } from '@/types'

interface Props {
  data: DataSeoAI
}

export function Suggestions({ data: { title, description, keyword, active } }: Props) {
  return (
    <section
      className={`
       flex flex-col gap-5 w-[700px] bg-blue-950 rounded  text-white transition-[height]  ease-in-out  duration-300 
      ${active ? 'opacity-100 h-auto pt-8 pl-5 pr-5 pb-8 overflow-auto mb-7' : 'h-0 p-0 opacity-0 overflow-hidden mb-0'}
    `}
    >
      <h2 className='text-xl text-balance'>
        Sugerencias de título y descripción generadas con inteligencia artificial{' '}
        <strong className='dark:text-rose-600 text-rose-700'>(AI)</strong>
      </h2>
      <textarea
        disabled
        rows={2}
        value={title}
        className={`w-full pl-5 pr-3 py-2   outline-none border  shadow-sm rounded-lg resize-none bg-transparent text-slate-200 dark:text-slate-300  border-blue-500`}
      ></textarea>
      <textarea
        disabled
        rows={3}
        value={description}
        className={`w-full pl-5 pr-3 py-2   outline-none border  shadow-sm rounded-lg resize-none bg-transparent text-slate-200 dark:text-slate-300  border-blue-500`}
      ></textarea>
      {keyword && (
        <input
          type='text'
          disabled
          value={keyword}
          className={`w-full pl-5 pr-3 py-2   outline-none border  shadow-sm rounded-lg resize-none bg-transparent text-slate-200 dark:text-slate-300  border-blue-500`}
        />
      )}
    </section>
  )
}
