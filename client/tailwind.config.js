/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        primary: '#8b5cf6', // Violet
        secondary: '#06b6d4', // Cyan
        darkBg: '#0a0812',
        darkCard: '#110f1c',
      }
    },
  },
  plugins: [],
}
