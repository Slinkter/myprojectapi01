/**
 * @file httpClient.js
 * @description Wrapper genérico para la API Fetch nativa.
 * Estandariza cabeceras, formatea payloads JSON, gestiona códigos de error HTTP y captura cancelaciones.
 */

import { ApiError } from "./ApiError";
import { log } from "@/shared/logger/logger";

/**
 * Ejecuta una petición HTTP asíncrona.
 *
 * @async
 * @function httpClient
 * @param {string} url - Dirección URL de destino.
 * @param {RequestInit} [options={}] - Opciones de configuración para Fetch.
 * @throws {ApiError} Lanza ApiError si el estado de respuesta no es OK (2xx) o si falla la conexión.
 * @returns {Promise<any|null>} Promesa que resuelve al objeto JSON parseado o nulo si no es JSON.
 *
 * @example
 * ```typescript
 * const data = await httpClient('https://api.github.com/users/octocat');
 * console.log(data.login);
 * ```
 */
export const httpClient = async (url, options = {}) => {
  log.flow("fetch");

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      log.redux("HTTP Error", { status: response.status, url });
      throw new ApiError(
        `Error HTTP: ${response.status} ${response.statusText}`,
        response.status,
      );
    }

    console.log(response);

    // Validar que la respuesta sea JSON antes de intentar parsearla.
    // Esto evita errores fatales de parseo si el servidor devuelve HTML o contenido vacío.
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      log.flow("success");
      return data;
    }

    log.flow("success");
    return null;
  } catch (error) {
    if (error.name === "AbortError") {
      log.effect("Fetch Aborted");
      throw error;
    }

    if (error instanceof ApiError) throw error;

    throw new ApiError(error.message || "La petición de red ha fallado", 0);
  }
};
