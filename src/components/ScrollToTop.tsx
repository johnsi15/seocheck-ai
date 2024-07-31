'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export function ScrollToTop() {
  const searchParams = useSearchParams()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [searchParams])

  return null
}
