/**
 * @file User Service
 * @description
 * Service layer for interacting with the GitHub Users API.
 * Provides functions to fetch user data with proper error handling.
 *
 * API Endpoints:
 * - Search: https://api.github.com/search/users?q={searchTerm}
 * - Default List: https://api.github.com/users
 */

/**
 * Base URL for GitHub API
 * @constant {string}
 */
const API_BASE_URL = "https://api.github.com";

/**
 * Custom error class for API-related errors
 *
 * @class ApiError
 * @extends Error
 * @description
 * Provides structured error information including HTTP status codes.
 * Used to differentiate API errors from generic JavaScript errors.
 *
 * @property {string} message - Error message
 * @property {number} status - HTTP status code
 * @property {string} name - Error name (always "ApiError")
 *
 * @example
 * throw new ApiError('Not Found', 404);
 */
class ApiError extends Error {
  /**
   * Creates an ApiError instance
   *
   * @param {string} message - Error message
   * @param {number} status - HTTP status code
   */
  constructor(message, status) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

import { usersCollectionAdapter } from "@/models/adapters/userAdapter";

/**
 * Fetches users from the GitHub API
 *
 * @async
 * @function fetchUsersAPI
 * @param {string} [searchTerm=""] - Search term to filter users. If empty, fetches default user list
 * @returns {Promise<Array<Object>>} Array of standardized user objects
 */
export const fetchUsersAPI = async (searchTerm = "", signal) => {
  const url = searchTerm
    ? `${API_BASE_URL}/search/users?q=${encodeURIComponent(searchTerm)}`
    : `${API_BASE_URL}/users`;

  try {
    const response = await fetch(url, { signal });

    if (!response.ok) {
      throw new ApiError(
        `HTTP error! status: ${response.status}`,
        response.status,
      );
    }

    const data = await response.json();
    const rawUsers = searchTerm ? data.items : data;

    // APPLY ADAPTER PATTERN: Data normalization
    return usersCollectionAdapter(rawUsers);
  } catch (error) {
    // Log the error for debugging purposes (could be connected to a logging service)
    console.error("Service: Failed to fetch users:", error);
    throw error;
  }
};
