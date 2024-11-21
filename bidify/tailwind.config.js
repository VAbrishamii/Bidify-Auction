/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        primary: {
          default: '#34F65',
          hover: '#488F84',
        },
        secondary: {
          default: '#88B990',
          hover: '#ABCD9E',
        },
        gray:{
          dark:'#677068',
          mideum:'#343232',
          light:'#EBE7E7',

        },
        balck:{
          light:'#3E3E3E',
          dark:'#2B2B2B',
        },
        red:{
          default:'#EB6213',
        },
      },
      fontFamily: {
        body: ['Manrope', 'sans-serif'],
      },
     
    },
  },
  plugins: [
  ],
}

