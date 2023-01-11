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
        'multicolore': ['Multicolore'],
      },
      keyframes: {
        seesaw_large: {
          '0%, 100%': {transform: 'rotate(5deg)'},
          '50%': {transform: 'rotate(-5deg)'}
        },
        seesaw_large_reverse: {
          '0%, 100%': {transform: 'rotate(-5deg)'},
          '50%': {transform: 'rotate(5deg)'}
        },
        seesaw_medium: {
          '0%, 100%': {transform: 'rotate(1.5deg)'},
          '50%': {transform: 'rotate(-1.5deg)'}
        },
        seesaw_small: {
          '0%, 100%': {transform: 'rotate(0.5deg)'},
          '50%': {transform: 'rotate(-0.5deg)'}
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
        'seesaw-large': 'seesaw_large 1s ease-in-out infinite',
        'seesaw-reverse-large-fast': 'seesaw_large_reverse 0.75s ease-in-out infinite',
        'seesaw-medium-fast': 'seesaw_medium 0.75s ease-in-out infinite',
        'seesaw-small-fast': 'seesaw_small 0.75s ease-in-out infinite',
        'twinkle': 'twinkle 1s ease-in-out 1',
        'linger': 'linger 7s ease-in-out 1',
        'pulse': 'pulse 7s ease-in-out 1'
      }
    },
  },
  plugins: [],
}
