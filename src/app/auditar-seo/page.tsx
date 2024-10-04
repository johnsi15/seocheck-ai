import { AuditSeoClient } from '@/components/AuditSeoClient'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { InvalidWebAudit } from '@/components/InvalidWebAudit'
import { ScrollToTop } from '@/components/ScrollToTop'

export default async function AuditSeo({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { url } = searchParams

  const validUrl = typeof url === 'string' && url.startsWith('https://') ? url : ''

  if (!validUrl) {
    return <InvalidWebAudit message='Obtén un análisis completo del SEO de tu sitio web' />
  }

  if (validUrl.length === 0) {
    return <InvalidWebAudit message='Es necesario una URL ej: https://johnserrano.co' />
  }

  const API_URL = process.env.API_URL || 'http://localhost:8000/api/scraping'

  return (
    <>
      <ScrollToTop />
      <Header />
      <AuditSeoClient url={validUrl} apiUrl={API_URL} />
      <Footer />
    </>
  )
}
