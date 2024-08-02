export interface DataSeoAI {
  title: string
  description: string
  keyword?: string
  active?: boolean
}

export interface AIError {
  hasError: boolean
  message: string
}

export interface Issue {
  key: string
  issue: boolean
  detail:
    | string
    | { src: string; alt: string }[]
    | {
        href: string
        text: string
      }[]
    | (string | null)[]
  count?: number
}

type ImageData = {
  src: string
  alt: string
}

type LinkData = {
  href: string
  text: string
}

export interface ScrapedData {
  title: string
  description: string
  h1: string
  h2: string
  images: ImageData[]
  links: LinkData[]
  schemaMarkup: string | (string | null)[]
  OGtitle: string
  OGdescription: string
  OGimage: string
  OGurl: string
}
