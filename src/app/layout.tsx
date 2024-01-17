import type { Metadata } from 'next'
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
    images: ['/share.jpg'],
    url: 'https://johnserrano.co/', // url site now
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
        <ThemeProviders attribute='class' storageKey='theme' defaultTheme='system' enableSystem>
          {children}
        </ThemeProviders>
      </body>
    </html>
  )
}
