import { useState, useEffect } from "react";

/**
 * Custom hook para gestionar el tema de la aplicación (claro/oscuro).
 * Persiste la preferencia del usuario en localStorage.
 * @returns {[string, function]} - El tema actual y la función para cambiarlo.
 */
export const useTheme = () => {
    // Inicializa el tema desde localStorage o usa 'light' por defecto.
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light";
    });

    // Función para alternar entre tema claro y oscuro.
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    // Efecto para actualizar localStorage y la clase del <html> cuando el tema cambia.
    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.documentElement.className = theme; // Aplica 'light' o 'dark' como clase
    }, [theme]);

    return [theme, toggleTheme];
};
