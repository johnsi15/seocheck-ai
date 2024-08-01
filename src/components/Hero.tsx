// import { ButtonStart } from './ButtonStart'
import { Header } from './Header'
import { WebAuditForm } from './WebAuditForm'

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
        <div className='text-center space-y-4 mb-5'>
          <h1 className='text-gray-800 font-bold text-4xl md:text-5xl dark:text-slate-200'>
            Analiza el SEO de tu sitio web con
            <span className='dark:text-rose-600 text-rose-700'> IA</span>
          </h1>
          <p className='text-slate-800 max-w-xl mx-auto leading-relaxed text-base dark:text-slate-200'>
            Obtén un análisis completo del SEO de tu sitio web. Recibe recomendaciones y sugerencias personalizadas para
            mejorar tu posicionamiento en los motores de búsqueda de manera efectiva.
          </p>
        </div>

        <WebAuditForm />
        {/* <ButtonStart title='Empezar' /> */}
      </section>
    </>
  )
}
