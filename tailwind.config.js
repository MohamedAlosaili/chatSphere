/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      transitionDuration: {
        DEFAULT: "250ms",
      },
      colors: {
        tcolor: {
          DEFAULT: "#e2e8f0",
          2: "#94a3b8",
        },
        bcolor: {
          DEFAULT: "#131313",
          2: "#2e333d",
        },
        accent: "#6b8afd",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ["Inter var, sans-serif", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
