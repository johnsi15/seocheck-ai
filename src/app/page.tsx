import { ButtonStart } from '@/components/ButtonStart'
import { FeatureList } from '@/components/FeatureList'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { Video } from '@/components/Video'
import { title, description } from '@/lib/consts'
import { webScraping } from '@/lib/scraping'

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    headline: title,
    image: 'https://seocheckai.com/share.png',
    description: description,
    author: {
      '@type': 'Person',
      name: 'John Serrano',
    },
  }

  async function scan(formData: FormData) {
    'use server'

    const rawFormData = {
      site: formData.get('site'),
    }

    webScraping({ url: rawFormData.site?.toString() ?? '' })
  }

  return (
    <>
      <Hero />
      <main className='max-w-5xl mx-auto mt-8'>
        <form action={scan}>
          <input type='text' placeholder='Escribe tu enlace aquí' name='site' />
          <button>Escanear sitio</button>
        </form>
        <Video />
        <FeatureList />

        <ButtonStart title='Intentar' />
      </main>

      <Footer />

      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  )
}
