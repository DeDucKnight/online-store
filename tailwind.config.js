/** @type {import('tailwindcss').Config} */
export default {
  mode: ["jit"],
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          500: "#2a314a",
        },
        gray: {
          900: "#202225",
          800: "#2f3136",
        },
      },
      padding: {
        ratio1x1: "100%",
        ratio1x2: "200%",
        ratio1x3: "300%",
        ratio2x1: "50%",
        ratio2x3: "150%",
        ratio3x1: "33.33%",
        ratio3x2: "66.66%",
        ratio3x4: "133%",
        ratio4x1: "25%",
        ratio4x3: "75%",
        ratio4x5: "125%",
        ratio5x1: "20%",
        ratio5x2: "40%",
        ratio5x3: "60%",
        ratio16x9: "56.25%",
        ratio20x9: "45%",
      },
      aspectRatio: {
        "1x1": "1 / 1",
        "1x2": "1 / 2",
        "1x3": "1 / 3",
        "2x1": "2 / 1",
        "2x3": "2 / 3",
        "3x1": "3 / 1",
        "3x2": "3 / 2",
        "3x4": "3 / 4",
        "4x1": "4 / 1",
        "4x3": "4 / 3",
        "4x5": "4 / 5",
        "5x1": "5 / 1",
        "5x2": "5 / 2",
        "5x3": "5 / 3",
        "9x10": "9 / 10",
        "16x9": "16 / 9",
        "20x9": "20 / 9",
        "golden-v": "1.618",
        "golden-h": "0.6180469715698392",
        card: "0.6666666666666666",
      },
      spacing: {
        "2px": "2px",
        "3px": "3px",
      },
      inset: {
        "2px": "2px",
        "3px": "3px",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 100 },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.2s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
