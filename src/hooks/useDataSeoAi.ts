import { useState } from 'react'
import { useLogger } from 'next-axiom'
import { type DataSeoAI, type AIError } from '../types'
import { postDataAi } from '@/services/suggestionsData'

const initialDataSeoAI: DataSeoAI = {
  title: '',
  description: '',
  keyword: '',
  active: false,
}

export const useDataSeoAi = () => {
  const [suggestionsIa, setSuggestionsIa] = useState(initialDataSeoAI)
  const [error, setError] = useState<AIError>({ hasError: false, message: '' })
  const [loading, setLoading] = useState<boolean>(false)
  const log = useLogger()

  const handleSuggestionsAI =
    ({ title, description, keyword }: DataSeoAI) =>
    async () => {
      setLoading(true)
      const storedData = localStorage.getItem('seoDataKey')

      let localDataSeo

      if (storedData !== null) {
        localDataSeo = JSON.parse(storedData)
        const revalidateData = localDataSeo.title === title && localDataSeo.description === description

        localDataSeo = revalidateData
          ? { ...localDataSeo, count: localDataSeo.count + 1 }
          : { title, description, count: 1 }
      } else {
        localDataSeo = { title, description, count: 1 }
      }

      localStorage.setItem('seoDataKey', JSON.stringify(localDataSeo))

      try {
        if (localDataSeo.count > 3) {
          const message =
            'Lo siento, no es posible generar más sugerencias para este título y descripción en particular.'
          setError({
            hasError: true,
            message,
          })

          setLoading(false)
          log.warn('LocalStorage data rate limit suggestions, max 3 same title and description', { message })
          return
        }

        const data = await postDataAi({ title, description, keyword })

        if (data.status !== 200) {
          const message = 'Por favor, inténtalo de nuevo más tarde. Es posible que tu crédito se haya agotado.'

          setError({
            hasError: true,
            message,
          })

          setLoading(false)
          log.error('API Error generating suggestions possibly exhausted credit', { status: data.status, message })
          return
        }

        const resSuggestions = data.suggestions.content.split('\n')

        const titleSuggestions = resSuggestions[0]?.slice(8) ?? title
        const descriptionSuggestions = resSuggestions[1]?.slice(13) ?? description
        const keywordSuggestions = resSuggestions[2] || ''

        setSuggestionsIa({
          title: titleSuggestions,
          description: descriptionSuggestions,
          keyword: keywordSuggestions,
          active: true,
        })

        log.info('API Suggestions generated', { status: 200, suggestions: resSuggestions })

        const node = document.getElementById('suggestions')
        if (node) {
          node.scrollIntoView({ block: 'end', behavior: 'smooth', inline: 'nearest' })
        }
      } catch (error) {
        setError({ hasError: true, message: 'Por favor, inténtalo de nuevo más tarde.' })
        log.error('API Error generating suggestions', { error })
      } finally {
        setLoading(false)
      }
    }

  return { handleSuggestionsAI, suggestionsIa, errorAI: error, loading }
}
