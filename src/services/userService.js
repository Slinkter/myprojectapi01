const API_BASE_URL = "https://api.github.com";

/**
 * Custom error class for API errors.
 */
class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

/**
 * Fetches users from the GitHub API.
 *
 * @param {string} [searchTerm=""] - The term to search for. If empty, requests the default users list.
 * @returns {Promise<Array>} A promise that resolves to the array of users.
 * @throws {ApiError} Throws an ApiError with status and message if the request fails.
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
