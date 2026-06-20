import { ApiError } from "./ApiError";

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
    //
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
