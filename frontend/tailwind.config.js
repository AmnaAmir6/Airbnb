/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'fa': ['Font Awesome 5 Free', 'sans-serif'],
      },
      colors: {
        'custom-red': 'rgb(245, 222, 218)', 
      },
    },
  },
  plugins: [],
}
