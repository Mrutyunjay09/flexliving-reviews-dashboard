/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        flex: {
          cream: '#FFFDF6',
          section: '#FFF9E9',
          olive: '#284E4C',
          text: '#333333',
        },
      },
    },
  },
  plugins: [],
};
