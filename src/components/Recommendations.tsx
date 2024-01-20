export function Recommendations() {
  const strongStyle = 'text-rose-700 dark:text-rose-600 font-semibold'
  const paragraphStyle = 'mb-3'
  const blockStyle = 'text-2xl mb-2 block'

  return (
    <section className='mt-16 mx-auto max-w-screen-sm'>
      <h2 className='text-4xl dark:text-slate-200 mb-10 text-center text-balance'>
        Recomendaciones para mejorar el <strong className={`${strongStyle}`}>SEO</strong> de tu artículo
      </h2>
      <ul className='p-0 m-0 flex flex-col gap-4 text-pretty text-base text-slate-800 dark:text-slate-300  tracking-wide divide-y divide-slate-400 dark:divide-slate-500'>
        <li className='pb-2'>
          <strong className={`${strongStyle} ${blockStyle}`}>Incluye la palabra clave principal:</strong>
          <p className={`${paragraphStyle}`}>
            Asegúrate de que tu palabra clave principal esté presente en el título para indicar claramente el tema del
            contenido y mejorar la relevancia para los motores de búsqueda.
          </p>
          <p>
            Al igual que en los títulos, asegúrate de incluir tu palabra clave principal en la descripción. Esto
            refuerza la relevancia del contenido.
          </p>
        </li>
        <li className='pt-5 pb-2'>
          <strong className={`${strongStyle} ${blockStyle}`}>Longitud óptima:</strong>
          <p className={`${paragraphStyle}`}>
            Mantén tu título en un rango de 55 a 80 caracteres para asegurar que se visualice correctamente en los
            resultados de búsqueda y evitar que se trunque.
          </p>
          <p>
            Mantén la descripción en un rango de 120 a 160 caracteres para garantizar que se muestre correctamente en
            los resultados de búsqueda.
          </p>
        </li>
        <li className='pt-5 pb-2'>
          <strong className={`${strongStyle} ${blockStyle}`}>Genera interés:</strong>
          <p>
            Utiliza un lenguaje persuasivo y atractivo para captar la atención del usuario. Crea una descripción que
            haga que los usuarios quieran hacer clic para obtener más información.
          </p>
        </li>
        <li className='pt-5'>
          <strong className={`${strongStyle} ${blockStyle}`}>Claridad y coherencia:</strong>
          <p>
            Asegúrate de que la descripción sea clara y coherente con el contenido de la página. Evita el uso excesivo
            de jerga o frases confusas.
          </p>
        </li>
      </ul>
    </section>
  )
}
