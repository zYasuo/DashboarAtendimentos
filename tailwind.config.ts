import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#09090A',
        blue: {
          50: '#dfe5ff',
          400: '#4318ff'
        },
        gray: {
          50: '#f4f7fe',
        },
        dl: {
          50: '#A3AED0',
          300: '#A3AED0',
          400: '#F4F7FE',
          500: '#2B3674',
          700: '#4318FF'
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
