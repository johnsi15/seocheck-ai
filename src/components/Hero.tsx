import { ButtonStart } from './ButtonStart'
import { Header } from './Header'

export function Hero() {
  // Replace javascript:void(0) path with your path
  const navigation = [
    { title: 'Customers', path: 'javascript:void(0)' },
    { title: 'Careers', path: 'javascript:void(0)' },
    { title: 'Guides', path: 'javascript:void(0)' },
    { title: 'Partners', path: 'javascript:void(0)' },
  ]

  return (
    <>
      <Header />
      <section className='mt-10 md:mt-24 mx-auto max-w-screen-xl pb-4 px-4 sm:px-8'>
        <div className='text-center space-y-4'>
          <h1 className='text-gray-800 font-bold text-4xl md:text-5xl dark:text-slate-200'>
            Potencia la visibilidad de tu
            <span className='dark:text-rose-600 text-rose-700'> Contenido</span>
          </h1>
          <p className='text-slate-800 max-w-xl mx-auto leading-relaxed text-base dark:text-slate-200'>
            Descubre el poder de seocheckai para impulsar la visibilidad de tu contenido en línea. Nuestra herramienta
            avanzada de auditoría SEO, respaldada por inteligencia artificial, te ayuda a optimizar tu presencia en los
            motores de búsqueda. Aumenta tu posicionamiento y atrae a más usuarios con una estrategia SEO efectiva.
          </p>
        </div>
        <ButtonStart title='Empezar' />
      </section>
    </>
  )
}
