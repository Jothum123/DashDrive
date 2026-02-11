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
          dark: '#00cc74',
          light: '#33ffa6',
        },
        "background-light": "#f6f7f8",
        "background-dark": "#111c21",
        "panel-dark": "#1a262e",
        "border-dark": "#2d3a43",
        secondary: '#000000',
        accent: {
          gray: '#adadad',
          light: '#e7e8ec',
        },
        zinc: {
          950: '#0a0a0a',
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
