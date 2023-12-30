import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProviders } from '@/components/ThemeProviders'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SEO CheckAI Potencia la visibilidad de tu contenido',
  description: 'Descubre el poder de SEO CheckAI para impulsar la visibilidad de tu contenido en línea',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='es'>
      <body className={`${inter.className} bg-slate-100 dark:bg-slate-900`}>
        <ThemeProviders attribute='class' storageKey='theme' defaultTheme='system' enableSystem>
          {children}
        </ThemeProviders>
      </body>
    </html>
  )
}
