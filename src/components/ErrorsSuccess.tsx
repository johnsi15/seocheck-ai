import { IconError } from './IconError'
import { IconSuccess } from './IconSuccess'

interface Props {
  success: boolean
  errors: boolean
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
