import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  },
  plugins: [
    plugin(function({ addBase }) {
    addBase({
       'html': { fontSize: "14px" },
       'h1': { fontSize: '3rem', fontWeight: 'bold' },
       'h2': { fontSize: '2rem', fontWeight: 'bold' },
       'h3': { fontSize: '1.5rem', fontWeight: 'bold' },
     })
   }),],
} as Config;

