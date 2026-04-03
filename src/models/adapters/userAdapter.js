/**
 * @file User Adapter
 * @description
 * Implements the ADAPTER PATTERN (GoF Structural).
 * Transforms raw GitHub API data into a standardized Application Model.
 * This protects the UI from changes in the external API structure.
 */

/** @typedef {import('../types/user').UserProfile} UserProfile */

/**
 * Adapter for GitHub User Data
 *
 * @param {Object} rawUser - The data exactly as it comes from GitHub
 * @returns {UserProfile} Standardized object for our application
 * @example
 * const user = userAdapter(apiResponse);
 */
export const userAdapter = (rawUser) => {

  return {
    id: rawUser.id,
    username: rawUser.login, // Mapping 'login' -> 'username'
    name: rawUser.name || rawUser.login,
    photo: rawUser.avatar_url, // Mapping 'avatar_url' -> 'photo'
    profileUrl: rawUser.html_url, // Mapping 'html_url' -> 'profileUrl'
    type: rawUser.type || "User",
    bio: rawUser.bio || "",
    repos: rawUser.public_repos || 0,
    followers: rawUser.followers || 0,
    following: rawUser.following || 0,
    gists: rawUser.public_gists || 0,
    location: rawUser.location || "",
    website: rawUser.blog || "",
    origin: "github" // Metadata to know the source
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
