import { IconError, IconSuccess } from './Icons'

interface Props {
  success?: boolean
  errors?: boolean
  message?: string
  children?: React.ReactNode
  // children: React.ReactNode
}

export function ErrorsSuccess({ success, errors }: Props) {
  return (
    <div className='absolute inset-y-0 -end-10 flex items-center ps-3 pointer-events-none'>
      {success && <IconSuccess />}
      {errors && <IconError />}
    </div>
  )
}

export function ErrorsMessage({ message, children }: Props) {
  return (
    <>
      <p className='text-red-600 text-base mt-3'>{message}</p>
      <p className='font-semibold italic text-red-600'>{children}</p>
    </>
  )
}
