'use client'

import { useSearchParams } from 'next/navigation'

export function WebScraping() {
  const urlParams = useSearchParams()

  const url = urlParams.get('url')

  return (
    <div>
      <h1>Web Scraping</h1>
    </div>
  )
}
