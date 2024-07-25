'use client'

import { useFormState } from 'react-dom'
import { validateUrl } from '@/app/actions'

const initialState = {
  message: '',
}

export function WebAuditForm({}) {
  const [state, formAction] = useFormState(validateUrl, initialState)

  return (
    <form action={formAction} className='flex flex-col gap-4 items-center max-w-md m-auto relative'>
      <input
        type='text'
        name='site'
        className='w-full pl-5 pr-3 py-2 outline-none border shadow-sm rounded-lg bg-transparent text-slate-800 dark:text-slate-300 focus:border-blue-600 border-slate-500'
        placeholder='https://johnserrano.co'
        required
      />
      {state?.message && <p className='text-red-600 text-base mt-3'>{state?.message}</p>}
      <button className='h-full px-3 py-2 md:px-6 md:py-3.5  rounded-lg duration-150 bg-rose-700 text-white dark:text-slate-200 dark:bg-rose-600 dark:hover:bg-rose-700 hover:bg-rose-600 active:shadow-lg md:w-2/5 disabled:opacity-75 disabled:cursor-not-allowed disabled:bg-rose-700'>
        Analizar sitio web
      </button>
    </form>
  )
}
