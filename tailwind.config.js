/** @type {import('tailwindcss').Config} */
export default {
  // Crucial: Tell Tailwind where to look for class names in your React/TSX files
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}