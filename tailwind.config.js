import {
  baseColors,
  authorityColors,
  customerColors,
} from "./src/app/colors.js";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Base colors available globally
        primary: baseColors.primary,
        secondary: baseColors.secondary,
        neutral: baseColors.neutral,
        success: baseColors.success,
        warning: baseColors.warning,
        error: baseColors.error,
        info: baseColors.info,

        // Authority portal colors
        authority: {
          brand: authorityColors.brand,
          accent: authorityColors.accent,
          status: authorityColors.status,
          ui: authorityColors.ui,
        },

        // Customer portal colors
        customer: {
          brand: customerColors.brand,
          accent: customerColors.accent,
          status: customerColors.status,
          ui: customerColors.ui,
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
        medium:
          "0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        strong:
          "0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 2px 10px -2px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};
