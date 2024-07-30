import { useFormStatus } from 'react-dom'
import { SpinnerInfinity } from '@/components/Spinner'

export function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <>
      <button
        disabled={pending}
        className='h-full mb-2 px-3 py-2 md:px-6 md:py-3.5  rounded-lg duration-150 bg-rose-700 text-white dark:text-slate-200 dark:bg-rose-600 dark:hover:bg-rose-700 hover:bg-rose-600 active:shadow-lg md:w-2/5 disabled:opacity-75 disabled:cursor-not-allowed disabled:bg-rose-700'
      >
        {pending ? 'Analizando...' : 'Analizar sitio web'}
      </button>
      {pending && <SpinnerInfinity />}
    </>
  )
}
