import { extract } from '@extractus/article-extractor'

export async function webScraping({ url }: { url: string }) {
  try {
    const article = await extract(url)
    console.log(article)
  } catch (err) {
    console.error(err)
  }
}
