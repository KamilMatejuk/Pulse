/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pulse-accent': 'var(--color-accent)',
        'pulse-bg': 'var(--color-bg)',
      },
    },
  },
  plugins: [],
}