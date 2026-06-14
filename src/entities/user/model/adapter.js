/**
 * @file adapter.js
 * @description Data adapter module implementing the GoF Adapter Pattern.
 * Normalizes external API responses into standard internal domain models while enforcing schema validation via Zod.
 */

import { GitHubUserSchema } from "@/entities/user/model/schema";

/** @typedef {import('@/entities/user/model/schema').UserProfile} UserProfile */

/**
 * Transforms raw GitHub user API data into a normalized domain model.
 * Performs runtime validation using Zod schema models.
 *
 * @complexity
 * - Time: O(1) - Constant time mapping of properties and schema parsing.
 * - Space: O(1) - Constant auxiliary memory space.
 * 
 * @function userAdapter
 * @param {Object} rawUser - Untrusted object representation from the external GitHub API.
 * @throws {import('zod').ZodError} Throws if schema validation rules are violated.
 * @returns {UserProfile} Validated and standardized user profile object.
 */
export const userAdapter = (rawUser) => {
  const data = GitHubUserSchema.parse(rawUser);

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
 * Transforms a collection of raw GitHub user objects.
 * Maps individual items sequentially through the user adapter.
 * 
 * @complexity
 * - Time: O(N) - Linear time proportional to the collection size.
 * - Space: O(N) - Linear memory space used to store the newly mapped collection.
 * 
 * @function usersCollectionAdapter
 * @param {Array<Object>} [rawUsersList=[]] - Array containing unparsed user elements.
 * @returns {Array<UserProfile>} Collection of normalized user profiles.
 */
export const usersCollectionAdapter = (rawUsersList = []) => {
  return rawUsersList.map(userAdapter);
};
