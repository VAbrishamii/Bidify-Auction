/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html', './src/**/*.css'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 1s linear infinite',
      },
      colors: {
        primary: {
          default: '#346F65',
          primaryDark: '#192E28',
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
        boxShadow:{
          'primary-glow':'0 0px 15px rgba(52, 111, 101, 0.5)',
        },
      },
      fontFamily: {
        body: ['Manrope', 'sans-serif'],
      },
      textColor: {
        primary: '#346F65',
        'primary-hover': '#488F84',
        secondary: '#88B990',
        'secondary-hover': '#ABCD9E',
      },
     
    },
  },
  plugins: [
  ],
}

