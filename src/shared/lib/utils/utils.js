/**
 * @file utils.js
 * @description Utilidades transversales e independientes de la aplicación.
 */

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utilidad maestra para fusionar clases de Tailwind CSS limpiamente.
 * Resuelve dos problemas críticos al construir componentes React reusables:
 * 1. Condicionales: Permite usar sintaxis limpia (objetos, booleanos) gracias a `clsx`.
 * 2. Colisiones de clases de Tailwind: Evita que "p-2 p-4" se apliquen juntas rompiendo 
 *    el CSS; `twMerge` asegura que la última clase equivalente gane de forma determinista.
 * 
 * @complexity
 * - Tiempo: O(M) - Tiempo lineal respecto al total de cadenas a procesar.
 * - Espacio: O(M) - Espacio lineal para contener la cadena final construida.
 * 
 * @function cn
 * @param {...(string|Object|boolean|null|undefined)} inputs - Nombres de clases o configuraciones condicionales estilo clsx.
 * @returns {string} Cadena final de clases limpiada y libre de colisiones.
 * 
 * @example
 * ```typescript
 * // El componente recibirá "p-4 bg-red-500" en caso de error, 
 * // sobreescribiendo el "p-2 bg-blue-500" base sin conflicto en CSS.
 * const className = cn("p-2 bg-blue-500", isError && "p-4 bg-red-500");
 * ```
 */
export function cn(...inputs) {
  // Primero procesamos las condiciones lógicas, luego fusionamos las utilidades de Tailwind.
  return twMerge(clsx(inputs));
}
