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
          primary: '#44BBA4',
          secondary: '#A9FFCB',
          accent: '#DE369D',
          neutral: '#171619',
          'base-100': '#EFD6D2',
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#F87272',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
}
