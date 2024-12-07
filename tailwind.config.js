/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pink: {
          500: '#FF4E6D',
        },
        'wine-red': '#8B0000',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        dancing: ['Dancing Script', 'cursive'],
      },
      dropShadow: {
        'lg': '0 4px 6px rgba(139, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
};