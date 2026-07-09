/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          white: '#FFFFFF',
          medical: '#F8FCFC',
          lightAqua: '#EDF9F8',
          turquoise: '#3DB7B5',
          ocean: '#1F7FBF',
          navy: '#163A5F',
          silver: '#D8E3E8',
          gold: '#CBB37A',
        },
        text: {
          DEFAULT: '#1D2B36',
        },
        // Dark mode background overrides (we'll handle via CSS variables later)
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
        numbers: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}