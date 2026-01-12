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

/**
 * Fetches users from the GitHub API
 *
 * @async
 * @function fetchUsersAPI
 * @param {string} [searchTerm=""] - Search term to filter users. If empty, fetches default user list
 * @returns {Promise<Array<Object>>} Array of user objects
 * @throws {ApiError} Throws ApiError with status code and message if request fails
 * @throws {Error} Throws generic Error for network failures
 *
 * @description
 * Makes HTTP request to GitHub API to fetch users.
 * - With searchTerm: Uses search endpoint and returns data.items
 * - Without searchTerm: Uses default users endpoint and returns data directly
 *
 * Response Structure (per user):
 * - login: string - GitHub username
 * - id: number - User ID
 * - avatar_url: string - Profile picture URL
 * - html_url: string - Profile page URL
 * - type: string - User type (User, Organization)
 *
 * @example
 *   Fetch default users
 * const users = await fetchUsersAPI();
 *
 * @example
 *   Search for specific users
 * const results = await fetchUsersAPI('octocat');
 */
export const fetchUsersAPI = async (searchTerm = "") => {
  const url = searchTerm
    ? `${API_BASE_URL}/search/users?q=${encodeURIComponent(searchTerm)}`
    : `${API_BASE_URL}/users`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new ApiError(
        `HTTP error! status: ${response.status}`,
        response.status
      );
    }

    const data = await response.json();

    // The GitHub search API returns users in an `items` property.
    // The default users endpoint returns an array directly.
    return searchTerm ? data.items : data;
  } catch (error) {
    // Log the error for debugging purposes (could be connected to a logging service)
    console.error("Service: Failed to fetch users:", error);
    throw error;
  }
};
