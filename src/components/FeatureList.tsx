export function FeatureList() {
  return (
    <section className='grid grid-cols-2 mt-10 gap-2 items-center'>
      <div className='flex flex-col'>
        <h2 className='mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-900 dark:text-slate-200'>
          Valida el <strong className='text-rose-700 dark:text-rose-600 font-semibold'>SEO</strong> de tu artículo antes
          de publicarlo
        </h2>
        <p className='mb-7 font-normal text-black dark:text-slate-400 md:text-lg tracking-wide'>
          Optimiza tu contenido antes de compartirlo con nuestra herramienta de validación de SEO. Verifica la cantidad
          mínima y máxima de caracteres, asegúrate de incluir la palabra clave.
        </p>
        <ul className='p-0 m-0 flex flex-col gap-4 text-balance text-base text-black dark:text-slate-200  tracking-wide'>
          <li>
            ✅ <strong className='text-rose-700 dark:text-rose-600 font-semibold'>Validación rápida:</strong> Verifica
            rápidamente la cantidad de caracteres y la presencia de palabras clave.
          </li>
          <li>
            ✅ <strong className='text-rose-700 dark:text-rose-600 font-semibold'>Optimización SEO:</strong> Mejora tu
            posición en los motores de búsqueda ajustando tu título y descripción.
          </li>
          <li>
            ✅ <strong className='text-rose-700 dark:text-rose-600 font-semibold'>Facilidad de uso:</strong> Interfaz
            intuitiva para una validación SEO sin complicaciones.
          </li>
        </ul>
      </div>
      <div>
        <img src='/example-1.webp' alt='Example SEO validated' loading='lazy' height='318' width='508' />
      </div>
    </section>
  )
}
