import { FeatureList } from '@/components/FeatureList'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { Video } from '@/components/Video'

export default function Home() {
  return (
    <>
      <Hero />
      <main className='max-w-5xl mx-auto mt-8'>
        <Video />
        <FeatureList />
      </main>

      <Footer />
    </>
  )
}
