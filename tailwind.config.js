/** @type {import('tailwindcss').Config} */
export default {
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
      },
    },
  },
  plugins: [require('daisyui')],
}
  