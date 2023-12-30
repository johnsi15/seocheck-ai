import { ThemeSwitcher } from './ThemeSwitcher'

export function Header() {
  return (
    <header>
      <nav className='items-center pt-5 px-4 mx-auto max-w-screen-xl sm:px-8 md:flex md:space-x-6'>
        <div className='flex justify-between'>
          <a href='/'>SEO CheckAI</a>
        </div>
        {/* <ul className={`flex-1 justify-between mt-12 md:flex md:mt-0`}>
            <li className='order-2 pb-5 md:pb-0'>
              <a
                href='javascript:void(0)'
                className='py-3 px-6 rounded-md shadow-md text-white text-center bg-indigo-500 focus:shadow-none block md:inline'
              >
                Sign In
              </a>
            </li>
            <div className='order-1 flex-1 justify-center items-center space-y-5 md:flex md:space-x-6 md:space-y-0'>
              {navigation.map((item, idx) => (
                <li className='text-gray-500 hover:text-indigo-600' key={idx}>
                  <a href={item.path}>{item.title}</a>
                </li>
              ))}
            </div>
          </ul> */}
        <ThemeSwitcher />
      </nav>
    </header>
  )
}
