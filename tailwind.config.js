const { addDynamicIconSelectors } = require('@iconify/tailwind')

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Colores personalizados
      colors: {
        lilac: '#4B0082',
        gold: '#CFA14C',
        blueblack: '#002147',
        lightblue: '#88BFFF',
        red: '#FF0202',
        bluedark: '#3F7FC8',
        blue: '#0051FF',
        bluemint: '#EAF1F8',
        purple2: '#431DA3',
        'purple-dark': '#4B0082',
        purple: '#800080',
        'purple-light': '#D8BFD8',
      },

      // Fuentes personalizadas
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'noto-sans': ['Noto Sans', 'serif'],
      },

      // Pesos de fuente personalizados
      fontWeight: {
        'extralight': '250',
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800',
      },

      // Tamaños de texto personalizados
      fontSize: {
        '2.5xl': '1.7rem',
      },

      // Letter spacing para look moderno
      letterSpacing: {
        'tighter': '-0.02em',
        'tight-custom': '-0.01em',
      },

      // Line height optimizado
      lineHeight: {
        'tight': '1.2',
        'normal': '1.6',
      },
    },

    backgroundImage: {
      'hero': "url('../src/assets/Alerofondo.jpeg')",
      'bangkok': "url('../../src/assets/bangkok.jpg')",
      'borabora': "url('../../src/assets/borabora.jpeg')",
      'ottawa': "url('../../src/assets/bottawa.jpg')",
      'roma': "url('../../src/assets/roma.jpeg')",
      'edimburgo': "url('../../src/assets/edimburgo.jpeg')",
      'tokyo': "url('../../src/assets/tokyo.webp')"
    },

    icons: {
      Airplane: "url('../../src/assets/IconAirplane1.png')"
    }
  },
  plugins: [addDynamicIconSelectors()],
}