import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#C5A059", // Or/Gold
          foreground: "#1A1A1A", // Text on gold background
        },
        secondary: {
          DEFAULT: "#1A1A1A", // Dark Gray/Black
          foreground: "#FFFFFF", // Text on dark background
        },
        background: "#FFFFFF",
        foreground: "#1A1A1A",
      },
    },
  },
  plugins: [],
};
export default config;
