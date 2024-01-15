import { IconGitHub } from './Icons'
import { ThemeSwitcher } from './ThemeSwitcher'

export function Header() {
  return (
    <header className='h-max border-b-2 border-gray-300 dark:border-gray-800'>
      <nav className='items-center justify-between px-4 mx-auto max-w-screen-xl sm:px-8 md:flex md:space-x-6 h-14'>
        <div className='flex justify-between'>
          <a className='no-underline' href='/'>
            SEO CheckAI
          </a>
        </div>
        <ul className={`flex-1  mt-12 md:flex md:mt-0 items-center justify-end gap-1`}>
          <li className='pb-5 md:pb-0 hover:opacity-75 w-10 h-10 flex justify-center items-center focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg'>
            <a
              className='p-2'
              href='https://github.com/johnsi15'
              aria-label='GitHub Link'
              target='_blank'
              rel='noopener noreferrer'
            >
              <IconGitHub />
            </a>
          </li>
          <li className='pb-5 md:pb-0 w-10 h-10'>
            <ThemeSwitcher />
          </li>
        </ul>
      </nav>
    </header>
  )
}
