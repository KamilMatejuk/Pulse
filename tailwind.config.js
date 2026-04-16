/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pulse-accent': '#7b2cb9',
        'pulse-bg': '#f7f7f5',
      },
    },
  },
  plugins: [],
}