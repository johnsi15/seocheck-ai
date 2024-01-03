import { IconError } from './IconError'
import { IconSuccess } from './IconSuccess'

interface Props {
  success: boolean
  errors: boolean
  // children: React.ReactNode
}

export function Errors({ success, errors }: Props) {
  if (success) {
    return (
      <div className='absolute inset-y-0 -end-10 flex items-center ps-3 pointer-events-none'>
        <IconSuccess />
      </div>
    )
  }

  if (errors) {
    return (
      <div className='absolute inset-y-0 -end-10 flex items-center ps-3 pointer-events-none'>
        <IconError />
      </div>
    )
  }

  return
}
