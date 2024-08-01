'use client'

import { useChat } from 'ai/react'
import { Loading } from './Loading'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { type Issue, ScrapedData } from '@/types'

export function SeoAuditSuggestions({ scrapedData, issues }: { scrapedData: ScrapedData; issues: Issue[] }) {
  const searchParams = useSearchParams()

  const { messages, append, isLoading, error, reload } = useChat({
    api: '/api/seo-audit-suggestions',
    keepLastMessageOnError: true,
  })

  const issuesFiltered = issues.filter(issue => issue.issue)

  useEffect(() => {
    append({
      content: `Estos son los datos del scrapedData: ${JSON.stringify(
        scrapedData
      )}\n Estos son los issues encontrados: ${JSON.stringify(issuesFiltered)}`,
      role: 'user',
    })
  }, [searchParams])

  let suggestionsList: string[] = []

  const assistantMessages = messages.filter(message => message.role === 'assistant')
  const lastAssistantMessage = assistantMessages[assistantMessages.length - 1]

  if (lastAssistantMessage?.content && lastAssistantMessage.content.length > 0) {
    suggestionsList = lastAssistantMessage.content.split('***')
  }

  return (
    <>
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

      {error && (
        <div className='mt-5 flex flex-col items-center justify-center gap-4'>
          <p className='text-lg dark:text-slate-200 text-pretty w-[700px]'>Oops, Algo salió mal. 😣</p>
          <button
            type='button'
            className='relative inline-flex items-center justify-center px-2 py-3 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-rose-700 to-rose-700 group-hover:from-rose-700 group-hover:to-rose-700 hover:text-slate-200 dark:text-slate-200 focus:ring-2 focus:outline-none'
            onClick={() => reload()}
          >
            Intentar de nuevo
          </button>
        </div>
      )}

      <div className='w-full flex justify-center my-5'>{isLoading && <Loading />}</div>
    </>
  )
}
