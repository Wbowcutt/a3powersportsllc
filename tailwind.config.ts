import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-barlow)", "system-ui", "sans-serif"],
        display: ["var(--font-oswald)", "Impact", "sans-serif"],
      },
      colors: {
        ink: {
          950: "#0a0a0a",
          900: "#111111",
          800: "#1c1c1c",
          700: "#2a2a2a",
          600: "#3f3f3f",
          500: "#5c5c5c",
          400: "#8a8a8a",
          300: "#b5b5b5",
          200: "#e4e4e4",
          100: "#f4f4f4",
        },
        racing: {
          700: "#7a0810",
          600: "#b00012",
          500: "#e10600",
          400: "#ff3b30",
        },
      },
    },
  },
  plugins: [],
};

export default config;
