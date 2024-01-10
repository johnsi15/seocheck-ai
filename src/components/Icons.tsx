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