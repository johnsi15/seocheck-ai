import { type CoreMessage, streamText } from 'ai'
import { openai } from '@ai-sdk/openai'

export const runtime = 'edge'

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY environment variable is required.')
}

const defaultMessages: CoreMessage[] = [
  {
    role: 'system',
    content: `Como un asistente útil que proporciona sugerencias de SEO, tu objetivo es analizar los datos proporcionados y sugerir mejoras solo donde sea necesario. Tu enfoque principal debe ser mejorar el ranking en los resultados de búsqueda mediante la optimización de los siguientes elementos: title, description, alt de imágenes, h1, internal links, Schema Markup JSON-LD, h2 si hace falta.
    
    Instrucciones:
    - Solo proporcionarás sugerencias si detectas fallas o áreas de mejora.
    - Deberás asegurarte de que exista coherencia entre los campos title y description y los textos proporcionados.
    - Utiliza el siguiente formato para las sugerencias:
    - Usa *** para separar los distintos análisis y sugerencias.
    - Cada sugerencia debe contener una breve descripción del problema y una solución concreta.

    Criterios de Análisis:
    - Title:
      - Falta la etiqueta <title>: Sugiere agregar una etiqueta <title> relevante.
      - Título largo o corto: Si el título es demasiado largo o corto, sugiere un ajuste con un ejemplo.
    - Description:
      - Falta la etiqueta <meta name="description">: Sugiere agregar una descripción adecuada.
      - Descripción larga o corta: Si la descripción no está dentro del rango ideal (120-160 caracteres), sugiere un ajuste.
    - H1:
      - Inadecuado o inexistente: Si el H1 no es adecuado, sugiere una alternativa que mejore el SEO.
    - Alt en imágenes:
      - Falta de atributos alt: Sugiere agregar alt descripciones relevantes para cada imagen.
    - Enlaces internos:
      - Enlaces sin texto o sin optimizar: Sugiere mejoras para los textos de los enlaces o la estructura de los mismos, y si no existen sugiere agregar alguno.
    - Schema Markup JSON-LD:
      - Campos vacíos o incorrectos: Sugiere correcciones específicas.

    Formato de salida deseado:
    Título::
    - Problema: Descripción del problema.\n
    - Sugerencia: Solución propuesta con un ejemplo.\n
    ***
    Descripción:
    - Problema: Descripción del problema.\n
    - Sugerencia: Solución propuesta con un ejemplo.\n
    ***
    H1::
    - Problema: Descripción del problema.\n
    - Sugerencia: Solución propuesta con un ejemplo.\n
    ***

    Tener en cuenta estos valores:
    valores = title: {
      value: 'Título',
      description:
        'Falta la etiqueta <title> en el HTML de la página. Esta etiqueta es crucial para el SEO ya que define el título que aparece en la pestaña del navegador y en los resultados de búsqueda.',
      solution:
        'Agrega una etiqueta <title> en el <head> del HTML con un título descriptivo y relevante para la página.',
    },
    titleLength: {
      value: 'Título largo',
      description: 'El título de la página es muy largo o muy corto.',
      solution: Ajusta el título de la página. Tiene x caracteres. Se recomienda que tenga entre 55 a 80 caracteres.,
    },
    titles: {
      value: 'Títulos',
      description: Tienes más de una etiqueta de title.,
      solution: Se recomienda tener solo una etiqueta de título en una página. Se encontraron x títulos.,
    },
    description: {
      value: 'Descripción',
      description:
        'La etiqueta <meta name="description"> está ausente en el HTML de la página. Esta metaetiqueta proporciona una breve descripción del contenido de la página, la cual puede ser utilizada por los motores de búsqueda en los resultados de búsqueda y en las redes sociales.',
      solution:
        'Agrega una etiqueta <meta name="description" content="Descripción breve y relevante del contenido de la página."> en el <head> del HTML.',
    },
    descriptionLength: {
      value: 'Descripción larga',
      description: 'La descripción de la página es muy larga o muy corta.',
      solution: Ajusta la descripción de la página. Tiene x caracteres. Se recomienda que tenga entre 120 y 160 caracteres.,
    },
    h1: {
      value: 'H1',
      description: 'El encabezado H1 no es adecuado para la página.',
      solution: 'Agrega una etiqueta <h1> en el cuerpo de la página.',
    },
    h2: {
      value: 'H2',
      description: 'El encabezado H2 no es adecuado para la página.',
      solution: 'Agrega una etiqueta <h2> en el cuerpo de la página.',
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
    }
    `,
  },
  {
    role: 'user',
    content: `
      Estos son los datos del scrapedData:
      title: Desarrollador web - John Serrano | Frontend, JavaScript, TypeScript, React, Node.js
      description: Ingeniero de software con más de 7 años de experiencia, desarrollo web y entusiasta de tecnologías web como JavaScript, TypeScript, Node.js y React.js.
      h1: Desarrollador web - John Serrano
      images: [
        {
          src: 'https://res.cloudinary.com/john-serrano/image/upload/v1721915962/John%20Serrano/Blog%20Post/tcubzloovmups9pup0ug.png',
          alt: 'Hackatón de Midudev: Una oportunidad para aprender y conectar + vercel'
        },
        {
          src: 'https://res.cloudinary.com/john-serrano/image/upload/v1714237227/John%20Serrano/Blog%20Post/types-vs-interface/Dise%C3%B1o_sin_t%C3%ADtulo_fciqsh.png',
          alt: 'TypeScript, Types vs interfaces'
        },
        {
          src: 'https://res.cloudinary.com/john-serrano/image/upload/v1712408986/John%20Serrano/Blog%20Post/novedades-de-react-19-que-podemos-esperar-en-esta-nueva-version/react19_gufm1n.jpg',
          alt: 'Novedades de React 19: ¿Qué podemos esperar en esta nueva versión?'
        },
        {
          src: 'https://res.cloudinary.com/john-serrano/image/upload/v1709498345/John%20Serrano/Blog%20Post/mejora-tu-seo-con-esta-avanzada-herramienta-de-validacion-y-sugerencias/seocheckai_mpb376.jpg',
          alt: 'Mejora tu SEO con esta avanzada herramienta de validación y sugerencias'
        },
        {
          src: 'https://johnserrano.co/bmc-logo.svg',
          alt: 'Ayúdame con tu donación'
        }
      ]
      links: [
        { href: 'https://johnserrano.co/', text: 'John Serrano' },
        { href: 'https://johnserrano.co/sobre-mi', text: 'Sobre Mi' },
        { href: 'https://johnserrano.co/blog', text: 'Blog' },
        { href: 'https://johnserrano.co/tags/react', text: 'React' },
        { href: 'https://johnserrano.co/portafolio', text: 'Portafolio' },
        { href: 'https://johnserrano.co/servicios', text: 'Servicios' },
        { href: 'https://johnserrano.co/', text: ' John Serrano ' },
        { href: 'https://johnserrano.co/sobre-mi', text: ' Sobre mi ' },
        { href: 'https://johnserrano.co/blog', text: ' Blog ' },
        { href: 'https://johnserrano.co/tags/react', text: ' React ' },
        { href: 'https://johnserrano.co/portafolio', text: ' Portafolio ' },
        { href: 'https://johnserrano.co/servicios', text: ' Servicios ' },
        { href: 'https://johnserrano.co/blog', text: 'blog' },
        { href: 'https://johnserrano.co/sobre-mi', text: 'sobre mí' },
        {
          href: 'https://johnserrano.co/tags/desarrollo-web',
          text: 'Desarrollo web'
        },
        {
          href: 'https://pay.hotmart.com/O67718482D',
          text: 'Fundamentos de programación con JavaScript'
        },
        {
          href: 'https://johnserrano.co/blog/hackaton-de-midudev-una-oportunidad-para-aprender-y-conectar-vercel',
          text: ''
        },
        {
          href: 'https://johnserrano.co/blog/hackaton-de-midudev-una-oportunidad-para-aprender-y-conectar-vercel',
          text: 'Hackatón de Midudev: Una oportunidad para aprender y conectar + vercel'
        },
        {
          href: 'https://johnserrano.co/blog/typescript-types-vs-interfaces',
          text: ''
        },
        {
          href: 'https://johnserrano.co/blog/typescript-types-vs-interfaces',
          text: 'TypeScript, Types vs interfaces'
        },
        {
          href: 'https://johnserrano.co/blog/novedades-de-react-19-que-podemos-esperar-en-esta-nueva-version',
          text: ''
        },
        {
          href: 'https://johnserrano.co/blog/novedades-de-react-19-que-podemos-esperar-en-esta-nueva-version',
          text: 'Novedades de React 19: ¿Qué podemos esperar en esta nueva versión?'
        },
        {
          href: 'https://johnserrano.co/blog/mejora-tu-seo-con-esta-avanzada-herramienta-de-validacion-y-sugerencias',
          text: ''
        },
        {
          href: 'https://johnserrano.co/blog/mejora-tu-seo-con-esta-avanzada-herramienta-de-validacion-y-sugerencias',
          text: 'Mejora tu SEO con esta avanzada herramienta de validación y sugerencias'
        },
        {
          href: 'https://link.mercadopago.com.co/johnserrano',
          text: 'Donar aquí'
        },
        {
          href: 'https://www.buymeacoffee.com/jandrey15',
          text: 'Cómprame un café'
        },
        {
          href: 'https://twitter.com/johnserranodev',
          text: '(soy @johnserranodev)'
        },
        {
          href: 'https://johnserrano.co/legal',
          text: 'Aviso legal y política de privacidad'
        },
        { href: 'https://vercel.com/', text: 'Alojado en Vercel ❤️' },
        { href: 'https://github.com/johnsi15', text: '' },
        { href: 'https://www.linkedin.com/in/jandreys15', text: '' },
        { href: 'https://twitter.com/johnserranodev', text: '' },
        { href: 'https://www.facebook.com/johnserranodev', text: '' },
        { href: 'https://www.youtube.com/@johnserranodev', text: '' }
      ]
      schemaMarkup: [
        '{"@context":"http://schema.org","@type":"BlogPosting","mainEntityOfPage":{"@type":"WebPage","@id":"https://johnserrano.co/"},"headline":"Desarrollador web - John Serrano | Frontend, JavaScript, TypeScript, React, Node.js","image":["https://johnserrano.co/default.png"],"datePublished":"2015-09-15T15:49:50-05:00","dateModified":"","author":{"@type":"Person","name":"John Serrano"},"publisher":{"@type":"Organization","name":"John Serrano","logo":{"@type":"ImageObject","url":"https://johnserrano.co/default.jpg"}},"description":"Ingeniero de software con más de 7 años de experiencia, desarrollo web y entusiasta de tecnologías web como JavaScript, TypeScript, Node.js y React.js."}'
      ]
      OGtitle: Desarrollador web - John Serrano | Frontend, JavaScript, TypeScript, React, Node.js
      OGdescription: Ingeniero de software con más de 7 años de experiencia, desarrollo web y entusiasta de tecnologías web como JavaScript, TypeScript, Node.js y React.js.
      OGimage: https://johnserrano.co/default.png
      OGurl: https://johnserrano.co/

      Estos son los issues encontrados:
      [
        {
          key: 'titleLength',
          issue: true,
          detail: 
            'Desarrollador web - John Serrano | Frontend, JavaScript, TypeScript, React, Node.js',
          count: 83
        }
      ]
    `,
  },
  {
    role: 'assistant',
    content: `Título::
        Longitud del título: El título actual es:\n
        <title>Desarrollador web - John Serrano | Frontend, JavaScript, TypeScript, React, Node.js</title>\n
        Sugerencia: Este título tiene 83 caracteres, lo cual es ligeramente largo. Se recomienda ajustarlo para que tenga entre 55 a 80 caracteres.\n Una opción podría ser:\n
        <title>John Serrano - Desarrollador web | JavaScript y React</title>\n
        Esto reduce la longitud a 64 caracteres, manteniendo el título conciso y dentro del rango recomendado.\n
        ***
      Descripción::
        Longitud de la descripción: La descripción actual es:\n
        <meta name="description" content="Ingeniero de software con más de 7 años de experiencia, desarrollo web y entusiasta de tecnologías web como JavaScript, TypeScript, Node.js y React.js.">\n
        Sugerencia: Si la descripción es muy larga, podrías acortarla a algo como:\n
        <meta name="description" content="Ingeniero de software con 7 años de experiencia en desarrollo web con JavaScript, TypeScript y React.js.">\n
        Esto la mantiene entre 120 y 160 caracteres, que es el rango ideal para maximizar su efectividad en los resultados de búsqueda.\n
        ***
      H1::
        Repetición del contenido: El H1 actual es:\n
        <h1>Desarrollador web - John Serrano</h1>\n
        Sugerencia: Es mejor diversificar el H1 en relación al título para añadir más valor. Una alternativa podría ser:\n
        <h1>John Serrano: Experto en Desarrollo Web y Tecnologías Modernas</h1>\n
        Esto introduce variabilidad y enriquece el contenido desde el punto de vista de SEO.\n
        ***
      Imágenes::
        Alt en las imágenes: Los atributos alt actuales están bien, pero como ejemplo, asegúrate de que todos los alt sean descriptivos y contextuales, como en:\n
        <img src="https://johnserrano.co/bmc-logo.svg" alt="Logo de Buy Me a Coffee para donar a John Serrano">\n
        Esto ayuda tanto a la accesibilidad como al SEO.\n
        ***
      Links Internos::
        Textos de enlaces vacíos: Se detectaron varios enlaces sin texto visible, como:\n
        <a href="https://github.com/johnsi15"></a>\n
        Sugerencia: Añadir textos descriptivos a estos enlaces, como:\n
        <a href="https://github.com/johnsi15">Visita mi perfil en GitHub</a>\n
        Esto mejora la accesibilidad y proporciona contexto a los usuarios y motores de búsqueda.\n
        ***
      Schema Markup JSON-LD::
        Campos vacíos: El marcado de esquema tiene un campo vacío:\n
        "dateModified": ""\n
        Sugerencia: Si la página fue actualizada recientemente, completa este campo para proporcionar información precisa:\n
        "dateModified": "2024-08-01T12:00:00-05:00"\n
        Esto mejora la precisión del contenido indexado por los motores de búsqueda.\n
        ***
      Open Graph (OG) Tags::
        Coherencia: Las etiquetas OG (title, description, image, url) están bien configuradas y son coherentes con los elementos HTML básicos. Como ejemplo:\n
        <meta property="og:title" content="John Serrano - Desarrollador web | JavaScript y React">\n
        <meta property="og:description" content="Ingeniero de software con 7 años de experiencia en desarrollo web con JavaScript, TypeScript y React.js.">\n
        <meta property="og:image" content="https://johnserrano.co/default.png">\n
        <meta property="og:url" content="https://johnserrano.co/">\n
        Esto asegura que el contenido sea bien presentado en redes sociales.\n
        ***
      Recomendación Adicional::
        Palabras clave: Integra palabras clave relevantes de manera natural en el contenido. Por ejemplo:\n
        <p>Como desarrollador web con experiencia en JavaScript y React, John Serrano ofrece servicios de desarrollo frontend altamente personalizados.</p>\n
        Esto mejora la relevancia de la página para los motores de búsqueda y la experiencia del usuario.
        ***
    `,
  },
]

export async function auditSuggestions({ messages }: { messages: CoreMessage[] }) {
  const result = await streamText({
    model: openai('gpt-4o-mini'),
    messages: [...defaultMessages, ...messages],
  })

  return { result }
}

export async function POST(req: Request) {
  const { messages }: { messages: CoreMessage[] } = await req.json()

  const { result } = await auditSuggestions({ messages })

  return result.toAIStreamResponse()
}
