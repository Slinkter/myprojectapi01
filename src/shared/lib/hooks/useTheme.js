/**
 * @file useTheme.js
 * @description
 * Hook personalizado para inyectar y gestionar el sistema de temática oscura/clara de la aplicación.
 * Mantiene la sincronización entre el estado local (React), la persistencia (localStorage) y 
 * la clase raíz del documento de HTML (útil para la estrategia CSS de Tailwind Dark Mode).
 */

import { useState, useEffect } from "react";

/**
 * Hook para gestionar el tema de color de la aplicación.
 * Prioriza la decisión del usuario guardada previamente. Si es la primera visita, 
 * intenta detectar la preferencia del sistema operativo de manera automática.
 *
 * @hook
 * @function useTheme
 * @returns {[string, function(): void]} Tupla conteniendo: [temaActual, funcionAlternarTema]
 *
 * @example
 * ```typescript
 * function Header() {
 *   const [theme, toggleTheme] = useTheme();
 *
 *   return (
 *     <button onClick={toggleTheme}>
 *       Cambiar a modo {theme === 'light' ? 'Oscuro' : 'Claro'}
 *     </button>
 *   );
 * }
 * ```
 */
export const useTheme = () => {
  // Inicialización perezosa (Lazy initialization) del estado para evitar 
  // parpadeos en el renderizado inicial leyendo sincronamente el localStorage.
  const [theme, setTheme] = useState(() => {
    // 1. Buscamos si el usuario ya eligió un tema anteriormente.
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme;
    }
    
    // 2. Si no hay preferencia guardada, verificamos la preferencia del Sistema Operativo.
    // Usamos el API matchMedia para leer la directiva CSS nativa prefers-color-scheme.
    const prefersDark = window.matchMedia?.(
      "(prefers-color-scheme: dark)"
    ).matches;
    
    // 3. Fallback final al tema claro si no hay preferencias detectables.
    return prefersDark ? "dark" : "light";
  });

  /**
   * Alterna el tema actual entre "light" (claro) y "dark" (oscuro).
   * @function toggleTheme
   */
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Efecto secundario que sincroniza React con el DOM real y el almacenamiento del navegador.
  useEffect(() => {
    const root = document.documentElement;
    
    // Se añade o quita la clase "dark" en la etiqueta <html>
    // Esto activa los selectores "dark:*" de TailwindCSS en toda la aplicación.
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    
    // Persistimos la elección para que no se pierda al recargar la página.
    localStorage.setItem("theme", theme);
  }, [theme]); // El efecto se dispara cada vez que el estado 'theme' cambia.

  return [theme, toggleTheme];
};
