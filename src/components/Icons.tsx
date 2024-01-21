export function IconCopy({ color = 'currentColor', ...props }: { color: string }) {
  return (
    <svg
      focusable='false'
      xmlns='http://www.w3.org/2000/svg'
      enableBackground='new 0 0 24 24'
      height='24'
      viewBox='0 0 24 24'
      width='24'
      {...props}
    >
      <g>
        <rect fill='none' height='24' width='24'></rect>
      </g>
      <g>
        <path
          fill={color}
          d='M16,20H5V6H3v14c0,1.1,0.9,2,2,2h11V20z M20,16V4c0-1.1-0.9-2-2-2H9C7.9,2,7,2.9,7,4v12c0,1.1,0.9,2,2,2h9 C19.1,18,20,17.1,20,16z M18,16H9V4h9V16z'
        ></path>
      </g>
    </svg>
  )
}

export function IconSuccess() {
  return (
    <svg
      className='w-8 h-8 text-gray-500 dark:text-gray-400'
      xmlns='http://www.w3.org/2000/svg'
      x='0'
      y='0'
      viewBox='13.9 13.9 36.3 36.3'
    >
      <circle
        cx='32'
        cy='32'
        r='17.5'
        fill='#FFF'
        stroke='#077546FF'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeMiterlimit='10'
        strokeWidth='1.3'
      ></circle>
      <path
        fill='none'
        stroke='#077546FF'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeMiterlimit='10'
        strokeWidth='1.3'
        d='M21.5 32L28.5 39 42.5 25'
      ></path>
    </svg>
  )
}

export function IconError() {
  return (
    <svg
      className='w-8 h-8 text-gray-500 dark:text-gray-400'
      xmlns='http://www.w3.org/2000/svg'
      x='0'
      y='0'
      viewBox='13.9 13.9 36.3 36.3'
    >
      <circle
        cx='32'
        cy='32'
        r='17.5'
        fill='#FFF'
        stroke='#7F0013FF'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeMiterlimit='10'
        strokeWidth='1.3'
      ></circle>
      <g
        fill='none'
        stroke='#7F0013FF'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeMiterlimit='10'
        strokeWidth='1.3'
      >
        <path d='M39 25L25 39'></path>
        <path d='M39 39L25 25'></path>
      </g>
    </svg>
  )
}

export function IconGitHub({ height = 20, width = 20 }: { height?: number; width?: number }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      role='img'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='feather feather-github'
      height={height}
      width={width}
    >
      <title>GitHub</title>
      <path d='M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22'></path>
    </svg>
  )
}

export function IconHeart({ height = 20, width = 20 }: { height?: number; width?: number }) {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='block'
      height={height}
      width={width}
    >
      <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
      <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
      <g id='SVGRepo_iconCarrier'>
        {' '}
        <path
          d='M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z'
          fill='#c90d0d'
        ></path>{' '}
      </g>
    </svg>
  )
}
