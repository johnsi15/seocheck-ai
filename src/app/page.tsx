import { FeatureList } from '@/components/FeatureList'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'

export default function Home() {
  return (
    <>
      <Hero />
      <main className='max-w-5xl mx-auto mt-8'>
        <h3>Here vídeo</h3>

        <FeatureList />
      </main>

      <Footer />
    </>
  )
}
