export function ButtonStart({ title }: { title: string }) {
  return (
    <div className='mt-4 md:mt-12 justify-center items-center space-y-3 sm:space-x-6 sm:space-y-0 flex'>
      <a
        href='/validar-seo'
        className='px-5 py-2.5 md:px-10 md:py-3.5 w-1/3 bg-rose-700 text-white dark:text-slate-200 dark:bg-rose-600 dark:hover:bg-rose-700 hover:bg-rose-600 text-center rounded-md shadow-md block sm:w-auto transition-colors'
      >
        {title}
      </a>
    </div>
  )
}
