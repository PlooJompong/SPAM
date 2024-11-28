/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'primary': ['Special Elite', 'cursive'],
      },
      backgroundImage: {
        'checkered-pattern': "url('./src/assets/checkeredPattern.png')",
      }
    },
    plugins: [],
  }
}