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

      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-10px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(10px)' },
        },
      },
      animation: {
        shake: 'shake 0.3s ease-in-out',
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
