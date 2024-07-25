import { chromium } from 'playwright'

export async function webScraping({ url }: { url: string }) {
  const browser = await chromium.launch({
    headless: true,
  })

  const page = await browser.newPage()
  await page.goto(url)

  const title = await page.title()

  // Ejemplo de cómo extraer la meta description
  const description = await page
    .$eval('meta[name="description"]', element => element.content)
    .catch(() => 'No description found')

  // Ejemplo de cómo extraer H1
  const h1 = await page.$eval('h1', element => element.innerText).catch(() => 'No H1 found')

  // Ejemplo de cómo extraer alt text de imágenes
  const images = await page.$$eval('img', imgs =>
    imgs.map(img => ({
      src: img.src,
      alt: img.alt || 'No alt attribute',
    }))
  )

  // Ejemplo de cómo extraer los links internos y externos
  const links = await page.$$eval('a', anchors =>
    anchors.map(a => ({
      href: a.href,
      text: a.innerText,
    }))
  )

  // Ejemplo de cómo extraer Schema Markup JSON-LD
  const schemaMarkup = await page.$$eval('script[type="application/ld+json"]', scripts =>
    scripts.map(script => script.innerText)
  )

  console.log('Title:', title)
  console.log('Description:', description)
  console.log('H1:', h1)
  console.log('Images:', images)
  console.log('Links:', links)
  console.log('Schema Markup JSON-LD:', schemaMarkup)
  console.log('-----------------------')

  await browser.close()

  return {
    title,
    description,
    h1,
    images,
    links,
    schemaMarkup,
  }
}
