import { describe, it, expect } from "vitest";
import { userAdapter, usersCollectionAdapter } from "./adapter";

describe("userAdapter", () => {
  it("should adapt raw GitHub user data correctly", () => {
    const rawUser = {
      id: 12345,
      login: "testuser",
      avatar_url: "https://example.com/avatar.png",
      html_url: "https://github.com/testuser",
      type: "User",
      name: "Test User",
      bio: "Software developer",
      public_repos: 10,
      followers: 100,
      following: 50,
      public_gists: 2,
      location: "San Francisco",
      blog: "https://testuser.dev",
    };

    const adapted = userAdapter(rawUser);

    expect(adapted).toEqual({
      id: 12345,
      username: "testuser",
      name: "Test User",
      photo: "https://example.com/avatar.png",
      profileUrl: "https://github.com/testuser",
      type: "User",
      bio: "Software developer",
      repos: 10,
      followers: 100,
      following: 50,
      gists: 2,
      location: "San Francisco",
      website: "https://testuser.dev",
      origin: "github",
    });
  });

  it("should fallback name to login if name is null", () => {
    const rawUser = {
      id: 12345,
      login: "testuser",
      avatar_url: "https://example.com/avatar.png",
      html_url: "https://github.com/testuser",
      type: "User",
      name: null,
      bio: null,
      public_repos: 0,
      followers: 0,
      following: 0,
      public_gists: 0,
      location: null,
      blog: null,
    };

    const adapted = userAdapter(rawUser);
    expect(adapted.name).toBe("testuser");
    expect(adapted.bio).toBe("");
    expect(adapted.location).toBe("");
    expect(adapted.website).toBe("");
  });

  it("should adapt a list of raw users correctly using usersCollectionAdapter", () => {
    const rawList = [
      {
        id: 1,
        login: "user1",
        avatar_url: "https://example.com/1.png",
        html_url: "https://github.com/user1",
      },
      {
        id: 2,
        login: "user2",
        avatar_url: "https://example.com/2.png",
        html_url: "https://github.com/user2",
      }
    ];

    const adaptedList = usersCollectionAdapter(rawList);
    expect(adaptedList).toHaveLength(2);
    expect(adaptedList[0].username).toBe("user1");
    expect(adaptedList[1].username).toBe("user2");
  });
});
