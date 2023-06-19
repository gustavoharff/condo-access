/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        'poppins-400': ["Poppins_400Regular", "sans-serif"],
        'poppins-500': ["Poppins_500Medium", "sans-serif"],
        'poppins-700': ["Poppins_700Bold", "sans-serif"],
      }
    },
  },
  plugins: [],
}
