/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        darkGold:"#B8860B" ,
         lightGreen: '#008000'
      } , 
      screens: {
        'mobile': '412px', // breakpoint سفارشی برای 412px
      },
    },
  },
  plugins: [],
}

