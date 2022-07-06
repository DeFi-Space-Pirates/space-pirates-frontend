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
          accent: '#EFD6D2',
          neutral: '#191D24',
          'base-100': '#2A303C',
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#F87272',
        },
      },
    ],
    darkMode: 'custom',
  },
  plugins: [require('daisyui')],
}
