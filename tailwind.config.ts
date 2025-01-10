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
        "text-color": "#2B3674",
        "progress-bar-color": "#4318FF",
        "theme-color": "#5355AF",
      },
      keyframes: {
        shimmer: {
          '0%': {
            backgroundPosition: '200% 0'
          },
          '100%': {
            backgroundPosition: '-200% 0'
          }
        }
      },
    },
  },
  plugins: [],
};
export default config;
