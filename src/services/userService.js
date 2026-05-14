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
import { httpClient } from "@/lib/httpClient";
import { ApiError } from "@/models/errors/ApiError";
import { ZodError } from "zod";

/** @typedef {import('@/models/types/user').UserProfile} UserProfile */

/**
 * Fetches users from the GitHub API
 *
 * @async
 * @function fetchUsersAPI
 * @param {string} [searchTerm=""] - Search term to filter users. If empty, fetches default user list
 * @param {AbortSignal} [signal] - AbortSignal for the fetch request
 * @returns {Promise<UserProfile[]>} Array of standardized user objects
 * @throws {ApiError} When the API response is not OK or data validation fails
 */
export const fetchUsersAPI = async (searchTerm = "", signal) => {
  const url = searchTerm
    ? `${API_BASE_URL}/search/users?q=${encodeURIComponent(searchTerm)}`
    : `${API_BASE_URL}/users`;

  try {
    const data = await httpClient(url, { signal });
    const rawUsers = searchTerm ? data.items : data;

    // APPLY ADAPTER PATTERN: Data normalization + Zod Validation
    return usersCollectionAdapter(rawUsers);
  } catch (error) {
    console.error("Service: Failed to fetch users:", error);

    if (error instanceof ApiError) throw error;
    if (error instanceof ZodError) {
      throw new ApiError(`Data Validation Error: ${error.message}`, 422);
    }
    
    throw error;
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
 * @throws {ApiError} When the user is not found, API fails, or data validation fails
 */
export const fetchUserDetailAPI = async (login, signal) => {
  const url = `${API_BASE_URL}/users/${login}`;

  try {
    const rawUser = await httpClient(url, { signal });

    // APPLY ADAPTER PATTERN: Data normalization + Zod Validation
    return userAdapter(rawUser);
  } catch (error) {
    console.error(`Service: Failed to fetch user ${login}:`, error);

    if (error instanceof ApiError) throw error;
    if (error instanceof ZodError) {
      throw new ApiError(`Data Validation Error: ${error.message}`, 422);
    }
    
    throw error;
  }
};


