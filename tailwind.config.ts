import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        accent: "#894438",
        secondary: "#894438",
        secondaryDark: "#486F66",
        colorbng: "#FCF9F0",
      },
    },
  },
  plugins: [],
} satisfies Config;
