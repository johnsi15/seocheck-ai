'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SeoCheck, seoCheckSchema } from '@/lib/types'
import { IconSuccess } from './IconSuccess'
import { IconError } from './IconError'

export function FormSeoCheck() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
    getFieldState,
    setError,
    getValues,
  } = useForm<SeoCheck>({
    resolver: zodResolver(seoCheckSchema),
  })

  const onSubmit = (data: SeoCheck) => {
    console.log('onsubmit')

    const { title, description, keyword } = data
    const regex = new RegExp(`\\b${keyword}\\b`, 'i')

    if (keyword && !regex.test(title)) {
      console.log('ok this includes keyword')
      setError('title', {
        type: 'manual',
        message: `Incluye tu palabra clave (${keyword}) en el título para fortalecer la relevancia de tu contenido. Cuanto más a la izquierda aparezca la palabra clave en el título, mejor. Esto ayuda a Google a saber de qué trata el contenido.`,
      })
    }

    if (keyword && !regex.test(description)) {
      setError('description', {
        type: 'manual',
        message: `Incluye tu palabra clave (${keyword}) en la descripción para fortalecer la relevancia de tu contenido. Las meta descripciones no influyen directamente en el posicionamiento, pero pueden animar a los usuarios a hacer clic.`,
      })
    }
    // reset()

    return
  }

  console.log(getFieldState('title'))

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5 w-[700px]'>
      <label htmlFor='title' className='flex flex-col'>
        <span className='mb-2 text-lg text-slate-800 dark:text-slate-200 font-semibold text-balance'>
          Ingresa un título descriptivo para tu contenido, asegúrate de que sea claro y relevante para mejorar la
          visibilidad en los motores de búsqueda.
        </span>
        <div className='relative'>
          <input
            id='title'
            type='text'
            placeholder='Título'
            className={`w-full pl-5 pr-3 py-2 outline-none border shadow-sm rounded-lg ${
              errors.title
                ? 'bg-red-50 border-red-500 text-red-800 focus:border-red:500 dark:bg-red-100'
                : !getFieldState('title').invalid && getFieldState('title').isDirty
                ? 'bg-transparent text-slate-800 dark:text-slate-300 border-green-500'
                : 'bg-transparent text-slate-800 dark:text-slate-300 focus:border-blue-600 border-slate-500'
            }`}
            {...register('title')}
          />
          {getFieldState('title').isDirty && !getFieldState('title').invalid && (
            <div className='absolute inset-y-0 -end-10 flex items-center ps-3 pointer-events-none'>
              <IconSuccess />
            </div>
          )}
          {errors.title && (
            <div className='absolute inset-y-0 -end-10 flex items-center ps-3 pointer-events-none'>
              <IconError />
            </div>
          )}
        </div>
        {errors.title && (
          <>
            <p className='text-red-600 text-base mt-3'>{errors.title.message}</p>
            <p className='font-semibold italic text-red-600'>Tu título tiene {getValues('title').length} caracteres.</p>
          </>
        )}
      </label>
      <label htmlFor='description' className='flex flex-col'>
        <span className='mb-2 text-lg text-slate-800 dark:text-slate-200 font-semibold text-balance'>
          Proporciona una descripción detallada de tu contenido, esto ayudará a los motores de búsqueda y a los usuarios
          a entender de qué se trata tu página.
        </span>
        <div className='relative'>
          <textarea
            id='description'
            rows={3}
            placeholder='Descripción'
            className={`w-full pl-5 pr-3 py-2   outline-none border  shadow-sm rounded-lg resize-none ${
              errors.description
                ? 'bg-red-50 border-red-500 text-red-800 focus:border-red:500 dark:bg-red-100'
                : !getFieldState('description').invalid && getFieldState('description').isDirty
                ? 'bg-transparent text-slate-800 dark:text-slate-300 border-green-500'
                : 'bg-transparent text-slate-800 dark:text-slate-300 focus:border-blue-600 border-slate-500'
            }`}
            {...register('description')}
          ></textarea>

          {getFieldState('description').isDirty && !getFieldState('description').invalid && (
            <div className='absolute inset-y-0 -end-10 flex items-center ps-3 pointer-events-none'>
              <IconSuccess />
            </div>
          )}
          {errors.description && (
            <div className='absolute inset-y-0 -end-10 flex items-center ps-3 pointer-events-none'>
              <IconError />
            </div>
          )}
        </div>
        {errors.description && (
          <>
            <p className='text-red-600 text-base mt-3'>{errors.description.message}</p>
            <p className='font-semibold italic text-red-600'>
              Tu descripción tiene {getValues('description').length} caracteres.
            </p>
          </>
        )}
      </label>
      <label htmlFor='keyword' className='flex flex-col'>
        <span className='mb-2 text-lg text-slate-800 dark:text-slate-200 font-semibold text-balance'>
          Si tienes una palabra clave específica que quieras destacar, introdúcela aquí. Esto puede mejorar aún más la
          optimización para motores de búsqueda.
          <strong className='text-cyan-700 dark:text-cyan-500 font-semibold'> (opcional)</strong>
        </span>
        <input
          id='keyword'
          type='text'
          placeholder='Palabra clave'
          className='w-full pl-5 pr-3 py-2 border-slate-500 text-slate-800 dark:text-slate-300 bg-transparent outline-none border focus:border-blue-600 shadow-sm rounded-lg'
          {...register('keyword')}
        />
      </label>
      <button
        disabled={isSubmitting}
        type='submit'
        className='px-6 py-3.5  rounded-lg duration-150 bg-rose-700 text-white dark:text-slate-200 dark:bg-rose-600 dark:hover:bg-rose-700 hover:bg-rose-600 active:shadow-lg w-2/6'
      >
        Validar SEO
      </button>
      {(errors.title || errors.description) && (
        <p className='text-lg dark:text-slate-200 w-[700px] text-pretty'>
          Ten en cuenta que las recomendaciones para escribir los títulos y descripciones no son reglas estrictas en
          cuanto a la <strong className='dark:text-rose-600 text-rose-700'>cantidad de caracteres</strong>, pero sí
          constituyen un sólido punto de partida para{' '}
          <strong className='dark:text-rose-600 text-rose-700'>optimizar el SEO de nuestros artículos</strong>.
          <span className='block mt-3'>
            Siguiendo estas sugerencias, podemos mejorar la visibilidad y la efectividad de nuestro contenido en los
            motores de búsqueda.
          </span>
        </p>
      )}
      {isValid && (
        <p className='text-lg dark:text-slate-200 text-pretty'>
          Tus datos han superado exitosamente la validación del SEO y están óptimamente optimizados para destacar en los
          motores de búsqueda.
          <span className='ml-1 font-semibold dark:text-green-500 text-green-700'>¡Excelente trabajo!</span>
        </p>
      )}
    </form>
  )
}
