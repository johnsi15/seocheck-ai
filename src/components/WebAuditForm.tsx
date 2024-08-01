'use client'

import { useFormState } from 'react-dom'
import { validateUrl } from '@/app/actions'
import { SubmitButton } from '@/components/SubmitButton'
import { useRef } from 'react'

const initialState = {
  message: '',
  error: false,
  url: null,
}

export function WebAuditForm() {
  const [state, formAction] = useFormState(validateUrl, initialState)
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <form
      ref={formRef}
      action={async formData => {
        formAction(formData)

        formRef.current?.reset()
      }}
      className='flex flex-col items-center max-w-md w-full m-auto relative'
    >
      <input
        type='text'
        name='site'
        className='w-full pl-5 pr-3 py-2 outline-none border shadow-sm rounded-lg bg-transparent text-slate-800 dark:text-slate-300 focus:border-blue-600 border-slate-500'
        placeholder='https://johnserrano.co'
        required
      />
      {state?.message && <p className='text-red-600 text-base my-3'>{state.message}</p>}

      <SubmitButton />
    </form>
  )
}
