'use client'
import { ChangeEventHandler, FormEventHandler, useState } from 'react'
export function FormSeoCheck() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [keyword, setKeyword] = useState('')
  const [error, setError] = useState(false)

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    const { name, value } = event.target
    // console.log({ name, value })
    if (name === 'title') {
      setTitle(value)
      if (value.length >= 20 && value.length <= 30) {
        setError(true)
      }
    }
    if (name === 'description') setDescription(value)
    if (name === 'keyword') setKeyword(value)
    console.log({ title, description, keyword })
  }

  // const handleSubmit: FormEventHandler<HTMLFormElement> = event => {}

  return (
    <form className='flex flex-col gap-5 w-[700px]'>
      <label htmlFor='title' className='flex flex-col'>
        <span className='mb-2'>
          Ingresa un título descriptivo para tu contenido. Asegúrate de que sea claro y relevante para mejorar la
          visibilidad en los motores de búsqueda.
        </span>
        <input
          id='title'
          type='text'
          name='title'
          placeholder='Título'
          className={`w-full pl-5 pr-3 py-2   outline-none border  shadow-sm rounded-lg ${
            error
              ? 'bg-red-50 border-red-500 text-red-900 focus:border-red:500'
              : 'bg-transparent text-gray-500 focus:border-indigo-600'
          }`}
          onChange={handleChange}
          value={title}
        />
      </label>
      <label htmlFor='description' className='flex flex-col'>
        <span className='mb-2'>
          Proporciona una descripción detallada de tu contenido. Esto ayudará a los motores de búsqueda y a los usuarios
          a entender de qué se trata tu página.
        </span>
        <input
          id='description'
          type='text'
          name='description'
          placeholder='Descripción'
          className='w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg'
        />
      </label>
      <label htmlFor='keyword' className='flex flex-col'>
        <span className='mb-2'>
          Si tienes una palabra clave específica que quieras destacar, introdúcela aquí. Esto puede mejorar aún más la
          optimización para motores de búsqueda. (opcional)
        </span>
        <input
          id='keyword'
          type='text'
          name='keyword'
          placeholder='Palabra clave'
          className='w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg'
        />
      </label>
      <button className='px-6 py-3.5 text-white bg-indigo-600 rounded-lg duration-150 hover:bg-indigo-700 active:shadow-lg'>
        Validar SEO
      </button>
    </form>
  )
}
