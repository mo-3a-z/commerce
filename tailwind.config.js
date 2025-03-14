/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {


      colors: {
        'main': '#0aad0a',
        'gray': '#919eab',

      },
      
     container:{
      center:true,
      padding: "2rem"
     }
 

    },  },
  plugins: [
    require('flowbite/plugin') 
  ],
}

