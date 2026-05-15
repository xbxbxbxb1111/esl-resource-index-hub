import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        paper: "#faf7f1",
        ink: "#27241f",
        muted: "#6f6a60",
        line: "#e7ded0",
        fern: "#3f6f64",
        clay: "#b96f54",
        skywash: "#e9f3f5"
      },
      boxShadow: {
        soft: "0 18px 45px rgba(39, 36, 31, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
