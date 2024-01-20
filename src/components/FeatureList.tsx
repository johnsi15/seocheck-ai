export function FeatureList() {
  const strongStyle = 'text-rose-700 dark:text-rose-600 font-semibold'

  return (
    <section className='grid grid-cols-2 mt-10 gap-x-10 gap-y-16 items-center'>
      <div className='flex flex-col'>
        <h2 className='mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-900 dark:text-slate-200 text-balance'>
          Valida el <strong className={`${strongStyle}`}>SEO</strong> de tu artículo antes de publicarlo
        </h2>
        <p className='mb-7 font-normal text-slate-800 dark:text-slate-400 md:text-lg tracking-wide text-pretty'>
          Optimiza tu contenido antes de compartirlo con nuestra herramienta de validación de SEO. Verifica la cantidad
          mínima y máxima de caracteres, asegúrate de incluir la palabra clave.
        </p>
        <ul className='p-0 m-0 flex flex-col gap-4 text-pretty text-base text-black dark:text-slate-200  tracking-wide'>
          <li>
            ✅ <strong className={`${strongStyle}`}>Validación rápida:</strong> Verifica rápidamente la cantidad de
            caracteres y la presencia de palabras clave.
          </li>
          <li>
            ✅ <strong className={`${strongStyle}`}>Optimización SEO:</strong> Mejora tu posición en los motores de
            búsqueda ajustando tu título y descripción.
          </li>
          <li className='text-balance'>
            ✅ <strong className={`${strongStyle}`}>Facilidad de uso:</strong> Interfaz intuitiva para una validación
            SEO sin complicaciones.
          </li>
        </ul>
      </div>
      <div className='dark:border-2 border-slate-700 rounded px-2 py-5 overflow-hidden dark:bg-transparent bg-slate-900'>
        <img
          className='object-cover transition duration-300 ease-in-out hover:scale-105'
          src='/example-1.webp'
          alt='SEO validación'
          loading='lazy'
          height='318'
          width='508'
        />
      </div>

      {/* block #2 */}
      <div className='dark:border-2 border-slate-700 rounded px-2 py-5 overflow-hidden dark:bg-transparent bg-slate-900'>
        <img
          className='object-cover transition duration-300 ease-in-out hover:scale-105'
          src='/example-2.webp'
          alt='SEO sugerencias con inteligencia artificial'
          loading='lazy'
          height='318'
          width='508'
        />
      </div>

      <div className='flex flex-col'>
        <h2 className='mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-900 dark:text-slate-200 text-balance'>
          Genera sugerencias con <strong className={`${strongStyle}`}>inteligencia artificial</strong> para potenciar tu
          SEO
        </h2>
        <p className='mb-7 font-normal text-slate-800 dark:text-slate-400 md:text-lg tracking-wide text-pretty'>
          Potencia tu SEO con sugerencias generadas con inteligencia artificial. Valida caracteres, palabras clave y
          recibe recomendaciones precisas para mejorar tu título y descripción.
        </p>
        <ul className='p-0 m-0 flex flex-col gap-4 text-pretty text-base text-black dark:text-slate-200  tracking-wide'>
          <li>
            ✅ <strong className={`${strongStyle}`}>Personalización efectiva:</strong> Ajusta tus títulos, descripciones
            y palabras clave de manera eficiente y personalizada con sugerencias AI.
          </li>
          <li>
            ✅ <strong className={`${strongStyle}`}>Rápida optimización SEO:</strong> Optimiza tu contenido rápidamente
            con recomendaciones precisas basadas en inteligencia artificial.
          </li>
          <li>
            ✅ <strong className={`${strongStyle}`}>Impacto SEO Máximo:</strong> Mejora la visibilidad de tu contenido
            implementando sugerencias AI, maximizando tu impacto en los motores de búsqueda.
          </li>
        </ul>
      </div>
    </section>
  )
}
