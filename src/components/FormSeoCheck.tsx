'use client'
import { zodResolver } from '@hookform/resolvers/zod'
// import { ChangeEventHandler, FormEventHandler } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const seoCheckSchema = z.object({
  title: z
    .string()
    .min(55, {
      message: 'El título debe tener al menos 55 caracteres para mejorar la visibilidad en motores de búsqueda.',
    })
    .max(75, {
      message:
        'El título no se recomienda que tenga más de 75 caracteres para garantizar la efectividad en los resultados de búsqueda.',
    }),
  description: z
    .string()
    .min(120, {
      message: 'La descripción debe tener al menos 120 caracteres para mejorar la visibilidad en motores de búsqueda.',
    })
    .max(160, {
      message:
        'La descripción no se recomienda que tenga más de 160 caracteres para garantizar la efectividad en los resultados de búsqueda.',
    }),
  keyword: z.string().optional(),
})
// .refine(data => data.title.length > 0 && data.description.length > 0, {
//   message: 'Por favor, ingresa un título y una descripción para poder continuar.',
//   path: ['title'],
// })

type SeoCheck = z.infer<typeof seoCheckSchema>

export function FormSeoCheck() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SeoCheck>({
    resolver: zodResolver(seoCheckSchema),
  })

  const onSubmit = (data: SeoCheck) => {
    console.log('onsubmit')
    reset()
  }

  console.log({ errors })
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5 w-[700px]'>
      <label htmlFor='title' className='flex flex-col'>
        <span className='mb-2'>
          Ingresa un título descriptivo para tu contenido. Asegúrate de que sea claro y relevante para mejorar la
          visibilidad en los motores de búsqueda.
        </span>
        <input
          id='title'
          type='text'
          placeholder='Título'
          className={`w-full pl-5 pr-3 py-2   outline-none border  shadow-sm rounded-lg ${
            errors.title
              ? 'bg-red-50 border-red-500 text-red-900 focus:border-red:500'
              : 'bg-transparent text-gray-500 focus:border-indigo-600'
          }`}
          {...register('title')}
        />
        {errors.title && <p className='text-red-900 text-base mt-3'>{errors.title.message}</p>}
      </label>
      <label htmlFor='description' className='flex flex-col'>
        <span className='mb-2'>
          Proporciona una descripción detallada de tu contenido. Esto ayudará a los motores de búsqueda y a los usuarios
          a entender de qué se trata tu página.
        </span>
        <input
          id='description'
          type='text'
          placeholder='Descripción'
          className={`w-full pl-5 pr-3 py-2   outline-none border  shadow-sm rounded-lg ${
            errors.description
              ? 'bg-red-50 border-red-500 text-red-900 focus:border-red:500'
              : 'bg-transparent text-gray-500 focus:border-indigo-600'
          }`}
          {...register('description')}
        />
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
