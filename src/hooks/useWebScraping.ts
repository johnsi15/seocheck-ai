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
  console.log({ urlWebScrping: url })
  const API_URL = apiUrl

  const [data, setData] = useState<ScrapingData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const getData = async () => {
      setLoading(true)

      try {
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url }),
        })

        if (!res.ok) {
          setError(true)
          throw new Error('Error in the request API scraping')
        }

        const result = await res.json()

        const { score, issues, data }: ScrapingData = result.data

        setData({ score, issues, data, loading, error })
      } catch (error) {
        console.log('This is error: ' + error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    getData()
  }, [url, loading, error])

  return (
    data || {
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
    }
  )
}
