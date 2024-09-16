/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  // theme: {
  //   extend: {},
  // },
  theme: {
    extend: {
      backgroundImage: {
        "signup-bg":
          "url('https://i.pinimg.com/736x/24/3d/25/243d2509f1657c6addbddbdba212492e.jpg')",
      },
    },
  },
  plugins: [],
};

