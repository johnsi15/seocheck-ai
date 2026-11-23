'use client'

import { useChat } from 'ai/react'
import { Loading } from './Loading'
import { suggestionChatOptions, suggestionErrorMessage } from '@/lib/suggestion-chat'
import { type Issue, ScrapedData } from '@/types'

export function SeoAuditSuggestions({ scrapedData, issues }: { scrapedData: ScrapedData; issues: Issue[] }) {
  const { messages, append, isLoading, error, reload } = useChat({
    api: '/api/seo-audit-suggestions',
    ...suggestionChatOptions,
  })

  const handleSuggestions = () => {
    if (isLoading) return
    if (messages.length > 0) {
      void reload()
      return
    }

    const issuesFiltered = issues.filter(issue => issue.issue)
    void append({
      content: `Estos son los datos del scrapedData: ${JSON.stringify(
        scrapedData
      )}\n Estos son los issues encontrados: ${JSON.stringify(issuesFiltered)}`,
      role: 'user',
    })
  }

  let suggestionsList: string[] = []

  const assistantMessages = messages.filter(message => message.role === 'assistant')
  const lastAssistantMessage = assistantMessages[assistantMessages.length - 1]

  if (lastAssistantMessage?.content && lastAssistantMessage.content.length > 0) {
    suggestionsList = lastAssistantMessage.content.split('***')
  }

  return (
    <>
      <button
        type='button'
        disabled={isLoading}
        onClick={handleSuggestions}
        className='mt-5 rounded-lg bg-rose-700 px-4 py-3 text-white hover:bg-rose-600 disabled:opacity-75'
      >
        {isLoading
          ? 'Generando sugerencias…'
          : error
            ? 'Intentar de nuevo'
            : lastAssistantMessage
              ? 'Volver a generar sugerencias con IA'
              : 'Generar sugerencias con IA'}
      </button>
      <p aria-live='polite' className='mt-2 text-lg dark:text-slate-200'>
        {error ? suggestionErrorMessage(error) : ''}
      </p>

      {!error && messages.length > 0 && (
        <div className='mt-5 w-full'>
          <ul className='flex flex-col gap-4 md:w-[700px] min-h-[100px] overflow-hidden'>
            {suggestionsList.map((suggestion, index) => {
              const [title, detail] = suggestion.split('::')

              if (!detail) return

              return (
                <li key={index} className='min-h-[100px] inline-block'>
                  <span className='text-xl mb-2 inline-block font-semibold dark:text-rose-600 text-rose-700'>
                    {title}
                  </span>
                  <div className='min-h-[100px] mt-1 rounded-md shadow-sm px-4 pt-2 pb-4 whitespace-pre-line border border-red-600 bg-white dark:bg-transparent'>
                    {detail}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      )}

      <div className='w-full flex justify-center my-5'>{isLoading && <Loading />}</div>
    </>
  )
}
