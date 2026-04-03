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
 * @property {string} name - Real name
 * @property {string} photo - URL to profile picture
 * @property {string} profileUrl - URL to GitHub profile
 * @property {string} type - User or Organization
 * @property {string} bio - User biography
 * @property {number} repos - Count of public repositories
 * @property {number} followers - Count of followers
 * @property {number} following - Count of following
 * @property {number} gists - Count of public gists
 * @property {string} location - User location
 * @property {string} website - User blog or website
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
