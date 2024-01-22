import type { Metadata } from 'next'
import { AxiomWebVitals } from 'next-axiom'
import { GTMnoscript, GTMscript } from '@/components/GTM'
import { Lato } from 'next/font/google'
import './globals.css'
import { ThemeProviders } from '@/components/ThemeProviders'
import { metaInfoDefault, openGraph, twitter, title, description } from '@/lib/consts'

const lato = Lato({ weight: ['300', '400', '700', '900'], subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title,
  description,
  ...metaInfoDefault,
  // formatDetection: {
  //   email: false,
  //   address: false,
  //   telephone: false,
  // },
  openGraph: {
    title,
    description,
    ...openGraph,
    images: [
      {
        url: 'https://seocheckai.com/share.png', // Must be an absolute URL
        width: 1640,
        height: 924,
        alt: 'seocheckai',
      },
    ],
    url: 'https://seocheckai.com/', // url site now
  },
  twitter: {
    title,
    description,
    ...twitter,
  },
  referrer: 'origin-when-cross-origin',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='es'>
      <body className={`${lato.className} bg-slate-100 dark:bg-slate-900`}>
        <GTMnoscript />
        <ThemeProviders attribute='class' storageKey='theme' defaultTheme='system' enableSystem>
          {children}
        </ThemeProviders>
      </body>
      <AxiomWebVitals />
      <GTMscript />
    </html>
  )
}
