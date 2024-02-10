/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./views/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        //"8xl": "50rem",
      },
      colors: {
        "primary-gray": "#f9f9f9",
        orange: "#FFF7EF",
        "accent-blue": "#3387F0",
        "accent-blue-light": "#F4F7FF",
        "dark-orange": "#F79327",
        "accent-orange": "#FABA75",
        "light-orange": "#FCE2C5",
        "dark-purple": "#0C071D",
        "accent-dark-purple": "#1C0F3F",
        "light-gray": "#F4F4F4",
      },
      maxWidth: {
        "8xl": "90rem",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
  plugins: ["prettier-plugin-tailwindcss"],
};
