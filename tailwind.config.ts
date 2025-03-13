/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class", // Ensures dark mode is applied via a class
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          "button-dark": "var(--button-dark)",
          "button-dark-hover": "var(--button-dark-hover)",
          "button-light": "var(--primary-btn-bg-light)",
        },
      },
    },
    plugins: [],
  };
  