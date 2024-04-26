/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: "#877eff",
        bgG1: "#111315",
        bgG2: "#1a1d1f",
        hoverColor: "#111315",
        textColor: "#fcfcfc",
        textColor2: "#FBFBFB",
        "text-light-1": "#050505",
        "text-light-2": "#65676b",
        "text-dark-1": "#E4E6EB",
        "text-dark-2": "#B0B3B8",
        "text-dark-3": "#D1D5D8",
        "primary-500": "#877EFF",
        "primary-600": "#5D5FEF",
        "secondary-500": "#FFB620",
        "off-white": "#D0DFFF",
        red: "#FF5A5A",
        "dark-1": "#000000",
        "dark-2": "#09090A",
        "dark-3": "#101012",
        "dark-4": "#1F1F22",
        "dark-5": "#272b30",
        "light-1": "#FFFFFF",
        "light-2": "#EFEFEF",
        "light-3": "#9ca3af",
        "light-4": "#7878A3",
        "light-5": "#5C5C7B",
      },
      screens: {
        xs: "480px",
      },
      width: {
        420: "420px",
        465: "465px",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
