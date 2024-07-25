import { Header } from '@/components/Header'
import { webScraping } from '@/lib/scrapingPly'

export default async function AuditSeo({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { url } = searchParams

  if (!url || Array.isArray(url)) {
    return (
      <div>
        <h1>Check web site</h1>
        <p>URL is required</p>
      </div>
    )
  }

  const result = await webScraping({ url })
  console.log({ result })

  return (
    <>
      <Header />
      <main className='flex flex-col items-center pt-16 pb-10 px-4 md:px-0 w-full md:m-auto md:w-[700px]'>
        <h1 className='text-4xl dark:text-slate-200 mb-10 text-center'>
          Audita el <span className='dark:text-rose-600 text-rose-700'>SEO</span> de tu sitio web 🔥
        </h1>
      </main>
    </>
  )
}
