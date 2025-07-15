import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background-color)",
        text: "var(--text-color)",
        "text-secondary": "var(--text-secondary-color)",
        border: "var(--border-color)",
        active: "var(--active-color)",
      },
      borderRadius: {
        "10px": "var(--border-radius-10px)",
      },
      fontFamily: {
        inter: ["var(--font-family-inter)", "sans-serif"],
        poppins: ["var(--font-family-poppins)", "sans-serif"],
      },
    },
  },
}
export default config
