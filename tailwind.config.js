/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mainGreen: "#38A5A3",
        mainWhite: "#f5f5f5",
        altWhite: "#EAEFEC",
        mainGray: "#A4A4A4",
        mainDark: "#202423",
        mainRed: "#DB5B66",
      },
    },
  },
  plugins: [],
};
