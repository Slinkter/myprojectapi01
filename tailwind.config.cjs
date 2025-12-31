const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
    darkMode: "class",
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", "sans-serif"],
            },
            keyframes: {
                "fade-in-up": {
                    "0%": {
                        opacity: "0",
                        transform: "translateY(10px)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translateY(0)",
                    },
                },
                "fade-in": {
                    "0%": {
                        opacity: "0",
                    },
                    "100%": {
                        opacity: "1",
                    },
                },
            },
            animation: {
                "skeleton-loading": "fade-in-up 0.5s ease-out forwards",
                "not-foundName": "fade-in 0.5s ease-in-out forwards",
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
});
