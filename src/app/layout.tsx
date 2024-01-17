import type { Metadata } from 'next'
// import Script from 'next/script'
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
        <GTMnoscript />
        <ThemeProviders attribute='class' storageKey='theme' defaultTheme='system' enableSystem>
          {children}
        </ThemeProviders>
      </body>
      {/* <Script src='https://www.googletagmanager.com/gtag/js?id=G-F4NC0KEW3E' />
      <Script id='google-analytics' strategy='afterInteractive'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-F4NC0KEW3E');
        `}
      </Script> */}
      <GTMscript />
    </html>
  )
}
