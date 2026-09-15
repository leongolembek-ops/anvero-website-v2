/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        /* Petrol = die Software arbeitet */
        brand: {
          50:  '#f2faf8',
          100: '#e5f1ef',
          200: '#cfe6e1',
          300: '#b8d6d1',
          400: '#83b9b4',
          500: '#2a8d88',
          600: '#176b68',
          700: '#125c59',
          800: '#123f3d',
          900: '#102c2b',
          950: '#0b211f',
        },
        /* Gold = ein Mensch muss entscheiden */
        approve: {
          50:  '#fdf6e3',
          100: '#fbeecd',
          300: '#e2bd60',
          600: '#b8860b',
          800: '#7a5c07',
        },
        ink: '#102322',
        offwhite: '#f8faf9',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
