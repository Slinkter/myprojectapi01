import { z } from "zod";

/**
 * @file User Schema & Types
 * @description
 * Schema definitions for validation and type inference using Zod.
 */

/**
 * Zod Schema for Raw GitHub User Data
 * Validates the structure exactly as it comes from the API.
 */
export const GitHubUserSchema = z.object({
  id: z.number(),
  login: z.string(),
  avatar_url: z.string().url(),
  html_url: z.string().url(),
  type: z.string().default("User"),
  name: z.string().nullable().optional(),
  bio: z.string().nullable().optional(),
  public_repos: z.number().optional().default(0),
  followers: z.number().optional().default(0),
  following: z.number().optional().default(0),
  public_gists: z.number().optional().default(0),
  location: z.string().nullable().optional(),
  blog: z.string().nullable().optional(),
});

/**
 * @typedef {z.infer<typeof GitHubUserSchema>} RawGitHubUser
 */

/**
 * Standard User Model (Internal Domain)
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
 * @property {string} origin - Data source (e.g., "github")
 */
