/**
 * @file apiFetch.js
 * @description Utilidad base wrapper del método nativo fetch() para realizar peticiones HTTP de red,
 * integrando gestión de errores unificada y cabeceras automáticas.
 */

import { ApiError } from "./ApiError";

/**
 * 🎓 CONCEPTO JUNIOR: Peticiones HTTP y Manejo de AbortController
 * 1. fetch() es la API nativa de JavaScript para realizar consultas HTTP asíncronas. Retorna una Promesa.
 * 2. Si la red cae o el servidor no responde, fetch arroja un error genérico.
 * 3. AbortSignal / AbortError: Si la petición se aborta (ej. porque el usuario cambió de pantalla), 
 *    fetch lanza un 'AbortError'. Debemos propagarlo directamente para avisar a TanStack Query que la petición fue cancelada.
 */

/**
 * Realiza una llamada de red HTTP a un endpoint determinado.
 * 
 * @async
 * @function apiFetch
 * @param {string} url - Dirección del endpoint a consultar.
 * @param {RequestInit} [options={}] - Opciones de configuración de fetch (headers, method, signal, etc.).
 * @returns {Promise<any>} Promesa que resuelve con el cuerpo de la respuesta parseado (JSON o null).
 * @throws {ApiError} Si el código de respuesta no es exitoso (ok === false) o la conexión falla.
 * @throws {DOMException} Si la petición fue abortada (AbortError).
 * 
 * @example
 * ```javascript
 * const data = await apiFetch("https://api.github.com/users/octocat");
 * ```
 */
export const apiFetch = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new ApiError(
        `Error HTTP: ${response.status} ${response.statusText}`,
        response.status,
      );
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      return data;
    }

    return null;
  } catch (error) {
    if (error.name === "AbortError") {
      throw error;
    }

    if (error instanceof ApiError) throw error;

    throw new ApiError(error.message || "La petición de red ha fallado", 0);
  }
};
