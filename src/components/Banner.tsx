'use client'

import { useState } from 'react'

export function Banner() {
  const [close, setClose] = useState(false)

  const handleClose = () => {
    console.log('close banner')
    setClose(true)
  }

  if (close) return

  return (
    <div
      id='sticky-banner'
      tabIndex={-1}
      className='fixed bottom-0 start-0 z-50 flex justify-between w-full p-4 border-t border-gray-400 bg-slate-300 dark:bg-blue-950 dark:border-gray-800'
    >
      <div className='flex items-center mx-auto'>
        <p className='flex items-center text-sm font-normal text-gray-800 dark:text-slate-200'>
          <span className='inline-flex p-1 me-3 bg-gray-900 rounded-full dark:bg-slate-900 w-6 h-6 items-center justify-center flex-shrink-0'>
            <svg
              className='w-3 h-3 text-slate-200 dark:text-slate-200'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              viewBox='0 0 18 19'
            >
              <path d='M15 1.943v12.114a1 1 0 0 1-1.581.814L8 11V5l5.419-3.871A1 1 0 0 1 15 1.943ZM7 4H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2v5a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V4ZM4 17v-5h1v5H4ZM16 5.183v5.634a2.984 2.984 0 0 0 0-5.634Z' />
            </svg>
            <span className='sr-only'>Aviso</span>
          </span>
          <span>
            Tu feedback es esencial. Envía tus sugerencias para mejorar la herramienta a{' '}
            <a
              href='https://flowbite.com'
              className='inline font-medium text-rose-600 underline dark:text-rose-500 underline-offset-2 decoration-600 dark:decoration-500 decoration-solid hover:no-underline'
            >
              me@johnserrano.co
            </a>{' '}
            Agradecemos tu contribución.{' '}
          </span>
        </p>
      </div>
      <div className='flex items-center'>
        <button
          data-dismiss-target='#sticky-banner'
          type='button'
          className='flex-shrink-0 inline-flex justify-center w-7 h-7 items-center text-gray-800 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white dark:text-slate-200'
          onClick={handleClose}
        >
          <svg
            className='w-3 h-3'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 14 14'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
            />
          </svg>
          <span className='sr-only'>Cerrar banner</span>
        </button>
      </div>
    </div>
  )
}
