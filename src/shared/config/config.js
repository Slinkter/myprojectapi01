/**
 * @file config.js
 * @description Constantes de configuración global de la aplicación.
 * Centralizar estos valores evita "Magic Numbers" o "Strings Mágicos" repetidos por el código.
 */

/**
 * 🎓 CONCEPTO JUNIOR: Magic Numbers
 * Si escribes `5 * 60 * 1000` suelto en un archivo de React, otro desarrollador que lo lea no sabrá qué significa.
 * Extraer estos valores aquí con nombres en MAYÚSCULA (convención para constantes inmutables globales) 
 * hace el código mucho más fácil de leer, debugear y modificar en un solo lugar.
 */

/**
 * Tiempo en milisegundos que TanStack Query considerará la data como "fresca".
 * Durante este tiempo no hará peticiones en background aunque cambies de pestaña.
 * Calculado: 5 minutos.
 * @constant {number}
 */
export const STALE_TIME = 5 * 60 * 1000;

/**
 * Tiempo de recolección de basura (Garbage Collection Time).
 * Si un componente se desmonta, su data en caché se borrará después de este tiempo para liberar RAM.
 * Calculado: 10 minutos.
 * @constant {number}
 */
export const GC_TIME = 10 * 60 * 1000;

/**
 * Retraso para el sistema de Anti-rebote (Debounce) en el input de búsqueda.
 * @constant {number}
 */
export const DEBOUNCE_DELAY = 500;

/**
 * Ruta raíz de la API a la que nos conectamos.
 * Cambiando esto podemos apuntar a un servidor de Staging, Producción o Desarrollo fácilmente.
 * @constant {string}
 */
export const API_BASE_URL = "https://api.github.com";
