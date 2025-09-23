//frontend/tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Możesz dodać własne kolory dla dark mode
        dark: {
          bg: {
            primary: "#0f172a",
            secondary: "#1e293b",
            tertiary: "#334155",
          },
          text: {
            primary: "#f1f5f9",
            secondary: "#cbd5e1",
            tertiary: "#94a3b8",
          },
          border: "#334155",
        },
      },
      animation: {
        "theme-transition": "theme 0.3s ease-in-out",
      },
      keyframes: {
        theme: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.95 },
        },
      },
    },
  },
  plugins: [],
};
