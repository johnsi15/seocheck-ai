import { type DataSeoAI } from '@/types'

class CustomError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

export const getDataAi = async () => {
  const res = await fetch(`/api`)
  return res.json()
}

interface ApiResponse {
  status: number
  suggestions: { content: string }
}

export const postDataAi = async (data: DataSeoAI): Promise<ApiResponse> => {
  const cleanData = {
    title: data.title.trim(),
    description: data.description.trim(),
    keyword: data.keyword?.trim() ?? '',
  }

  try {
    const res = await fetch(`/api`, {
      method: 'POST',
      body: JSON.stringify(cleanData),
    })

    if (!res.ok) throw new CustomError('Error fetching suggestions API', res.status)

    const suggestions = await res.json()

    return { status: res.status, suggestions }
  } catch (error) {
    console.log({ error })
    throw error
  }
}
