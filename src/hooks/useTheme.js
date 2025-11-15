import { useState, useEffect } from "react";

/**
 * Custom hook para gestionar el tema de la aplicación (claro/oscuro).
 * Persiste la preferencia del usuario en localStorage.
 * @returns {[string, function]} - El tema actual y la función para cambiarlo.
 */
export const useTheme = () => {
    const [theme, setTheme] = useState(() => {
        // 1. Revisa el tema guardado en localStorage.
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            return savedTheme;
        }
        // 2. Si no hay tema guardado, revisa la preferencia del sistema operativo.
        const prefersDark = window.matchMedia?.(
            "(prefers-color-scheme: dark)"
        ).matches;
        return prefersDark ? "dark" : "light";
    });

    // Función para alternar entre tema claro y oscuro.
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    // Efecto para actualizar localStorage y la clase del <html> cuando el tema cambia.
    useEffect(() => {
        const root = document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    return [theme, toggleTheme];
};
