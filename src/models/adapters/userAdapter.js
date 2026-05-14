import { GitHubUserSchema } from "@/models/types/user";

/**
 * @file User Adapter
 * @description
 * Implements the ADAPTER PATTERN (GoF Structural).
 * Transforms validated GitHub API data into a standardized Application Model.
 * Leverages Zod for runtime schema validation and data integrity.
 */

/** @typedef {import('../types/user').UserProfile} UserProfile */

/**
 * Adapter for GitHub User Data
 *
 * @param {Object} rawUser - The raw data object received from the GitHub API.
 * @returns {UserProfile} Standardized user profile object for the application.
 * @throws {import('zod').ZodError} Thrown if the raw data fails to match the GitHubUserSchema.
 * 
 * @example
 * const rawData = { login: 'octocat', id: 1, ... };
 * try {
 *   const user = userAdapter(rawData);
 *   console.log(user.username); // 'octocat'
 * } catch (error) {
 *   // Handle validation error
 * }
 */
export const userAdapter = (rawUser) => {
  // 1. Validate the input data using Zod
  const data = GitHubUserSchema.parse(rawUser);

  // 2. Map to internal domain model (Domain Object)
  return {
    id: data.id,
    username: data.login,
    name: data.name || data.login,
    photo: data.avatar_url,
    profileUrl: data.html_url,
    type: data.type,
    bio: data.bio || "",
    repos: data.public_repos,
    followers: data.followers,
    following: data.following,
    gists: data.public_gists,
    location: data.location || "",
    website: data.blog || "",
    origin: "github",
  };
};

/**
 * Collection Adapter
 * Transforms a list of raw API user objects into a list of standardized Application Models.
 * 
 * @param {Array<Object>} rawUsersList - Array of raw API user objects.
 * @returns {Array<UserProfile>} Array of standardized user profile objects.
 */
export const usersCollectionAdapter = (rawUsersList = []) => {
  return rawUsersList.map(userAdapter);
};

