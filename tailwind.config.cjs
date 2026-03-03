/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        heading: ["Outfit", "sans-serif"],
      },
      colors: {
        // System Design Palette - Premium Grayscale
        neutral: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
        // Premium Brand Colors
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1", // Indigo core
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
        // Semantic Theme Mapping
        light: {
          bg: "#f8fafc",
          surface: "#ffffff",
          border: "#e2e8f0",
          text: "#0f172a",
          muted: "#64748b",
        },
        dark: {
          bg: "#020617", // Deep Navy Black
          surface: "#0f172a", // Navy Surface
          border: "#1e293b",
          text: "#f8fafc",
          muted: "#94a3b8",
        },
      },
      boxShadow: {
        premium: "0 10px 30px -10px rgba(0, 0, 0, 0.1)",
        "premium-hover": "0 20px 40px -15px rgba(0, 0, 0, 0.2)",
        "dark-premium": "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
      },
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.5s ease-out forwards",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
