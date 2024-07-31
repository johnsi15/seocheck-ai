'use server'

import { redirect } from 'next/navigation'

export async function validateUrl(prevState: any, formData: FormData) {
  const rawFormData = {
    site: formData.get('site'),
  }

  const url = rawFormData.site as string

  if (!url) return { message: 'Por favor ingrese una URL', url: null }

  if (!url.startsWith('https://')) {
    return { message: 'Por favor ingrese una URL valida', url: null }
  }

  redirect(`/auditar-seo?url=${encodeURIComponent(url)}`)

  // return { message: null, url }
}
