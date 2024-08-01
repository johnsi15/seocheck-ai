import { Header } from '@/components/Header'
import { WebAuditForm } from '@/components/WebAuditForm'
import { Footer } from '@/components/Footer'

export function InvalidWebAudit({ message }: { message: string }) {
  return (
    <>
      <Header />
      <main className='flex flex-col items-center pt-16 pb-10 px-4 md:px-0 w-full md:m-auto md:w-[700px]'>
        <h1 className='text-4xl dark:text-slate-200 mb-10 text-center'>
          Audita el <span className='dark:text-rose-600 text-rose-700'>SEO</span> de tu sitio web 🔥
        </h1>
        <p className='mb-4 text-lg'>{message}</p>
        <WebAuditForm />
      </main>

      <Footer />
    </>
  )
}
