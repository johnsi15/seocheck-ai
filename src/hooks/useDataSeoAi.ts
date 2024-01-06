import { useState } from 'react'
import { type DataSeoAI } from '../types'

const initialDataSeoAI: DataSeoAI = {
  title: '',
  description: '',
  active: false,
}

export const useDataSeoAi = ({ getValues }: { getValues: (name: string) => string }) => {
  const [suggestionsIa, setSuggestionsIa] = useState(initialDataSeoAI)

  const handleSuggestionsAI = () => {
    const title = getValues('title')
    const description = getValues('description')
    const keyword = getValues('keyword')

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

  return { handleSuggestionsAI, suggestionsIa }
}
