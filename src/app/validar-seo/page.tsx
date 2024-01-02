import { FormSeoCheck } from '@/components/FormSeoCheck'
import { Header } from '@/components/Header'

export default function CheckSeo() {
  return (
    <>
      <Header />
      <main className='flex min-h-screen flex-col items-center p-24'>
        <h1 className='text-4xl dark:text-slate-200 mb-10 text-center'>
          Valida el <span className='dark:text-rose-600 text-rose-700'>SEO</span> de tu artículo
        </h1>
        <FormSeoCheck />
      </main>
    </>
  )
}
