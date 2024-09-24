'use client'

import { SeoAuditSuggestions } from '@/components/SeoAuditSuggestions'
import { WebAuditForm } from '@/components/WebAuditForm'
import { useWebScraping } from '@/hooks/useWebScraping'
import { issuesDescription } from '@/lib/consts'

export function AuditSeoClient({ url, apiUrl }: { url: string; apiUrl: string }) {
  const { score, issues, data, loading, error } = useWebScraping({ url, apiUrl })

  console.log({ score, loading, error })

  if (loading) {
    return <div>Cargando...</div>
  }

  const issueDescriptionData = issuesDescription(issues)

  type ImageDetail = { src: string; alt: string }
  type LinkDetail = { href: string; text: string }

  function isImageDetail(item: any): item is ImageDetail {
    return item && typeof item.src === 'string' && typeof item.alt === 'string'
  }

  function isLinkDetail(item: any): item is LinkDetail {
    return item && typeof item.href === 'string' && typeof item.text === 'string'
  }

  return (
    <main className='flex flex-col items-center pt-16 pb-10 px-4 md:px-0 w-full md:m-auto md:w-[700px]'>
      <h1 className='text-4xl dark:text-slate-200 mb-10 text-center'>
        Audita el <span className='dark:text-rose-600 text-rose-700'>SEO</span> de tu sitio web 🔥
      </h1>

      <header className='flex items-center flex-col max-w-72'>
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
              className='tooltip absolute z-10 invisible w-60 inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 pointer-events-none select-none -left-44 top-6 md:-top-28 md:left-0 group-hover:opacity-100 group-hover:visible transition-opacity duration-300'
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

            return (
              <li key={key} className=''>
                <h3 className='font-medium leading-6 text-slate-800 dark:text-white capitalize'>
                  {issueDescriptionData[key].value}
                </h3>
                {key === 'titles' && Array.isArray(detail) && (
                  <div className='mt-1 flex flex-col rounded-md shadow-sm px-2 py-2 break-all max-h-28 overflow-scroll whitespace-pre-line border border-red-600 bg-white dark:bg-transparent'>
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

                <div className='text-red-600 mt-2'>{issueDescriptionData[key].solution}</div>
              </li>
            )
          })}
        </ul>
      </div>

      <section className='my-12'>
        <h3 className='text-4xl'>
          Sugerencias generadas con <strong className='bg-rose-500 px-2 py-1 leading-tight rounded-sm'>IA</strong>
        </h3>
        <SeoAuditSuggestions scrapedData={data} issues={issues} />
      </section>

      <footer className='w-full mt-20'>
        <h3 className='text-4xl my-4 text-center'>Auditar otro sitio web</h3>
        <WebAuditForm />
      </footer>
    </main>
  )
}
