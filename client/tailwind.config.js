/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { "green-gator": "#44da96" },

      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
      },

      scale: {
        101: "1.01",
        102: "1.02",
      },

      borderWidth: {
        DEFAULT: "1px",
        0: "0",
        1: "1px",
      },
      opacity: { 98: ".98", 97: ".97", 99: "99" },
    },
  },
  plugins: [],
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
};
