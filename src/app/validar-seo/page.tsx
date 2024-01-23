import type { Metadata } from 'next'
import { FormSeoCheck } from '@/components/FormSeoCheck'
import { Header } from '@/components/Header'
import { metaInfoDefault, openGraph, twitter } from '@/lib/consts'
import { Donate } from '@/components/Donate'
import { Recommendations } from '@/components/Recommendations'
import { Footer } from '@/components/Footer'
import { Banner } from '@/components/Banner'

export const metadata: Metadata = {
  title: 'Valida el SEO de tu artículo',
  description:
    'Optimiza tu presencia en línea con seocheckai. Valida y mejora la eficacia de tus títulos y descripciones para destacar en los resultados de búsqueda. ',
  ...metaInfoDefault,
  openGraph: {
    title: 'Valida el SEO de tu artículo',
    description:
      'Optimiza tu presencia en línea con seocheckai. Valida y mejora la eficacia de tus títulos y descripciones para destacar en los resultados de búsqueda. ',
    ...openGraph,
    images: [
      {
        url: 'https://seocheckai.com/share.png',
        width: 1640,
        height: 924,
        alt: 'seocheckai',
      },
    ],
    url: 'https://seocheckai.com/',
  },
  twitter: {
    title: 'Valida el SEO de tu artículo',
    description:
      'Optimiza tu presencia en línea con seocheckai. Valida y mejora la eficacia de tus títulos y descripciones para destacar en los resultados de búsqueda. ',
    ...twitter,
  },
}

export default function CheckSeo() {
  return (
    <>
      <Banner />
      <Header />
      <main className='flex flex-col items-center pt-16 pb-10'>
        <h1 className='text-4xl dark:text-slate-200 mb-10 text-center'>
          Valida el <span className='dark:text-rose-600 text-rose-700'>SEO</span> de tu artículo
        </h1>
        <FormSeoCheck />

        <Donate />

        <Recommendations />
      </main>

      <Footer />
    </>
  )
}
