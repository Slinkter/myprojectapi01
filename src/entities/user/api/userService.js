/**
 * @file userService.js
 * @description Service layer module for handling external data communication with the GitHub REST API.
 * Integrates HttpClient, manages custom API errors, and normalizes responses through data adapters.
 */

import {
  usersCollectionAdapter,
  userAdapter,
} from "@/entities/user/model/adapter";
import { API_BASE_URL } from "@/shared/config/config";
import { httpClient } from "@/shared/api/httpClient";
import { ApiError } from "@/shared/api/ApiError";
import { ZodError } from "zod";

/** @typedef {import('@/entities/user/model/schema').UserProfile} UserProfile */

/**
 * Fetch and search GitHub user collections.
 * Maps API search endpoints or fallback listing endpoints to adapted domain models.
 *
 * @async
 * @function fetchUsersAPI
 * @param {string} [searchTerm=""] - Term used to filter users on GitHub.
 * @param {AbortSignal} [signal] - Optional abort signal for fetch request cancellation.
 * @throws {ApiError} Throws ApiError if HTTP request fails or validation checks mismatch.
 * @returns {Promise<UserProfile[]>} Promise resolving to normalized collection of user profiles.
 */
export const fetchUsersAPI = async (searchTerm = "", signal) => {
  const url = searchTerm
    ? `${API_BASE_URL}/search/users?q=${encodeURIComponent(searchTerm)}`
    : `${API_BASE_URL}/users`;

  try {
    const data = await httpClient(url, { signal });
    const rawUsers = searchTerm ? data.items : data;

    return usersCollectionAdapter(rawUsers);
  } catch (error) {
    console.error("Service: fetchUsersAPI execution failed:", error);

    if (error instanceof ApiError) throw error;
    if (error instanceof ZodError) {
      throw new ApiError(`Data Validation Error: ${error.message}`, 422);
    }

    throw error;
  }
};

/**
 * Fetch detailed profiles of an individual GitHub user.
 *
 * @async
 * @function fetchUserDetailAPI
 * @param {string} login - GitHub handle of the target user.
 * @param {AbortSignal} [signal] - Optional abort signal for request cancellation.
 * @throws {ApiError} Throws ApiError on network failure or model validation mismatch.
 * @returns {Promise<UserProfile>} Promise resolving to a single normalized user profile.
 */
export const fetchUserDetailAPI = async (login, signal) => {
  const url = `${API_BASE_URL}/users/${login}`;

  try {
    const rawUser = await httpClient(url, { signal });

    return userAdapter(rawUser);
  } catch (error) {
    console.error(`Service: fetchUserDetailAPI for "${login}" failed:`, error);

    if (error instanceof ApiError) throw error;
    if (error instanceof ZodError) {
      throw new ApiError(`Data Validation Error: ${error.message}`, 422);
    }

    throw error;
  }
};
