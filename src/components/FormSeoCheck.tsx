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
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5 w-[700px]'>
      <label htmlFor='title' className='flex flex-col'>
        <span className='mb-2'>
          Ingresa un título descriptivo para tu contenido. Asegúrate de que sea claro y relevante para mejorar la
          visibilidad en los motores de búsqueda.
        </span>
        <div className='relative'>
          <input
            id='title'
            type='text'
            placeholder='Título'
            className={`w-full pl-5 pr-3 py-2   outline-none border  shadow-sm rounded-lg ${
              errors.title
                ? 'bg-red-50 border-red-500 text-red-900 focus:border-red:500'
                : 'bg-transparent text-gray-500 focus:border-indigo-600'
            } ${!getFieldState('title').invalid && getFieldState('title').isDirty ? 'border-green-500' : ''}`}
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
        {errors.title && <p className='text-red-900 text-base mt-3'>{errors.title.message}</p>}
      </label>
      <label htmlFor='description' className='flex flex-col'>
        <span className='mb-2'>
          Proporciona una descripción detallada de tu contenido. Esto ayudará a los motores de búsqueda y a los usuarios
          a entender de qué se trata tu página.
        </span>
        <div className='relative'>
          <textarea
            id='description'
            rows={3}
            placeholder='Descripción'
            className={`w-full pl-5 pr-3 py-2   outline-none border  shadow-sm rounded-lg resize-none ${
              errors.description
                ? 'bg-red-50 border-red-500 text-red-900 focus:border-red:500'
                : 'bg-transparent text-gray-500 focus:border-indigo-600'
            } ${
              !getFieldState('description').invalid && getFieldState('description').isDirty ? 'border-green-500' : ''
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
        {errors.description && <p className='text-red-900 text-base mt-3'>{errors.description.message}</p>}
      </label>
      <label htmlFor='keyword' className='flex flex-col'>
        <span className='mb-2'>
          Si tienes una palabra clave específica que quieras destacar, introdúcela aquí. Esto puede mejorar aún más la
          optimización para motores de búsqueda. (opcional)
        </span>
        <input
          id='keyword'
          type='text'
          placeholder='Palabra clave'
          className='w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg'
          {...register('keyword')}
        />
      </label>
      <button
        disabled={isSubmitting}
        type='submit'
        className='px-6 py-3.5 text-white bg-indigo-600 rounded-lg duration-150 hover:bg-indigo-700 active:shadow-lg'
      >
        Validar SEO
      </button>
    </form>
  )
}
