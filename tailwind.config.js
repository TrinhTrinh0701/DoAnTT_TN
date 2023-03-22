/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        1100: "1100px",
      },
    },
    colors: {
      primary: "#F5F5F5",
      secondary1: "#FFC107",
      secondary2: "#581C87",
      white: "#ffff",
      yellow: "#ffc107",
      red: "#f5554a",
      back: "#180807",
      orangce: "#ff5722",
      green: "#16C784",
      gray: "#8A8D9E",
      gray900: "#545553",
      gray600: "#e5e5e5",
      "overlay-30": "rgba(0,0,0,0.3)",
      "overlay-70": "rgba(0,0,0,0.7)",
    },
    maxWidth: {
      600: "600px",
      1100: "1100px",
    },
    minWidth: {
      300: "300px",
      200: "200px",
    },
    cursor: {
      pointer: "pointer",
    },
    flex: {
      1: "1 1 0%",
      3: "3 3 0%",
      2: "2 2 0%",
      none: "none",
      auto: "1 1 auto",
      flex: "0 1 auto",
    },
    animation: {
      "slide-right":
        "slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
    },
    keyframes: {
      " slide-right ": {
        "0%": {
          "-webkit-transform": "translateX(0)",
          transform: "translateX(0)",
        },
        "100%": {
          "-webkit-transform": "translateX(100px)",
          transform: "translateX(100px)",
        },
      },
    },
  },

  plugins: [],
};
