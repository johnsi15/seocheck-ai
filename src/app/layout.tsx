import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import './globals.css'
import { ThemeProviders } from '@/components/ThemeProviders'

const lato = Lato({ weight: ['300', '400', '700', '900'], subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: 'SEO CheckAI Potencia la visibilidad de tu contenido',
  description: 'Descubre el poder de SEO CheckAI para impulsar la visibilidad de tu contenido en línea',
  generator: 'Next.js',
  applicationName: 'SEOCheckAI',
  referrer: 'origin-when-cross-origin',
  keywords: ['seo', 'buenas-practicas', 'AI', 'IA', 'Inteligencia Artificial'],
  authors: [{ name: 'John Serrano', url: 'https://johnserrano.co/' }],
  creator: 'John Serrano',
  publisher: 'John Serrano',
  // formatDetection: {
  //   email: false,
  //   address: false,
  //   telephone: false,
  // },
  openGraph: {
    title: 'SEO CheckAI Potencia la visibilidad de tu contenido',
    description: 'Descubre el poder de SEO CheckAI para impulsar la visibilidad de tu contenido en línea',
    images: ['/share.jpg'],
    locale: 'es_LA',
    type: 'website',
    url: 'https://johnserrano.co/', // url site now
    siteName: 'SEOCheckAI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEO CheckAI Potencia la visibilidad de tu contenido',
    description: 'Descubre el poder de SEO CheckAI para impulsar la visibilidad de tu contenido en línea',
    // siteId: '1467726470533754880',
    creator: '@Jandrey15',
    creatorId: '1467726470533754880',
    images: ['https://nextjs.org/og.png'], // Must be an absolute URL
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='es'>
      <body className={`${lato.className} bg-slate-100 dark:bg-slate-900`}>
        <ThemeProviders attribute='class' storageKey='theme' defaultTheme='system' enableSystem>
          {children}
        </ThemeProviders>
      </body>
    </html>
  )
}
