/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4CAF50',
          dark: '#388E3C'
        },
        accent: {
          DEFAULT: '#00C853',
          dark: '#00B248'
        },
        background: {
          light: '#F5F7FA',
          dark: '#121212'
        },
        glass: 'rgba(255, 255, 255, 0.25)',
        'glass-dark': 'rgba(0, 0, 0, 0.25)'
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif']
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
