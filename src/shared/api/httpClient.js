/**
 * @file httpClient.js
 * @description Generic wrapper around the native Fetch API.
 * Standardizes headers, formats JSON payloads, handles HTTP error codes, and catches cancellations.
 */

import { ApiError } from "./ApiError";
import { log } from "@/shared/logger/logger";

/**
 * Execute an asynchronous HTTP fetch request.
 *
 * @async
 * @function httpClient
 * @param {string} url - Target URL address.
 * @param {RequestInit} [options={}] - Fetch configuration options.
 * @throws {ApiError} Throws ApiError if response status is not OK (2xx) or connection drops.
 * @returns {Promise<any>} Promise resolving to parsed JSON object or null.
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

    throw new ApiError(error.message || "Network request failed", 0);
  }
};
