import { type Issue } from '@/types'

type IssueDetail = {
  value: string
  description: string
  solution: string
}

export const LANG = 'es'

export const title = 'seocheckai | Potencia la visibilidad de tu contenido'
export const description = 'Descubre el poder de seocheckai para impulsar la visibilidad de tu contenido en línea'

export const metaInfoDefault = {
  generator: 'Next.js',
  applicationName: 'seocheckai',
  keywords: ['seo', 'buenas-practicas', 'AI', 'IA', 'Inteligencia Artificial'],
  authors: [{ name: 'John Serrano', url: 'https://johnserrano.co/' }],
  creator: 'John Serrano',
  publisher: 'John Serrano',
  icons: {
    icon: '/icon.png',
    apple: '/apple-touch-icon.png',
  },
}

export const openGraph = {
  locale: 'es_LA',
  type: 'website',
  siteName: 'seocheckai',
}
export const twitter = {
  card: 'summary_large_image',
  // siteId: '1467726470533754880',
  creator: '@Jandrey15',
  creatorId: '1467726470533754880',
  images: ['https://seocheckai.com/share.png'], // Must be an absolute URL
}

export const issuesDescription = (issues: Issue[]): Record<string, IssueDetail> => {
  return {
    title: {
      value: 'Título',
      description:
        'Falta la etiqueta `<title>` en el HTML de la página. Esta etiqueta es crucial para el SEO ya que define el título que aparece en la pestaña del navegador y en los resultados de búsqueda.',
      solution:
        'Agrega una etiqueta `<title>` en el `<head>` del HTML con un título descriptivo y relevante para la página.',
    },
    titleLength: {
      value: 'Título largo',
      description: 'El título de la página es muy largo o muy corto.',
      solution: `Ajusta el título de la página. Tiene ${
        issues.find(item => item.key.includes('titleLength'))?.count
      } caracteres. Se recomienda que tenga entre 55 a 80 caracteres.`,
    },
    titles: {
      value: 'Títulos',
      description: `Tienes más de una etiqueta de title.`,
      solution: `Se recomienda tener solo una etiqueta de título en una página. Se encontraron ${
        issues.find(item => item.key.includes('titles'))?.count
      } títulos.`,
    },
    description: {
      value: 'Descripción',
      description:
        'La etiqueta `<meta name="description">` está ausente en el HTML de la página. Esta metaetiqueta proporciona una breve descripción del contenido de la página, la cual puede ser utilizada por los motores de búsqueda en los resultados de búsqueda y en las redes sociales.',
      solution:
        'Agrega una etiqueta `<meta name="description" content="Descripción breve y relevante del contenido de la página.">` en el `<head>` del HTML.',
    },
    descriptionLength: {
      value: 'Descripción larga',
      description: 'La descripción de la página es muy larga o muy corta.',
      solution: `Ajusta la descripción de la página. Tiene ${
        issues.find(item => item.key.includes('descriptionLength'))?.count
      } caracteres. Se recomienda que tenga entre 120 y 160 caracteres.`,
    },
    h1: {
      value: 'H1',
      description: 'El encabezado H1 no es adecuado para la página.',
      solution: 'Agrega una etiqueta `<h1>` en el cuerpo de la página.',
    },
    h2: {
      value: 'H2',
      description: 'El encabezado H2 no es adecuado para la página.',
      solution: 'Agrega una etiqueta `<h2>` en el cuerpo de la página.',
    },
    images: {
      value: 'Alt en la imágenes',
      description: 'Las imágenes no tienen atributos alt.',
      solution: 'Agrega atributos alt a las imágenes para mejorar la accesibilidad.',
    },
    internalLinks: {
      value: 'Enlaces internos',
      description: 'Los enlaces internos no están optimizados.',
      solution: 'Optimiza los enlaces internos para mejorar la accesibilidad.',
    },
    schemaMarkup: {
      value: 'Marcado de esquema',
      description: 'El marcado de esquema no es adecuado para la página.',
      solution: 'Ajusta el marcado de esquema para mejorar la accesibilidad.',
    },
  }
}
