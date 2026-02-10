/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00ff90',
          dark: '#00dd7b',
          light: '#33ffa6',
        },
        secondary: '#000000',
        accent: {
          gray: '#adadad',
          light: '#e7e8ec',
        },
        zinc: {
          950: '#0a0a0a', // Deepest black-gray
        }
      },
      fontFamily: {
        uber: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
