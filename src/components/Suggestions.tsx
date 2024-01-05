interface Props {
  title: string
  description: string
  validSuggestions: boolean
}

export function Suggestions({ title, description, validSuggestions }: Props) {
  if (!validSuggestions) {
    return (
      <section className='mb-7 flex flex-col gap-5 w-[700px] bg-blue-950 rounded pt-8 pl-5 pr-5 pb-8 text-white'>
        <h2 className='text-xl text-balance'>
          Sugerencias de título y descripción generadas con inteligencia artificial{' '}
          <strong className='dark:text-rose-600 text-rose-700'>(AI)</strong>
        </h2>
        <input
          type='text'
          disabled
          value={title}
          className='w-full pl-5 pr-3 py-2 outline-none border shadow-sm rounded-lg bg-transparent text-slate-200 dark:text-slate-300 border-blue-500'
        />
        <textarea
          id='description'
          disabled
          rows={3}
          value={description}
          className={`w-full pl-5 pr-3 py-2   outline-none border  shadow-sm rounded-lg resize-none bg-transparent text-slate-200 dark:text-slate-300  border-blue-500`}
        ></textarea>
      </section>
    )
  }

  return
}
