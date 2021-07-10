module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class',
  important: true,
  theme: {
    extend: {
      colors: {
        black: { DEFAULT: '#171717'},
        grey: { DEFAULT: '#444444'},
        red: { DEFAULT: '#DA0037'},
        light_grey: {DEFAULT: '#EDEDED'}
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
