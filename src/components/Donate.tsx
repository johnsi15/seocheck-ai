export function Donate() {
  return (
    <section className='bg-slate-200 dark:bg-transparent mt-10 md:mt-[100px] rounded-xl dark:border-2 dark:border-slate-500'>
      <div className='py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6'>
        <div className='mx-auto max-w-screen-sm text-center'>
          <h2 className='mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-900 dark:text-slate-200'>
            Apóyanos contribuye para mantener y mejorar la herramienta{' '}
            <strong className='text-rose-700 dark:text-rose-600 font-semibold'>SEO CheckAI</strong>
          </h2>
          <p className='mb-7 font-normal text-black dark:text-slate-400 md:text-lg tracking-wide'>
            Si te gusta nuestra herramienta de validación de SEO y encuentras valor en ella, considera hacer una{' '}
            <strong className='text-rose-700 dark:text-rose-600 font-semibold'>
              donación para apoyar nuestro trabajo
            </strong>
            . Tu generosidad nos ayuda a mantener esta herramienta gratuita y en constante mejora para todos.{' '}
            <strong className='text-rose-700 dark:text-rose-600 font-semibold'>
              ¡Gracias por considerar contribuir!
            </strong>
          </p>
          <a
            href='https://link.mercadopago.com.co/johnserrano'
            aria-label='Donar aquí Mercado Pago'
            target='_blank'
            rel='noopener noreferrer'
            className='rounded-lg duration-150 bg-rose-700 text-white dark:text-slate-200 dark:bg-rose-600 dark:hover:bg-rose-700 hover:bg-rose-600 active:shadow-lg w-[150px] disabled:opacity-75 disabled:cursor-not-allowed disabled:bg-rose-700 text-sm px-5 py-2.5 mr-2 mb-2'
          >
            Donar aquí
          </a>
        </div>
      </div>
    </section>
  )
}
