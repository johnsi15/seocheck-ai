'use client'
import { ThemeProvider } from 'next-themes'
import React, { useState, useEffect } from 'react'

export function ThemeProviders({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ThemeProvider attribute='class' storageKey='theme'>
      {children}
    </ThemeProvider>
  )
}
