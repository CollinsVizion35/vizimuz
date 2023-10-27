/** @type {import('tailwindcss').Config} */
export default  {
  content: [
    './src/*.{html,js}',
    './src/**/*.{html,js}'
  ],
  theme: {
    extend: {
      fontFamily: {
        'Roboto': ['Roboto', 'sans-serif'],
        'Nunito' : ['Nunito', 'sans-serif'],
        'Poppins' : ['Poppins', 'sans-serif'],
        'WorkSans' : ['Work Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

