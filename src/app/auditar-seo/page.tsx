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

  const { score } = await webScraping({ url })

  const listRevision = [
    'Título',
    'Descripción',
    'H1',
    'H2',
    'Alt en la imágenes',
    'Enlaces internos',
    'Marcado de esquema',
  ]

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

        <div>
          Se reviso:
          <ul>
            {listRevision.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </main>
    </>
  )
}
