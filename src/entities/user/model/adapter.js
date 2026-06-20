import { GitHubUserSchema } from "@/entities/user/model/schema";

export const usersCollectionAdapter = (rawUsersList = []) => {
  const result = rawUsersList.map(userAdapter);
  return result;
};

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
