import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        graphite: {
          950: "#14181D",
          900: "#1C2229",
          800: "#252D37",
          700: "#333C48",
          600: "#45505E",
          500: "#5B6470",
          400: "#8B95A2",
          300: "#B8C0CA",
          200: "#D8DCE2",
          100: "#EDEFF2",
          50: "#F7F8FA",
        },
        paper: {
          DEFAULT: "#FAF9F6",
          dark: "#181D24",
        },
        brass: {
          50: "#FDF9F0",
          100: "#F5ECD8",
          200: "#EBDAB3",
          300: "#DFC187",
          400: "#D1A85C",
          500: "#B8862E",
          600: "#9C6E21",
          700: "#7E5517",
          800: "#5E3E0F",
          900: "#3F2808",
        },
        verified: {
          50: "#EBF7F0",
          100: "#D2EEDD",
          500: "#27975E",
          600: "#1E7A4C",
          700: "#165E3A",
        },
        tolerance: {
          50: "#FDF7EA",
          100: "#FAEDCE",
          500: "#D49B35",
          600: "#B8862E",
          700: "#94681E",
        },
        fail: {
          50: "#FBEBEA",
          100: "#F6D2CF",
          500: "#CE453F",
          600: "#B23A34",
          700: "#8F2B26",
        },
      },
      fontFamily: {
        sans: ["var(--font-plex-sans)", "IBM Plex Sans", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "IBM Plex Mono", "monospace"],
      },
      boxShadow: {
        'metro': '0 1px 3px rgba(20, 24, 29, 0.08), 0 1px 2px rgba(20, 24, 29, 0.04)',
        'metro-lg': '0 4px 16px -2px rgba(20, 24, 29, 0.12), 0 2px 6px -1px rgba(20, 24, 29, 0.06)',
        'gauge': 'inset 0 2px 4px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
};

export default config;
