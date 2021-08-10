module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class',
  important: true,
  theme: {
    extend: {
      colors: {
        black: { DEFAULT: "#171717" },
        light_black: { DEFAULT: "#1d2126" },
        grey: { DEFAULT: "#444444" },
        red: { DEFAULT: "#DA0037" },
        light_grey: { DEFAULT: "#EDEDED" },
      },
      animation: {
        bounce200: "bounce 1s infinite 200ms",
        bounce400: "bounce 1s infinite 400ms",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};