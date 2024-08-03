import { ScrapedData, Issue } from '@/types'
interface ScrapingData {
  score: number
  issues: Issue[]
  data: ScrapedData
}

export async function webScraping({ url }: { url: string }) {
  const API_URL = process.env.API_URL || 'http://localhost:8000/api/scraping'

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    })

    if (!res.ok) {
      throw new Error('Error in the request API scraping')
    }

    const result = await res.json()

    const { score, issues, data }: ScrapingData = result.data

    return {
      score,
      issues,
      data,
    }
  } catch (error) {
    console.log('This is error: ' + error)
  }

  return {
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
  }
}
