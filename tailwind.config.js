/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        dot1: {
          "0%, 24%, 100%": { opacity: 0 },
          "25%, 90%": { opacity: 1 },
        },
        dot2: {
          "0%, 49%, 100%": { opacity: 0 },
          "50%, 90%": { opacity: 1 },
        },
        dot3: {
          "0%, 74%, 100%": { opacity: 0 },
          "75%, 90%": { opacity: 1 },
        },
      },
      animation: {
        dot1: "dot1 4s infinite",
        dot2: "dot2 4s infinite",
        dot3: "dot3 4s infinite",
      },
      backgroundImage: {
        begin: "url('/src/assets/begin.jpeg')",
        end: "url('/src/assets/end.jpeg')",
      },
    },
  },
  plugins: [],
};
