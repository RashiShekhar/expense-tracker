/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // entry point
    "./src/**/*.{js,ts,jsx,tsx}", // all React component files
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
