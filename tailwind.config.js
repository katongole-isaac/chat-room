/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        light: {
          DEFAULT: "#FDFEFE", 
          50: "#FDFEFE",
          100: "#F4F2EE",
          200: "#f3f3f3", // hover on light theme
          300: "#F6F7F9", // light text on dark theme
        },

        dark: {
          DEFAULT: "#252A33",
          50: "#454950", // hover on dark theme 1
          100: "#292f36", // hover on dark theme 2
          200: "#23272F", // black text on light theme
        },
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
