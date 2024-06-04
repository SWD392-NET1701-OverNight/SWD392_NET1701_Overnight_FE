/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#8A33FD',
        secondary: '#3C4242',
        third: '#807D7E',
        fourth: '#F6F6F6',
        heading: '#333333',
      },
    },
  },
  plugins: [],
}
