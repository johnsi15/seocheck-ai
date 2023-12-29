import { FormSeoCheck } from '@/components/FormSeoCheck'
import { Header } from '@/components/Header'

export default function CheckSeo() {
  return (
    <>
      <Header />
      <main className='flex min-h-screen flex-col items-center p-24'>
        <FormSeoCheck />
      </main>
    </>
  )
}
