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
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
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
        "lighter-dark-purple": "#110b24",
        "light-purple": "#161028",
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
