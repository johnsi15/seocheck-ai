import { IconHeart } from './Icons'

export function Footer() {
  return (
    <footer className='bg-slate-900 shadow dark:bg-transparent mt-[100px]'>
      <div className='w-full max-w-screen-xl mx-auto p-4 md:py-8'>
        <div className='sm:flex sm:items-center sm:justify-between'>
          <a href='/' className='flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse'>
            {/* <img src='https://flowbite.com/docs/images/logo.svg' className='h-8' alt='Flowbite Logo' /> */}
            <span className='self-center text-2xl font-semibold whitespace-nowrap text-slate-200 dark:text-white'>
              SEOcheckAI
            </span>
          </a>
          <ul className='flex flex-wrap items-center mb-6 text-sm font-medium text-slate-200 sm:mb-0 dark:text-gray-300'>
            <li>
              <a
                href='https://link.mercadopago.com.co/johnserrano'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:underline me-4 md:me-6'
              >
                Donar
              </a>
            </li>
            <li>
              <a href='/validar-seo' className='hover:underline me-4 md:me-6'>
                Validar SEO
              </a>
            </li>
            <li>
              <a
                href='https://www.buymeacoffee.com/jandrey15'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:underline me-4 md:me-6'
              >
                Cómprame un cáfe
              </a>
            </li>
            <li>
              <a href='mailto:me@johnserrano.co' target='_blank' rel='noopener noreferrer' className='hover:underline'>
                Contacto
              </a>
            </li>
          </ul>
        </div>
        <hr className='my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8' />
        <span className='text-sm text-slate-200 sm:text-center dark:text-gray-300 flex gap-1 justify-center'>
          Desarrollado con <IconHeart /> por{' '}
          <a
            href='https://johnserrano.co/'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:underline font-semibold'
          >
            John Serrano
          </a>
          🚀
        </span>
      </div>
    </footer>
  )
}
