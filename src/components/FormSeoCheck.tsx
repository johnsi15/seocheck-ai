'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLogger } from 'next-axiom'
import { SeoCheck, seoCheckSchema } from '@/lib/types'
import { ErrorsMessage, ErrorsSuccess } from './ErrorsSuccess'
import { Suggestions } from './Suggestions'
// import { useDataSeoAi } from '@/hooks/useDataSeoAi'
import { Loading } from './Loading'
import { useChat } from 'ai/react'

export function FormSeoCheck() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isSubmitSuccessful },
    reset,
    getFieldState,
    setError,
    getValues,
  } = useForm<SeoCheck>({
    resolver: zodResolver(seoCheckSchema),
  })

  // const { handleSuggestionsAI, suggestionsIa, errorAI, loading } = useDataSeoAi()
  const { messages, append, isLoading, error, reload } = useChat({ keepLastMessageOnError: true })

  const handleSuggestionsAI = () => {
    console.log('handleSuggestionsAI')

    append({ content: `Title: ${title}\nDescription: ${description}\nKeywords: ${keyword}`, role: 'user' })
  }

  console.log({ messages })

  const log = useLogger()

  const onSubmit = (data: SeoCheck) => {
    console.log('onsubmit')

    const hasMoreNumbers = (str: string) => /\d{10,}/.test(str)

    const { title, description, keyword } = data
    const regex = new RegExp(`\\b${keyword}\\b`, 'i')

    log.debug('Data sent to validate debug', data)

    if (keyword && !regex.test(title)) {
      setError('title', {
        type: 'manual',
        message: `Incluye tu palabra clave (${keyword}) en el título para fortalecer la relevancia de tu contenido. Cuanto más a la izquierda aparezca la palabra clave en el título, mejor. Esto ayuda a Google a saber de qué trata el contenido.`,
      })

      log.warn('Keyword not found in title', data)
    }

    if (keyword && !regex.test(description)) {
      setError('description', {
        type: 'manual',
        message: `Incluye tu palabra clave (${keyword}) en la descripción para fortalecer la relevancia de tu contenido. Las meta descripciones no influyen directamente en el posicionamiento, pero pueden animar a los usuarios a hacer clic.`,
      })

      log.warn('Keyword not found in description', data)
    }

    hasMoreNumbers(title) &&
      setError('title', {
        type: 'manual',
        message: 'El título NO debe incluir más 10 números consecutivos.',
      })

    hasMoreNumbers(description) &&
      setError('description', {
        type: 'manual',
        message: 'El descripción NO debe incluir más 10 números consecutivos.',
      })
    // reset()
    log.info('Validated and correct SEO', data)
    return
  }

  const successTitle = getFieldState('title').isDirty && !getFieldState('title').invalid
  const successDescription = getFieldState('description').isDirty && !getFieldState('description').invalid

  const title = getValues('title')
  const description = getValues('description')
  const keyword = getValues('keyword')

  const validButtonAI = !title || !description || isSubmitting || title.length < 30 || description.length < 60

  return (
    <>
      {!error && messages.length > 0 && <Suggestions data={messages} />}

      {error && (
        <div className='mb-5 flex flex-col items-center justify-center gap-4'>
          <p className='text-lg dark:text-slate-200 text-pretty w-[700px]'>Oops, Algo salió mal. 😣</p>
          <button
            type='button'
            className='relative inline-flex items-center justify-center px-2 py-3 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-rose-700 to-rose-700 group-hover:from-rose-700 group-hover:to-rose-700 hover:text-slate-200 dark:text-slate-200 focus:ring-2 focus:outline-none'
            onClick={() => reload()}
          >
            Intentar de nuevo
          </button>
        </div>
      )}

      {isLoading && <Loading />}

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5 w-full md:w-[700px]'>
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
              defaultValue='Cúcuta tendrá gran desfile en conmemoración al Día de la Independencia de Colombia'
              className={`w-full pl-5 pr-3 py-2 outline-none border shadow-sm rounded-lg ${
                errors.title
                  ? 'bg-red-50 border-red-500 text-red-800 focus:border-red:500 dark:bg-red-100'
                  : !getFieldState('title').invalid && getFieldState('title').isDirty
                  ? 'bg-transparent text-slate-800 dark:text-slate-300 border-green-500'
                  : 'bg-transparent text-slate-800 dark:text-slate-300 focus:border-blue-600 border-slate-500'
              }`}
              {...register('title')}
            />

            <ErrorsSuccess success={successTitle} errors={errors.title ? true : false} />
          </div>
          {errors.title && (
            <ErrorsMessage message={errors.title.message}>Tu título tiene {title.length} caracteres.</ErrorsMessage>
          )}
        </label>
        <label htmlFor='description' className='flex flex-col'>
          <span className='mb-2 text-lg text-slate-800 dark:text-slate-200 font-semibold text-balance'>
            Proporciona una descripción detallada de tu contenido, esto ayudará a los motores de búsqueda y a los
            usuarios a entender de qué se trata tu página.
          </span>
          <div className='relative'>
            <textarea
              id='description'
              rows={3}
              placeholder='Descripción'
              defaultValue='El desfile iniciará en el Puente Benito Hernández y se hará un ensayo previo al evento en los próximos días.'
              className={`w-full pl-5 pr-3 py-2   outline-none border  shadow-sm rounded-lg resize-none ${
                errors.description
                  ? 'bg-red-50 border-red-500 text-red-800 focus:border-red:500 dark:bg-red-100'
                  : !getFieldState('description').invalid && getFieldState('description').isDirty
                  ? 'bg-transparent text-slate-800 dark:text-slate-300 border-green-500'
                  : 'bg-transparent text-slate-800 dark:text-slate-300 focus:border-blue-600 border-slate-500'
              }`}
              {...register('description')}
            ></textarea>

            <ErrorsSuccess success={successDescription} errors={errors.description ? true : false} />
          </div>
          {errors.description && (
            <ErrorsMessage message={errors.description.message}>
              Tu descripción tiene {description.length} caracteres.
            </ErrorsMessage>
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

        <div className='flex gap-3'>
          <button
            disabled={isSubmitting || error != null}
            type='submit'
            className='h-full px-3 py-2 md:px-6 md:py-3.5  rounded-lg duration-150 bg-rose-700 text-white dark:text-slate-200 dark:bg-rose-600 dark:hover:bg-rose-700 hover:bg-rose-600 active:shadow-lg md:w-[150px] disabled:opacity-75 disabled:cursor-not-allowed disabled:bg-rose-700'
          >
            Validar SEO
          </button>

          <button
            disabled={validButtonAI || isSubmitting || error != null || isLoading}
            type='button'
            onClick={handleSuggestionsAI}
            className='h-full px-3 py-2 md:px-6 md:py-3.5  rounded-lg duration-150 bg-rose-700 text-white dark:text-slate-200 dark:bg-rose-600 dark:hover:bg-rose-700 hover:bg-rose-600 active:shadow-lg md:w-2/5 disabled:opacity-75 disabled:cursor-not-allowed disabled:bg-rose-700'
          >
            Generar sugerencias con AI
          </button>
        </div>

        {(errors.title || errors.description) && (
          <article className='text-lg dark:text-slate-200 md:w-[700px] text-pretty'>
            <p>
              Ten en cuenta que las recomendaciones para escribir los títulos y descripciones no son reglas estrictas en
              cuanto a la <strong className='dark:text-rose-600 text-rose-700'>cantidad de caracteres</strong>, pero sí
              constituyen un sólido punto de partida para{' '}
              <strong className='dark:text-rose-600 text-rose-700'>optimizar el SEO de nuestros artículos</strong>.
            </p>
            <p className='mt-3'>
              Siguiendo estas sugerencias, podemos mejorar la visibilidad y la efectividad de nuestro contenido en los
              motores de búsqueda.
            </p>
            {validButtonAI && (
              <p className='mt-3'>
                Para recibir <strong className='dark:text-rose-600 text-rose-700'>sugerencias</strong> a través de
                inteligencia artificial <strong className='dark:text-rose-600 text-rose-700'>(AI)</strong>, es necesario
                que el título (con un mínimo de 30 caracteres) y la descripción (con un mínimo de 60 caracteres) cumplan
                con estos requisitos establecidos.
              </p>
            )}
          </article>
        )}
        {isValid && isSubmitSuccessful && (
          <p className='text-lg dark:text-slate-200 text-pretty'>
            Tus datos han superado exitosamente la validación del SEO y están óptimamente optimizados para destacar en
            los motores de búsqueda.
            <span className='ml-1 font-semibold dark:text-green-500 text-green-700'>¡Excelente trabajo!</span>
          </p>
        )}
      </form>
    </>
  )
}
