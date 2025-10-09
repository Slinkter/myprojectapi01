const withMT = require("@material-tailwind/react/utils/withMT");
const plugin = require("tailwindcss/plugin");

module.exports = withMT({
    darkMode: "class",
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", "sans-serif"], // Cambia la fuente por defecto
            },
            colors: {
                brand: {
                    DEFAULT: "#10b981", // verde principal (se usa con `text-brand`)
                    light: "#6ee7b7", // verde claro
                    dark: "#047857", // verde oscuro
                },
            },
            screens: {
                "3xl": "1920px", // Añade un breakpoint para pantallas muy grandes
            },
            spacing: {
                128: "32rem", // Añade un valor de espaciado/tamaño grande (w-128, h-128, etc.)
            },
            borderRadius: {
                "4xl": "2rem", // Añade un radio de borde extra grande
            },
            keyframes: {
                "fade-in-up": {
                    "0%": {
                        opacity: "0",
                        transform: "translateY(20px)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translateY(0)",
                    },
                },
                "scale-in": {
                    "0%": {
                        opacity: "0",
                        transform: "scale(0.9)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "scale(1)",
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
                "fade-in-up": "fade-in-up 0.5s ease-out forwards",
                "scale-in": "scale-in 0.5s ease-in-out forwards",
                "fade-in": "fade-in 0.5s ease-in-out forwards",
            },
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
        // Plugin personalizado para añadir variantes basadas en atributos de datos
        plugin(function ({ addVariant }) {
            // Añade la variante `data-open:` que se activa cuando el elemento tiene `data-state="open"`
            addVariant("data-open", '&[data-state="open"]');
            // Añade la variante `data-closed:` que se activa cuando el elemento tiene `data-state="closed"`
            addVariant("data-closed", '&[data-state="closed"]');
        }),
    ],
});
