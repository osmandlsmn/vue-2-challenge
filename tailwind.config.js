/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0F6FE9",
        secondary: "#768DDE",
        danger: "##FF1C1C",
        success: "#0EDC79",
      },
    },
  },
  plugins: [],
};
