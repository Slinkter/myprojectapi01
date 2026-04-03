import { GitHubUserSchema } from "../types/user";

/**
 * @file User Adapter
 * @description
 * Implements the ADAPTER PATTERN (GoF Structural).
 * Transforms validated GitHub API data into a standardized Application Model.
 * Now uses ZOD for runtime schema validation.
 */

/** @typedef {import('../types/user').UserProfile} UserProfile */

/**
 * Adapter for GitHub User Data
 *
 * @param {Object} rawUser - The data exactly as it comes from GitHub
 * @returns {UserProfile} Standardized object for our application
 * @throws {import('zod').ZodError} If rawUser does not match the GitHubUserSchema
 */
export const userAdapter = (rawUser) => {
  // 1. Validate the input data using Zod
  const data = GitHubUserSchema.parse(rawUser);

  // 2. Map to internal domain model
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
 * 
 * @param {Array<Object>} rawUsersList - Array of raw API objects
 * @returns {Array<UserProfile>} Array of standardized objects
 */
export const usersCollectionAdapter = (rawUsersList = []) => {
  return rawUsersList.map(userAdapter);
};
