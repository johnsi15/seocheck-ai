<div align="center">
  <a href="https://seocheckai.com">
    <img
      src="https://seocheckai.com/logo-seocheckai.webp"
      alt="seocheckai"
    />
  </a>
</div>

# SeocheckAI

[Seocheckai](https://seocheckai.com/) es una aplicación web que te ayuda a identificar problemas de SEO en tus sitios web. Y por si fuera poco, también genera sugerencias para resolver esos problemas utilizando inteligencia artificial con uno de los modelos de OpenAI.


<div align="center">
  <div align="center">
    <a href="https://seocheckai.com/">
      <img
      src="https://github.com/user-attachments/assets/91836e5b-c490-4983-b338-ff748a32d9b8"
      alt="seocheckai"/>
    </a>

     
  </div>

![Next.js Badge](https://img.shields.io/badge/Next.js&nbsp;14-000?logo=nextdotjs&logoColor=fff&style=flat)
![OpenAI](https://img.shields.io/badge/OpenAI-blue?logo=openai&logoColor=white&labelColor=gray)
![GitHub stars](https://img.shields.io/github/stars/johnsi15/seocheck-ai)
![GitHub releases](https://img.shields.io/github/release/johnsi15/seocheck-ai)
![GitHub issues](https://img.shields.io/github/issues/johnsi15/seocheck-ai)
</div>

## Tecnologías utilizadas

- [**Next.js 14 App Router**](https://nextjs.org/) - El Framework de React para la web.
- [**OpenAI**](https://openai.com/) - Modelo de IA.
- [**SDK Vercel AI**](https://sdk.vercel.ai/) - El kit de herramientas de IA para TypeScript.
- [**React Hook Form**](https://react-hook-form.com/) - Formularios eficaces, flexibles y extensibles con validación fácil de usar.
- [**Next.js Server Actions**](https://nextjs.org/docs/api-reference/server-actions) - Funciones asíncronas para ejecutar en el servidor.
- [**TailwindCSS**](https://tailwindcss.com) - Sistema de diseño.
- [**Prettier**](https://prettier.io) - Formateador de código.


## 🚀 Getting Started

**Requirements:**

- [x] [Node.js](https://nodejs.org) (+v20.x) instalado.
- [x] [npm](https://www.npmjs.com) (v10+) instalado.
- [x] [Variables de entorno](https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables) revisar el archivo .env.example.
- [x] [Visual Studio Code](https://code.visualstudio.com) con las extensiones recomendadas instaladas (ESLint, Prettier, Tailwind CSS IntelliSense).

**¿Cómo funciona el proyecto?**

* `npm install` to install the dependencies
* `npm run dev` to run development mode app
* `npm build` to build production app
* `npm start` to run mode production

## Contacto

Puedes contactarme si tienes dudas sobre el proyecto o cualquier otra cosa en la que pueda ayudarte.

**Email: me@johnserrano.co**

## FAQ

1. **¿Cómo puedo analizar un sitio web?**
  
  > Puedes analizar o auditar un sitio web desde la página principal o buscar la opción en la parte superior o inferior del sitio donde dice 'Analizar web'. Después, debes ingresar la **URL** del sitio web que deseas analizar.
2. **¿Cómo puedo generar sugerencias con IA?**
   
> Audita una URL y pulsa «Generar sugerencias con IA» en los resultados. La herramienta «Validar SEO» comprueba títulos y descripciones sin usar IA.

3. **¿Cuál es el límite para generar sugerencias con IA?**

> La auditoría básica no consume cuota de IA. Las sugerencias de la auditoría tienen un límite de 5 solicitudes por IP cada 10 minutos y 100 solicitudes para toda la app por día UTC.

## ☁️ Desplegado en Vercel

- ✅ [seocheckai.com](https://seocheckai.com/).

Antes de desplegar, configura `OPENAI_API_KEY`, `UPSTASH_REDIS_REST_URL` y `UPSTASH_REDIS_REST_TOKEN` en las variables de entorno de Vercel. Usa las credenciales REST de una base Upstash Redis. Si Redis no está configurado o deja de responder, la ruta de sugerencias de auditoría regresa `503` sin llamar a OpenAI; el resto del sitio sigue disponible. `npm run dev` permite probar sin Redis cuando se ejecuta fuera de Vercel.

## Tasks

- [x] limit AI requests per IP and cap total daily requests
- [x] add button donar
- [x] add icon github
- [x] add icon buy coffee
- [x] add vídeo example main page
- [x] add tool features main page
- [x] valid title, description y keywords con regex in api/
- [x] add version mobile
- [x] add script GA or GTM
- [x] add events click GA
- [x] add other tool analytic
- [x] add metaData
- [x] add siteMaps
- [x] add JSONld microdata
- [x] add banner info
- [x] add logo and review metadata
- [x] add favicon
- [x] add footer
- [x] add recommendations below the form validate SEO
- [x] deploy app to vercel and config domain
- [x] add button at the bottom of the page to start or try
- [ ] add multiple suggestions responses with AI
- [ ] add response with a range from 1 to 10 how good the title is with AI.
