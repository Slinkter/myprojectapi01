import { z } from "zod";

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
