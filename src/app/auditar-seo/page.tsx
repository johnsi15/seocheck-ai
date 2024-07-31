import { Header } from '@/components/Header'
import { InvalidWebAudit } from '@/components/InvalidWebAudit'
import { webScraping } from '@/lib/scrapingPly'

export default async function AuditSeo({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { url } = searchParams

  if (!url || typeof url !== 'string' || !url.startsWith('https://')) {
    return <InvalidWebAudit />
  }

  const { score, issues } = await webScraping({ url })

  type IssueDetail = {
    value: string
    description: string
    solution: string
  }

  const listIssues: Record<string, IssueDetail> = {
    title: {
      value: 'Título',
      description: 'El título de la página es muy largo o muy corto.',
      solution: 'Ajusta el título de la página para que sea lo más descriptivo posible.',
    },
    titleLength: {
      value: 'Título largo',
      description: 'El título de la página es muy largo o muy corto.',
      solution: `Ajusta el título de la página. Tiene ${
        issues.find(item => item.key.includes('titleLength'))?.count
      } caracteres.`,
    },
    titles: {
      value: 'Títulos',
      description: `Tienes más de una etiqueta de title.`,
      solution: `Se recomienda tener solo una etiqueta de título en una página. Se encontraron ${
        issues.find(item => item.key.includes('titles'))?.count
      } títulos.`,
    },
    description: {
      value: 'Descripción',
      description: 'La descripción de la página es muy larga o muy corta.',
      solution: 'Ajusta la descripción de la página para que sea lo más descriptivo posible.',
    },
    h1: {
      value: 'H1',
      description: 'El encabezado H1 no es adecuado para la página.',
      solution: 'Ajusta el encabezado H1 para que sea lo más descriptivo posible.',
    },
    h2: {
      value: 'H2',
      description: 'El encabezado H2 no es adecuado para la página.',
      solution: 'Ajusta el encabezado H2 para que sea lo más descriptivo posible.',
    },
    alt: {
      value: 'Alt en la imágenes',
      description: 'Las imágenes no tienen atributos alt.',
      solution: 'Agrega atributos alt a las imágenes para mejorar la accesibilidad.',
    },
    internalLinks: {
      value: 'Enlaces internos',
      description: 'Los enlaces internos no están optimizados.',
      solution: 'Optimiza los enlaces internos para mejorar la accesibilidad.',
    },
    schemaMarkup: {
      value: 'Marcado de esquema',
      description: 'El marcado de esquema no es adecuado para la página.',
      solution: 'Ajusta el marcado de esquema para mejorar la accesibilidad.',
    },
  }

  return (
    <>
      <Header />
      <main className='flex flex-col items-center pt-16 pb-10 px-4 md:px-0 w-full md:m-auto md:w-[700px]'>
        <h1 className='text-4xl dark:text-slate-200 mb-10 text-center'>
          Audita el <span className='dark:text-rose-600 text-rose-700'>SEO</span> de tu sitio web 🔥
        </h1>

        <div className='flex items-center flex-col'>
          <div className='relative size-40'>
            <svg className='rotate-[135deg] size-full' viewBox='0 0 36 36' xmlns='http://www.w3.org/2000/svg'>
              <circle
                cx='18'
                cy='18'
                r='16'
                fill='none'
                className='stroke-current text-green-200 dark:text-neutral-700'
                strokeWidth='1'
                strokeDasharray='75 100'
                strokeLinecap='round'
              ></circle>

              <circle
                cx='18'
                cy='18'
                r='16'
                fill='none'
                className='stroke-current text-green-500 dark:text-green-500'
                strokeWidth='2'
                strokeDasharray={score}
                strokeLinecap='round'
              ></circle>
            </svg>

            <div className='absolute top-1/2 start-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
              <span className='text-4xl font-bold text-green-600 dark:text-green-500'>{score}</span>
              <span className='text-green-600 dark:text-green-500 block'>Puntaje</span>
            </div>
          </div>
          <p className='mt-2'>Puntuación de SEO en la página</p>
        </div>

        <div className='bg-blue-100 dark:bg-transparent dark:border dark:border-blue-500 w-full min-h-max rounded px-7 py-5 mt-12'>
          <span className='text-slate-800 dark:text-white text-2xl'>Problemas</span>
          <ul className='mt-5 flex flex-col gap-5'>
            {issues.map(({ issue, key, detail }) => {
              if (!issue) return

              console.log({ issue, key, detail })
              // console.log(listIssues[key])
              return (
                <li key={key} className=''>
                  <h3 className='font-medium leading-6 text-slate-800 dark:text-white capitalize'>
                    {listIssues[key].value}
                  </h3>
                  {key === 'titles' && Array.isArray(detail) && (
                    <div className='mt-1 flex flex-col rounded-md shadow-sm px-2 py-2 break-all max-h-28 overflow-scroll whitespace-pre-line border border-red-600 bg-transparent'>
                      {detail.map((item, index) => (
                        <div key={index}>{String(item)}</div>
                      ))}
                    </div>
                  )}

                  {key === 'images' && Array.isArray(detail) && (
                    <div className='mt-1 flex rounded-md shadow-sm px-2 py-2 break-all max-h-28 overflow-scroll whitespace-pre-line border border-red-600 bg-transparent'>
                      {detail.map((item, index) => (
                        <div key={index}>
                          {item?.src ? item.src : null}
                          {item?.alt ? item.alt : null}
                        </div>
                      ))}
                    </div>
                  )}

                  {key === 'links' && Array.isArray(detail) && (
                    <div className='mt-1 flex rounded-md shadow-sm px-2 py-2 break-all max-h-28 overflow-scroll whitespace-pre-line border border-red-600 bg-transparent'>
                      {detail.map((item, index) => (
                        <div key={index}>
                          {item.href ? item.href : null}
                          {item.text ? item.text : null}
                        </div>
                      ))}
                    </div>
                  )}

                  {typeof detail === 'string' && (
                    <div className='mt-1 flex rounded-md shadow-sm px-2 py-2 break-all max-h-28 overflow-scroll whitespace-pre-line border border-red-600 bg-transparent'>
                      {detail}
                    </div>
                  )}

                  <div className='text-red-600 mt-2'>{listIssues[key].solution}</div>
                </li>
              )
            })}
          </ul>
        </div>
      </main>
    </>
  )
}
