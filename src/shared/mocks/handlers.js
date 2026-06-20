

import { http, HttpResponse } from "msw";


const mockUsers = [
  {
    id: 1,
    login: "mojombo",
    avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
    html_url: "https://github.com/mojombo",
    type: "User",
    name: "Tom Preston-Werner",
    company: "@chatterbugapp, @redwoodjs, @preston-werner-ventures ",
    blog: "http://tom.preston-werner.com",
    location: "San Francisco",
    email: null,
    hireable: null,
    bio: "The quieter you become, the more you are able to hear.",
    twitter_username: "mojombo",
    public_repos: 66,
    public_gists: 62,
    followers: 23927,
    following: 11,
    created_at: "2007-10-20T05:24:19Z",
    updated_at: "2024-02-15T18:43:08Z",
  },
  {
    id: 2,
    login: "defunkt",
    avatar_url: "https://avatars.githubusercontent.com/u/2?v=4",
    html_url: "https://github.com/defunkt",
    type: "User",
    name: "Chris Wanstrath",
    company: null,
    blog: "http://chriswanstrath.com/",
    location: null,
    email: null,
    hireable: null,
    bio: "🍔",
    twitter_username: null,
    public_repos: 107,
    public_gists: 273,
    followers: 21528,
    following: 210,
    created_at: "2007-10-20T05:24:19Z",
    updated_at: "2023-11-01T11:42:01Z",
  },
  {
    id: 3,
    login: "pjhyett",
    avatar_url: "https://avatars.githubusercontent.com/u/3?v=4",
    html_url: "https://github.com/pjhyett",
    type: "User",
    name: "PJ Hyett",
    company: "GitHub, Inc.",
    blog: "https://github.com/pjhyett",
    location: "San Francisco",
    email: null,
    hireable: null,
    bio: "Software developer",
    twitter_username: null,
    public_repos: 8,
    public_gists: 21,
    followers: 8256,
    following: 1,
    created_at: "2008-01-07T17:54:22Z",
    updated_at: "2024-01-10T10:15:33Z",
  },
  {
    id: 4,
    login: "wycats",
    avatar_url: "https://avatars.githubusercontent.com/u/4?v=4",
    html_url: "https://github.com/wycats",
    type: "User",
    name: "Yehuda Katz",
    company: "Tilde, Inc.",
    blog: "http://yehudakatz.com",
    location: "Portland, OR",
    email: null,
    hireable: null,
    bio: "Member of Ember.js, Rust, and TC39",
    twitter_username: "wycats",
    public_repos: 284,
    public_gists: 760,
    followers: 10052,
    following: 12,
    created_at: "2008-01-12T05:38:33Z",
    updated_at: "2024-02-12T14:22:01Z",
  },
  {
    id: 1342004,
    login: "google",
    avatar_url: "https://avatars.githubusercontent.com/u/1342004?v=4",
    html_url: "https://github.com/google",
    type: "Organization",
    name: "Google",
    company: null,
    blog: "https://opensource.google/",
    location: null,
    email: "opensource@google.com",
    hireable: null,
    bio: "Google ❤️ Open Source",
    twitter_username: "GoogleOSS",
    public_repos: 2612,
    public_gists: 0,
    followers: 35142,
    following: 0,
    created_at: "2012-01-18T01:30:18Z",
    updated_at: "2024-03-01T10:00:00Z",
  },
  {
    id: 69631,
    login: "facebook",
    avatar_url: "https://avatars.githubusercontent.com/u/69631?v=4",
    html_url: "https://github.com/facebook",
    type: "Organization",
    name: "Meta",
    company: null,
    blog: "https://opensource.fb.com",
    location: "Menlo Park, California",
    email: null,
    hireable: null,
    bio: "We are working to build community through open source technology. ",
    twitter_username: "MetaOpenSource",
    public_repos: 102,
    public_gists: 0,
    followers: 15420,
    following: 0,
    created_at: "2009-04-02T03:35:22Z",
    updated_at: "2024-02-28T12:00:00Z",
  },
  {
    id: 6154722,
    login: "microsoft",
    avatar_url: "https://avatars.githubusercontent.com/u/6154722?v=4",
    html_url: "https://github.com/microsoft",
    type: "Organization",
    name: "Microsoft",
    company: null,
    blog: "https://opensource.microsoft.com",
    location: "Redmond, WA",
    email: null,
    hireable: null,
    bio: "Open source projects and samples from Microsoft",
    twitter_username: "Microsoft",
    public_repos: 6023,
    public_gists: 0,
    followers: 58210,
    following: 0,
    created_at: "2013-12-10T19:06:48Z",
    updated_at: "2024-03-05T09:00:00Z",
  },
  {
    id: 583231,
    login: "octocat",
    avatar_url: "https://avatars.githubusercontent.com/u/583231?v=4",
    html_url: "https://github.com/octocat",
    type: "User",
    name: "The Octocat",
    company: "@github",
    blog: "https://github.blog",
    location: "San Francisco",
    email: null,
    hireable: null,
    bio: "Testing MSW infrastructure",
    twitter_username: null,
    public_repos: 8,
    public_gists: 8,
    followers: 12798,
    following: 9,
    created_at: "2011-01-25T18:44:36Z",
    updated_at: "2024-01-22T12:13:38Z",
  },
  {
    id: 810438,
    login: "vercel",
    avatar_url: "https://avatars.githubusercontent.com/u/810438?v=4",
    html_url: "https://github.com/vercel",
    type: "Organization",
    name: "Vercel",
    company: null,
    blog: "https://vercel.com",
    location: null,
    email: null,
    hireable: null,
    bio: "Vercel is the platform for frontend developers, providing the speed and reliability innovators need to create at the moment of inspiration.",
    twitter_username: "vercel",
    public_repos: 532,
    public_gists: 0,
    followers: 8400,
    following: 0,
    created_at: "2011-05-26T18:45:51Z",
    updated_at: "2024-03-01T15:30:00Z",
  },
  {
    id: 111111,
    login: "slinkter",
    avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
    html_url: "https://github.com/slinkter",
    type: "User",
    name: "Master Developer",
    company: "Engineering Lab",
    blog: "https://example.com",
    location: "Worldwide",
    email: null,
    hireable: true,
    bio: "Senior Software Engineer specializing in high-fidelity React architectures.",
    twitter_username: "slinkter",
    public_repos: 150,
    public_gists: 45,
    followers: 9999,
    following: 50,
    created_at: "2010-01-01T00:00:00Z",
    updated_at: "2024-06-14T00:00:00Z",
  }
];


export const handlers = [
  

  http.get("https://api.github.com/users", () => {
    

    return HttpResponse.json(mockUsers.slice(0, 10));
  }),

  

  http.get("https://api.github.com/search/users", ({ request }) => {
    

    

    

    const url = new URL(request.url);
    const searchTerm = url.searchParams.get("q")?.toLowerCase() || "";

    const filteredUsers = mockUsers.filter(
      (user) =>
        user.login.toLowerCase().includes(searchTerm) ||
        (user.name && user.name.toLowerCase().includes(searchTerm)), 
    );

    return HttpResponse.json({
      total_count: filteredUsers.length,
      incomplete_results: false,
      items: filteredUsers, 

    });
  }),

  

  http.get("https://api.github.com/users/:login", ({ params }) => {
    

    const { login } = params; 
    const user = mockUsers.find(
      (u) => u.login.toLowerCase() === login.toLowerCase(),
    );

    if (!user) {
      

      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(user);
  }),
];
