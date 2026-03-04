/**
 * @file User Adapter
 * @description 
 * Implements the ADAPTER PATTERN (GoF Structural).
 * Transforms raw GitHub API data into a standardized Application Model.
 * This protects the UI from changes in the external API structure.
 */

/**
 * Standard User Model
 * @typedef {Object} UserProfile
 * @property {number} id - Unique identifier
 * @property {string} username - Display name/handle
 * @property {string} photo - URL to profile picture
 * @property {string} profileUrl - URL to GitHub profile
 * @property {string} type - User or Organization
 */

/**
 * Adapter for GitHub User Data
 * 
 * @param {Object} rawUser - The data exactly as it comes from GitHub
 * @returns {UserProfile} Standardized object for our application
 */
export const userAdapter = (rawUser) => {
  return {
    id: rawUser.id,
    username: rawUser.login, // Mapping 'login' -> 'username'
    photo: rawUser.avatar_url, // Mapping 'avatar_url' -> 'photo'
    profileUrl: rawUser.html_url, // Mapping 'html_url' -> 'profileUrl'
    type: rawUser.type || "User",
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
