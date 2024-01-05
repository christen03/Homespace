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
        accent: "#F5D769",
        secondary: "#69A297",
        secondaryDark: "#486F66",
        colorbng: "#253237",
      },
    },
  },
  plugins: [],
} satisfies Config;
