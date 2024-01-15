import { z } from 'zod'

// const hasMoreThan10ConsecutiveNumbers = (str: string) => /\d{10,}/.test(str)

export const seoCheckSchema = z.object({
  title: z
    .string()
    .min(55, {
      message: 'El título debe tener al menos 55 caracteres para mejorar la visibilidad en motores de búsqueda.',
    })
    .max(80, {
      message:
        'El título no se recomienda que tenga más de 80 caracteres para garantizar la efectividad en los resultados de búsqueda.',
    }),
  // .refine(data => !hasMoreThan10ConsecutiveNumbers(data), {
  //   message: 'El título no puede contener más de 10 números consecutivos',
  //   path: ['custom'],
  // }),
  description: z
    .string()
    .min(120, {
      message: 'La descripción debe tener al menos 120 caracteres para mejorar la visibilidad en motores de búsqueda.',
    })
    .max(160, {
      message:
        'La descripción no se recomienda que tenga más de 160 caracteres para garantizar la efectividad en los resultados de búsqueda.',
    }),
  // .refine(data => typeof data === 'string' && data.trim().length > 0, {
  //   message: 'La descripción debe ser una cadena de texto no vacía.',
  //   path: ['custom'],
  // }),
  keyword: z.string().optional(),
})
// .refine(data => typeof data.title === 'string' && typeof data.description === 'string', {
//   message: 'El título y la descripción deben ser cadenas de texto.',
//   path: ['title', 'description'],
// })

export type SeoCheck = z.infer<typeof seoCheckSchema>
