import { ScrapedData, Issue } from '@/types'
import { useEffect, useState } from 'react'

interface ScrapingData {
  score: number
  issues: Issue[]
  data: ScrapedData
  loading: boolean
  error: boolean
}

export function useWebScraping({ url, apiUrl }: { url: string; apiUrl: string }) {
  const [scrapingData, setScrapingData] = useState<ScrapingData>({
    score: 0,
    issues: [],
    data: {
      title: '',
      description: '',
      h1: '',
      h2: '',
      images: [],
      links: [],
      schemaMarkup: '',
      OGtitle: '',
      OGdescription: '',
      OGimage: '',
      OGurl: '',
    },
    error: false,
    loading: true,
  })

  useEffect(() => {
    const getData = async () => {
      setScrapingData(prev => ({ ...prev, loading: true, error: false }))

      try {
        const res = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url }),
        })

        if (!res.ok) {
          setScrapingData(prev => ({ ...prev, loading: false, error: true }))
          throw new Error('Error in the request API scraping')
        }

        const result = await res.json()

        const { score, issues, data }: ScrapingData = result.data

        setScrapingData({
          score,
          issues,
          data,
          loading: false,
          error: false,
        })
      } catch (error) {
        console.log('This is error: ' + error)
        setScrapingData(prev => ({ ...prev, loading: false, error: true }))
      }
    }

    getData()
  }, [url, apiUrl])

  return scrapingData
}
