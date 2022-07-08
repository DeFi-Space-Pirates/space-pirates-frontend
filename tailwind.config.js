/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    theme: 'custom',
    themes: [
      {
        custom: {
          primary: '#A9FFCB',
          secondary: '#C2C8FF',
          accent: '#FFC16C',
          neutral: '#171619',
          'base-100': '#FBF8FF',
          info: '#91D2FF',
          success: '#A9FFCB',
          warning: '#FFC16C',
          error: '#FFA48E',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
}
