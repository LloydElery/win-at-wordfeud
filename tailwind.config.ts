import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        primaryBlue: "#1E212E",
        accentBlue: "#191731",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
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
    },
  },
  plugins: [],
} satisfies Config;
