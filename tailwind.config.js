const { addDynamicIconSelectors } = require('@iconify/tailwind')

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},

    backgroundImage:{
      'hero':"url('../../src/assets/Alerofondo.jpeg')",


      'bangkok':"url('../../src/assets/bangkok.jpg')",
      'borabora':"url('../../src/assets/borabora.jpeg')",
      'ottawa':"url('../../src/assets/bottawa.jpg')",
      'roma':"url('../../src/assets/roma.jpeg')",
      'edimburgo':"url('../../src/assets/edimburgo.jpeg')",
      'tokyo':"url('../../src/assets/tokyo.webp')"
    },

    icons:{
      Airplane:"url('../../src/assets/IconAirplane1.png')"

    }
    
  },
  plugins: [addDynamicIconSelectors()],

}

