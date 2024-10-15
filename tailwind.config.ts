import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-readex_pro)", ...fontFamily.sans],
      },
      letterSpacing: {
        custom: "5%",
      },
      colors: {
        primaryBlue: "#1E212E",
        accentBlue: "#191731",
        gameboardDL: "#3B873A",
        gameboardDW: "#D88627",
        gameboardTL: "#1F3A9A",
        gameboardTW: "#6F1515",
        gameboardBG: "rgba(35, 35, 37, 0.50)",
        letterTile: "rgba(249, 246, 240, 0.9)",
        placeholderLetterTile: "rgba(249, 246, 240, 0.6)",
        modalGrey: "#232325",
        modalGrey80: "rgb(35, 35, 37, 0.8)",
        searchResultsBG: "rgba(217, 217, 217, 0.1)",
        searchResultsBorder: "rgba(255, 255, 255, 0.2)",
        searchResultsPointsBG: "#FFB800",
        informationIconBG: "rgb(45, 45, 45, 0.7)",
      },
      gridTemplateColumns: {
        "15": "repeat(15, minmax(0, 1fr))",
      },
      gridTemplateRows: {
        "15": "repeat(15, minmax(0, 1fr))",
      },
      width: {
        "26": "26px",
      },
      height: {
        "26": "26px",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        blink: "blink 1s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-inner-border")],
};
