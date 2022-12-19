/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'franxurter-totally': ['Franxurter Totally'],
        'franxurter-totally-fat': ['Franxurter Totally Fat'],
      },
      keyframes: {
        seesaw: {
          '0%, 100%': {transform: 'rotate(5deg)'},
          '50%': {transform: 'rotate(-5deg)'}
        }
      },
      animation: {
        'seesaw': 'seesaw 1s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
