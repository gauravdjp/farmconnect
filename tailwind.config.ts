import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
        },
        earth: {
          50: "#faf6f0",
          100: "#f4ece0",
          200: "#e8d7c1",
          300: "#d9bea0",
          400: "#c7a07c",
          500: "#b8895f",
          600: "#a2724e",
          700: "#81573e",
          800: "#694736",
          900: "#553b2f",
        }
      },
    },
  },
  plugins: [],
};
export default config;
