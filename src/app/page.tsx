import { FormSeoCheck } from '@/components/FormSeoCheck'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <h1 className='mb-8 text-4xl'>SEO CheckAI potencia la visibilidad de tu contenido</h1>

      <FormSeoCheck />
    </main>
  )
}
