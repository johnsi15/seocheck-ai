import { chromium } from 'playwright'

export async function webScraping({ url }: { url: string }) {
  const browser = await chromium.launch({
    headless: true,
  })

  const page = await browser.newPage()
  await page.goto(url, { timeout: 60000 })

  const title = await page.title()

  const titles = await page.$$eval('title', titles => titles.map(title => title.textContent))

  const description = await page
    .$eval('meta[name="description"]', (element: HTMLMetaElement) => element.content)
    .catch(() => 'No description found')

  const OGtitle = await page
    .$eval('meta[name="og:title"]', (element: HTMLMetaElement) => element.content)
    .catch(() => 'No og:title found')

  const OGdescription = await page
    .$eval('meta[name="og:description"]', (element: HTMLMetaElement) => element.content)
    .catch(() => 'No og:description found')

  const OGimage = await page
    .$eval('meta[name="og:image"]', (element: HTMLMetaElement) => element.content)
    .catch(() => 'No og:image found')

  const OGurl = await page
    .$eval('meta[name="og:url"]', (element: HTMLMetaElement) => element.content)
    .catch(() => 'No og:url found')

  const h1 = await page.$eval('h1', element => element.innerText).catch(() => 'No H1 found')
  const h2 = await page.$eval('h2', element => element.innerText).catch(() => 'No H2 found')

  const images = await page.$$eval('img', imgs =>
    imgs.map(img => ({
      src: img.src,
      alt: img.alt || 'No alt attribute',
    }))
  )

  const links = await page.$$eval('a', anchors =>
    anchors.map(a => ({
      href: a.href,
      text: a.innerText,
    }))
  )

  const schemaMarkup = await page.$$eval('script[type="application/ld+json"]', scripts =>
    scripts.map(script => script.innerText)
  )

  // console.log('Title:', title)
  // console.log('Description:', description)
  // console.log('H1:', h1)
  // console.log('Images:', images)
  // console.log('Links:', links)
  // console.log('Schema Markup JSON-LD:', schemaMarkup)
  // console.log('-----------------------')

  await browser.close()

  let score = 100

  const titleLength = title?.length
  const descriptionLength = description?.length

  if (!title) score -= 5

  if (titleLength > 80 || titleLength < 55) score -= 3

  console.log({ titleLength, descriptionLength })

  if (titles.length > 1) score -= 3

  if (description.includes('No description found')) score -= 5

  if (descriptionLength > 160 || descriptionLength < 119) {
    score -= 3
  }

  if (h1.includes('No H1 found')) score -= 5

  images.forEach(img => {
    if (img.alt.includes('No alt attribute')) score -= 3
  })

  const getDomainFromUrl = (url: string) => {
    const urlObj = new URL(url)
    return urlObj.hostname
  }

  const domainToCheck = getDomainFromUrl(url)
  let countLinks = 0

  links.forEach(link => {
    if (link.href.includes(domainToCheck)) {
      countLinks++
    }
  })

  if (countLinks <= 0) score -= 5
  if (countLinks <= 3) score -= 3

  if (!schemaMarkup) score -= 5

  console.log('Score:', score)

  const issues = [
    {
      key: 'title',
      issue: !title,
      detail: title,
    },
    {
      key: 'titleLength',
      issue: titleLength > 80 || titleLength < 55,
      detail: title,
      count: titleLength,
    },
    {
      key: 'titles',
      issue: titles.length > 1,
      detail: titles,
      count: titles.length,
    },
    {
      key: 'description',
      issue: description.includes('No description found'),
      detail: description,
    },
    {
      key: 'descriptionLength',
      issue: descriptionLength > 160 || descriptionLength < 119,
      detail: description,
      count: descriptionLength,
    },
    {
      key: 'h1',
      issue: h1.includes('No H1 found'),
      detail: h1,
    },
    {
      key: 'h2',
      issue: h2.includes('No H2 found'),
      detail: h2,
    },
    {
      key: 'images',
      issue: images.some(img => img.alt.includes('No alt attribute')),
      detail: images.filter(img => img.alt.includes('No alt attribute')),
    },
    {
      key: 'internalLinks',
      issue: countLinks <= 0 || countLinks <= 3,
      detail: links,
      count: countLinks,
    },
    {
      key: 'schemaMarkup',
      issue: !schemaMarkup,
      detail: 'No schema found',
    },
  ]

  return {
    score,
    issues,
    data: {
      title,
      description,
      h1,
      h2,
      images,
      links,
      schemaMarkup,
      OGtitle,
      OGdescription,
      OGimage,
      OGurl,
    },
  }
}
