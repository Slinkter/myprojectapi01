/**
 * @file httpClient.js
 * @description
 * Envoltorio (wrapper) genérico alrededor de la API Fetch para centralizar lógica común como:
 * - Verificación de estados de respuesta
 * - Parseo de JSON
 * - Manejo genérico de errores
 */

import { ApiError } from "./ApiError";
import { log } from "@/shared/logger/logger";

/**
 * Perform an HTTP request
 *
 * @async
 * @function httpClient
 * @param {string} url - Target URL
 * @param {Object} [options={}] - Fetch options
 * @returns {Promise<any>} Parsed JSON response
 * @throws {ApiError} If the request fails or returns a non-OK status
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
        `HTTP Error: ${response.status} ${response.statusText}`,
        response.status,
      );
    }

    // Handle empty responses
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

    // Handle network or other errors
    throw new ApiError(error.message || "Network request failed", 0);
  }
};
