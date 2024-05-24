/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {fontFamily: {
      'open-sans': ['Open Sans', 'sans-serif'],
      'sans': ['Mona Sans', 'sans-serif'],
      'league': ['League Spartan', 'sans-serif'],
      'montserrat': ['Montserrat', 'sans-serif'],
    },
    colors: {
      custom: '#6765D4',
        'custom-darker': '#5553B7',
        'admin': '#AAE100',
        'admin-back': '#faffe0',
        'admin-bg': '#F0FABB',
        'home-bg': '#D7AA75',
        'home-btn': '#BF9768',
        'home-pink': '#FA5A96',
        'user-btns': '#2E3E55',
        'user-btns-dark': '#1F3147',
        'user-bg-small': '#FFF5DA',
        'survey-bg': '#D8F3FD',
        'survey-bg2': '#f2fbff',
        'survey-bg-dark': '#00b6ff'
    },},
  },
  plugins: [],
}

