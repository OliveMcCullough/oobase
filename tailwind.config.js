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
        },
        twinkle: {
          '0%, 100%': {opacity: 0},
          '50%': {opacity: 1}
        },
        linger: {
          '0%, 100%': {opacity: 0},
          '30%, 70%': {opacity: 0.25}
        },
        pulse: {
          '0%, 100%': {transform: "scale(0.1)"},
          '40%, 60%': {transform: "scale(1)"}
        }
      },
      animation: {
        'seesaw': 'seesaw 1s ease-in-out infinite',
        'twinkle': 'twinkle 1s ease-in-out 1',
        'linger': 'linger 7s ease-in-out 1',
        'pulse': 'pulse 7s ease-in-out 1'
      }
    },
  },
  plugins: [],
}
