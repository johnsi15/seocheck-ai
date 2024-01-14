import { useState } from 'react'
import { type DataSeoAI } from '../types'
import { postDataAi } from '@/services/suggestionsData'

const initialDataSeoAI: DataSeoAI = {
  title: '',
  description: '',
  keyword: '',
  active: false,
}

export const useDataSeoAi = () => {
  const [suggestionsIa, setSuggestionsIa] = useState(initialDataSeoAI)
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const handleSuggestionsAI =
    ({ title, description, keyword }: DataSeoAI) =>
    async () => {
      try {
        setLoading(true)

        const data = await postDataAi({ title, description, keyword })
        console.log({ data })

        if (data.status !== 200) {
          setError(true)
          setLoading(false)
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

        const node = document.getElementById('suggestions')
        if (node) {
          node.scrollIntoView({ block: 'end', behavior: 'smooth', inline: 'nearest' })
        }
      } catch (error) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

  return { handleSuggestionsAI, suggestionsIa, errorAI: error, loading }
}
