/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: ["cmyk"],
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), require("tailwind-scrollbar-hide")],
};
