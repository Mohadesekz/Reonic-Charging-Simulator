/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Include all JavaScript/TypeScript/React files in the src folder
  ],
  theme: {
    extend: {
      colors: {
        white: "#ffffff",
        black: "#000000",
        "reonic-blue": "#4a5685",
        "reonic-yellow": "#f2d473",
        "reonic-red": "#ef5446",
        "reonic-green": "#bbda8a",
        background: "#f4f4f4",
      },
    },
  },
  plugins: [],
}
