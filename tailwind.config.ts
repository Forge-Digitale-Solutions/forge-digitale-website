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
        "dark-base": "#020617", // Slate 950 - used throughout the site
      },
    },
  },
  plugins: [],
};
export default config;
