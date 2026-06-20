/**
 * @file useDebouncedSearch.js
 * @description Hook de utilidad para retrasar la actualización de un valor de estado.
 * Es crítico para evitar realizar peticiones a la API en cada pulsación de tecla (tipeo),
 * ahorrando recursos de red y previniendo el bloqueo por límites de tasa (Rate Limiting).
 */

import { useState, useEffect } from "react";

/**
 * 🎓 CONCEPTO JUNIOR: Debounce (Anti-rebote)
 * Cuando el usuario escribe en un campo de búsqueda, si mandáramos una petición al servidor con cada tecla presionada, 
 * saturaríamos la red y nos bloquearían rápidamente.
 * El "Debounce" es una técnica que retrasa la ejecución de una función hasta que haya pasado un tiempo de inactividad.
 * Si el usuario presiona otra tecla antes de que termine el tiempo de espera, cancelamos el temporizador anterior y creamos uno nuevo.
 * Así, solo se hace una petición cuando el usuario termina de escribir.
 *
 * Hook para implementar "debounce" (retraso/anti-rebote) en valores de estado, 
 * particularmente útil para inputs de búsqueda de texto.
 *
 * @complexity
 * - Tiempo: O(1) - Tiempo constante para programar el timeout.
 * - Espacio: O(1) - Espacio constante para rastrear estados y referencias al temporizador.
 *
 * @function useDebouncedSearch
 * @param {string} [initialValue=""] - Valor inicial del término de búsqueda.
 * @param {number} [delay=500] - Tiempo de retraso en milisegundos antes de actualizar el valor debounced.
 * @returns {[string, function(string): void, string]} Tupla que contiene: [valorActual, setterValorActual, valorDebounced]
 * 
 * @example
 * ```typescript
 * const [text, setText, debouncedText] = useDebouncedSearch("", 300);
 * 
 * // 'text' se usa para el input (actualización inmediata)
 * // 'debouncedText' se usa para la petición de red (actualización retrasada)
 * ```
 */
export const useDebouncedSearch = (initialValue = "", delay = 500) => {
  // Estado que se actualiza inmediatamente (refleja lo que el usuario ve en el input)
  const [searchTerm, setSearchTerm] = useState(initialValue);
  
  // Estado que se actualiza solo después de que el usuario deja de escribir por X milisegundos
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(initialValue);

  useEffect(() => {
    // Configuramos un temporizador. Solo actualizará el debouncedSearchTerm 
    // cuando transcurra el 'delay' estipulado.
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, delay);

    // Función de limpieza (Cleanup function):
    // Si el usuario escribe una nueva letra ANTES de que el temporizador termine,
    // React ejecuta esta función de limpieza destruyendo el temporizador anterior.
    // Esto asegura que solo el *último* tipeo dispare el cambio final.
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, delay]); // Se vuelve a ejecutar cada vez que cambia el término o el retraso

  return [searchTerm, setSearchTerm, debouncedSearchTerm];
};
