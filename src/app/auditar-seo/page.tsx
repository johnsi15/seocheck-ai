import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { InvalidWebAudit } from '@/components/InvalidWebAudit'
import { ScrollToTop } from '@/components/ScrollToTop'
import { WebAuditForm } from '@/components/WebAuditForm'
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

  const issuesDescription: Record<string, IssueDetail> = {
    title: {
      value: 'Título',
      description:
        'Falta la etiqueta `<title>` en el HTML de la página. Esta etiqueta es crucial para el SEO ya que define el título que aparece en la pestaña del navegador y en los resultados de búsqueda.',
      solution:
        'Agrega una etiqueta `<title>` en el `<head>` del HTML con un título descriptivo y relevante para la página.',
    },
    titleLength: {
      value: 'Título largo',
      description: 'El título de la página es muy largo o muy corto.',
      solution: `Ajusta el título de la página. Tiene ${
        issues.find(item => item.key.includes('titleLength'))?.count
      } caracteres. Se recomienda que tenga entre 55 a 80 caracteres.`,
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
      description:
        'La etiqueta `<meta name="description">` está ausente en el HTML de la página. Esta metaetiqueta proporciona una breve descripción del contenido de la página, la cual puede ser utilizada por los motores de búsqueda en los resultados de búsqueda y en las redes sociales.',
      solution:
        'Agrega una etiqueta `<meta name="description" content="Descripción breve y relevante del contenido de la página.">` en el `<head>` del HTML.',
    },
    descriptionLength: {
      value: 'Descripción larga',
      description: 'La descripción de la página es muy larga o muy corta.',
      solution: `Ajusta la descripción de la página. Tiene ${
        issues.find(item => item.key.includes('descriptionLength'))?.count
      } caracteres. Se recomienda que tenga entre 120 y 160 caracteres.`,
    },
    h1: {
      value: 'H1',
      description: 'El encabezado H1 no es adecuado para la página.',
      solution: 'Agrega una etiqueta `<h1>` en el cuerpo de la página.',
    },
    h2: {
      value: 'H2',
      description: 'El encabezado H2 no es adecuado para la página.',
      solution: 'Agrega una etiqueta `<h2>` en el cuerpo de la página.',
    },
    images: {
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

  type ImageDetail = { src: string; alt: string }
  type LinkDetail = { href: string; text: string }

  function isImageDetail(item: any): item is ImageDetail {
    return item && typeof item.src === 'string' && typeof item.alt === 'string'
  }

  function isLinkDetail(item: any): item is LinkDetail {
    return item && typeof item.href === 'string' && typeof item.text === 'string'
  }

  return (
    <>
      <ScrollToTop />
      <Header />
      <main className='flex flex-col items-center pt-16 pb-10 px-4 md:px-0 w-full md:m-auto md:w-[700px]'>
        <h1 className='text-4xl dark:text-slate-200 mb-10 text-center'>
          Audita el <span className='dark:text-rose-600 text-rose-700'>SEO</span> de tu sitio web 🔥
        </h1>

        <header className='flex items-center flex-col'>
          <h2 className='text-center text-2xl font-light mb-3'>{url}</h2>
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
                className={`stroke-current ${
                  score > 84
                    ? 'text-green-600 dark:text-green-500'
                    : score > 45
                    ? 'text-orange-600 dark:text-orange-500'
                    : 'text-red-600 dark:text-red-500'
                }`}
                strokeWidth='2'
                strokeDasharray={score}
                strokeLinecap='round'
              ></circle>
            </svg>

            <div className='absolute top-1/2 start-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
              <span
                className={`text-4xl font-bold ${
                  score > 85
                    ? 'text-green-600 dark:text-green-500'
                    : score > 45
                    ? 'text-orange-600 dark:text-orange-500'
                    : 'text-red-600 dark:text-red-500'
                }`}
              >
                {score}
              </span>
              <span
                className={`${
                  score > 85
                    ? 'text-green-600 dark:text-green-500'
                    : score > 45
                    ? 'text-orange-600 dark:text-orange-500'
                    : 'text-red-600 dark:text-red-500'
                } block`}
              >
                Puntaje
              </span>
            </div>
          </div>
          <div className='flex gap-2 items-center mt-3'>
            <p>Puntuación de SEO en la página</p>
            <div className='group relative'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className=' text-gray-500 w-3 h-3 cursor-pointer'
              >
                <circle cx='12' cy='12' r='10'></circle>
                <path d='M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3'></path>
                <path d='M12 17h.01'></path>
              </svg>
              <div
                role='tooltip'
                className='tooltip absolute z-10 invisible w-60 inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 pointer-events-none select-none -top-28 left-0 group-hover:opacity-100 group-hover:visible transition-opacity duration-300'
              >
                Solo se consideran problemas individuales para el puntaje. Por ejemplo, cada imagen sin atributo alt se
                cuenta como un problema.
              </div>
            </div>
          </div>
        </header>

        <div className='bg-slate-200 dark:bg-transparent dark:border dark:border-blue-500 w-full min-h-max rounded px-7 py-5 mt-12'>
          <span className='text-slate-800 dark:text-white text-2xl'>Problemas</span>
          <ul className='mt-5 flex flex-col gap-7'>
            {issues.map(({ issue, key, detail }) => {
              if (!issue) return

              console.log({ issue, key, detail })
              // console.log(issuesDescription[key])
              return (
                <li key={key} className=''>
                  <h3 className='font-medium leading-6 text-slate-800 dark:text-white capitalize'>
                    {issuesDescription[key].value}
                  </h3>
                  {key === 'titles' && Array.isArray(detail) && (
                    <div className='mt-1 flex flex-col rounded-md shadow-sm px-2 py-2 break-all max-h-28 overflow-scroll whitespace-pre-line border border-red-600 dark:bg-white dark:bg-transparent'>
                      {detail.map((item, index) => (
                        <div key={index}>{String(item)}</div>
                      ))}
                    </div>
                  )}

                  {key === 'images' && Array.isArray(detail) && (
                    <div className='mt-1 flex rounded-md shadow-sm px-2 py-2 break-all max-h-28 overflow-scroll whitespace-pre-line border border-red-600 bg-white dark:bg-transparent'>
                      {detail.map((item, index) => (
                        <ul key={index}>
                          {isImageDetail(item) && (
                            <li className='flex gap-3'>
                              <span>{item.src}</span>
                            </li>
                          )}
                        </ul>
                      ))}
                    </div>
                  )}

                  {key === 'links' && Array.isArray(detail) && (
                    <div className='mt-1 flex rounded-md shadow-sm px-2 py-2 break-all max-h-28 overflow-scroll whitespace-pre-line border border-red-600 bg-white dark:bg-transparent'>
                      {detail.map((item, index) => (
                        <ul key={index}>
                          {isLinkDetail(item) && (
                            <li className='flex gap-3'>
                              <span>{item.href}</span>
                            </li>
                          )}
                        </ul>
                      ))}
                    </div>
                  )}

                  {typeof detail === 'string' && (
                    <div className='mt-1 flex rounded-md shadow-sm px-2 py-2 break-all max-h-28 overflow-scroll whitespace-pre-line border border-red-600 bg-white dark:bg-transparent'>
                      {detail}
                    </div>
                  )}

                  <div className='text-red-600 mt-2'>{issuesDescription[key].solution}</div>
                </li>
              )
            })}
          </ul>
        </div>

        <footer className='w-full mt-20'>
          <h3 className='text-4xl my-4 text-center'>Auditar otro sitio web</h3>
          <WebAuditForm />
        </footer>
      </main>

      <Footer />
    </>
  )
}
