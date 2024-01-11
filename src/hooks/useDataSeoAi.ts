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

  const handleSuggestionsAI =
    ({ title, description, keyword }: DataSeoAI) =>
    async () => {
      const data = await postDataAi({ title, description, keyword })
      console.log({ data })

      if (data.status !== 200) {
        setError(true)
        return
      }

      console.log({ title })
      setSuggestionsIa({
        title,
        description,
        keyword,
        active: true,
      })

      const node = document.getElementById('suggestions')
      if (node) {
        node.scrollIntoView({ block: 'end', behavior: 'smooth', inline: 'nearest' })
      }
    }

  return { handleSuggestionsAI, suggestionsIa, errorAI: error }
}
