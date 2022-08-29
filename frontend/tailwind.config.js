/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  mode: "jit",
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: '#5c6ac4',
        secondary: '#1d4ed8',
        error: '#f87171',
        errorHover: '#ef4444'
      }

    },
  },
  plugins: [],
}
