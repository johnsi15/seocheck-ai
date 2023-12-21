import { z } from 'zod'

export const seoCheckSchema = z.object({
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

export type SeoCheck = z.infer<typeof seoCheckSchema>
