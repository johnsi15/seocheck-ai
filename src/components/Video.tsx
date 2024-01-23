'use client'

import React, { ReactElement, useEffect, useState } from 'react'
import { type PlyrOptions, type PlyrSource } from 'plyr-react'
import 'plyr-react/plyr.css'
import '@/styles/video.css'

type PlyrProps = {
  source: PlyrSource
  options: PlyrOptions
}

const plyrProps: PlyrProps = {
  source: {
    type: 'video',
    title: 'seocheckai ejemplo validar el SEO de tu título y descripción',
    sources: [
      {
        src: 'https://res.cloudinary.com/john-serrano/video/upload/v1706029556/seocheckai/video/seocheckai_preview_fh2gpn.mp4',
        type: 'video/mp4',
        size: 1920,
      },
    ],
  },
  options: {
    debug: false,
    controls: ['play-large', 'play', 'progress', 'current-time', 'fullscreen'],
  },
}

export function Video() {
  const [importedComponent, setImportedComponent] = useState<ReactElement | null>(null)

  useEffect(() => {
    const importComponent = async () => {
      const myModule = await import('plyr-react')
      const Plyr = myModule.default
      setImportedComponent(<Plyr {...plyrProps} />)
    }

    importComponent()
  }, [])

  return <section className='aspect-video mx-16 mt-20 mb-28'>{importedComponent}</section>
}
