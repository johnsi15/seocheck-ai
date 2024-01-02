import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
    fontWeight: {
      light: '300',
      normal: '400',
      semibold: '700',
      bold: '900',
    },
  },
  plugins: [],
  darkMode: 'class',
}
export default config
