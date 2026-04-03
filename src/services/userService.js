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

import { usersCollectionAdapter, userAdapter } from "@/models/adapters/userAdapter";
import { API_BASE_URL } from "@/app/config";
import { ApiError } from "@/models/errors/ApiError";

/** @typedef {import('@/models/types/user').UserProfile} UserProfile */

/**
 * Fetches users from the GitHub API
 *
 * @async
 * @function fetchUsersAPI
 * @param {string} [searchTerm=""] - Search term to filter users. If empty, fetches default user list
 * @param {AbortSignal} [signal] - AbortSignal for the fetch request
 * @returns {Promise<UserProfile[]>} Array of standardized user objects
 * @throws {ApiError} When the API response is not OK
 * 
 * @example
 * try {
 *   const users = await fetchUsersAPI("octocat");
 *   console.log(users);
 * } catch (error) {
 *   if (error instanceof ApiError) {
 *     console.error(`API Error ${error.status}: ${error.message}`);
 *   }
 * }
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

    if (error.name === "ApiError") throw error;
    if (error.name === "AbortError") throw error;

    throw new ApiError(error.message || "Network Error", 0);
  }
};

/**
 * Fetches single user detail from the GitHub API
 *
 * @async
 * @function fetchUserDetailAPI
 * @param {string} login - GitHub username
 * @param {AbortSignal} [signal] - AbortSignal for the fetch request
 * @returns {Promise<UserProfile>} Standardized user object
 * @throws {ApiError} When the user is not found or API fails
 * 
 * @example
 * const user = await fetchUserDetailAPI("octocat");
 */
export const fetchUserDetailAPI = async (login, signal) => {
  const url = `${API_BASE_URL}/users/${login}`;

  try {
    const response = await fetch(url, { signal });

    if (!response.ok) {
      throw new ApiError(
        `User not found! status: ${response.status}`,
        response.status,
      );
    }

    const rawUser = await response.json();

    // APPLY ADAPTER PATTERN: Data normalization
    return userAdapter(rawUser);
  } catch (error) {
    console.error(`Service: Failed to fetch user ${login}:`, error);

    if (error.name === "ApiError") throw error;
    if (error.name === "AbortError") throw error;

    throw new ApiError(error.message || "Network Error", 0);
  }
};
