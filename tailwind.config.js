/** @type {import('tailwindcss').Config} */
export default {
    darkMode:'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        first: {
          DEFAULT: '#85A844',
          
        },
        second: {
          DEFAULT: '#3D474D',
          
        },
        thrid: {
          DEFAULT: '#868AA7',
          
        },
        
        
      },
    },
  },
  plugins: [require('daisyui')],
}
  