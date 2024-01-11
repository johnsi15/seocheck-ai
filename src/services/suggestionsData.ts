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

export const postDataAi = async (data: DataSeoAI) => {
  try {
    const res = await fetch(`/api`, {
      method: 'POST',
      body: JSON.stringify(data),
    })

    if (!res.ok) throw new CustomError('Error fetching suggestions API', res.status)

    return { status: res.status, ...res.json() }
  } catch (error) {
    console.log({ error })
    return error
  }
}
