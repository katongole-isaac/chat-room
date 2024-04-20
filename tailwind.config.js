/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {},
    colors: {
      light: "#FDFEFE",
      dark: "#252A33",
      textDark: "#F6F7F9",
      textLight: "#23272F",
      lightHover: "#f3f3f3",
      darkHover: "#454950",
    },
  },
  plugins: [],
  darkMode: "class",
};
