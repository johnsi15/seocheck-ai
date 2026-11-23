import type { Message } from 'ai'

class SuggestionRequestError extends Error {}

export const suggestionChatOptions = {
  keepLastMessageOnError: true,
  experimental_prepareRequestBody: ({ messages }: { messages: Message[] }) => {
    const message = messages.at(-1)
    return { messages: message ? [{ role: message.role, content: message.content }] : [] }
  },
  onResponse: (response: Response) => {
    switch (response.status) {
      case 413:
        throw new SuggestionRequestError('El contenido es demasiado largo para generar sugerencias.')
      case 429:
        throw new SuggestionRequestError('Se alcanzó el límite de sugerencias con IA. Intenta más tarde.')
      case 503:
        throw new SuggestionRequestError('Las sugerencias con IA no están disponibles por ahora.')
    }
  },
}

export function suggestionErrorMessage(error: Error) {
  return error instanceof SuggestionRequestError ? error.message : 'No pudimos generar sugerencias. Intenta de nuevo.'
}
