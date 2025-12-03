import { useState, useEffect } from "react";

/**
 * @hook useDebouncedSearch
 * @description Hook personalizado para obtener un valor "debounced" de un input.
 * Es útil para retrasar la ejecución de una operación costosa (como una llamada a API)
 * hasta que el usuario haya dejado de escribir por un período determinado.
 *
 * @param {any} initialValue - El valor inicial.
 * @param {number} delay - El tiempo de espera en milisegundos después de que el usuario deja de escribir.
 * @returns {Array} - Devuelve un array con tres elementos:
 *   - `inputValue` (any): El valor actual del input, que se actualiza inmediatamente.
 *   - `setInputValue` (function): La función para actualizar el valor del input.
 *   - `debouncedValue` (any): El valor debounced, que solo se actualiza después del `delay`.
 */
export const useDebouncedSearch = (initialValue, delay) => {
    const [inputValue, setInputValue] = useState(initialValue);
    const [debouncedValue, setDebouncedValue] = useState(initialValue);

    useEffect(() => {
        // 1. Configurar un temporizador para actualizar el valor debounced.
        const handler = setTimeout(() => {
            setDebouncedValue(inputValue);
        }, delay);

        // 2. Limpiar el temporizador si el valor del input cambia.
        // Esto evita que el valor debounced se actualice mientras el usuario todavía está escribiendo.
        return () => {
            clearTimeout(handler);
        };
    }, [inputValue, delay]); // Solo se vuelve a ejecutar si el valor del input o el delay cambian.

    return [inputValue, setInputValue, debouncedValue];
};
