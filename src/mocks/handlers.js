import { http, HttpResponse } from 'msw';

const mockUsers = [
  {
    id: 1,
    login: 'mojombo',
    avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
    html_url: 'https://github.com/mojombo',
    type: 'User',
    name: 'Tom Preston-Werner',
    company: '@chatterbugapp, @redwoodjs, @preston-werner-ventures ',
    blog: 'http://tom.preston-werner.com',
    location: 'San Francisco',
    email: null,
    hireable: null,
    bio: 'The quieter you become, the more you are able to hear.',
    twitter_username: 'mojombo',
    public_repos: 66,
    public_gists: 62,
    followers: 23927,
    following: 11,
    created_at: '2007-10-20T05:24:19Z',
    updated_at: '2024-02-15T18:43:08Z'
  },
  {
    id: 2,
    login: 'defunkt',
    avatar_url: 'https://avatars.githubusercontent.com/u/2?v=4',
    html_url: 'https://github.com/defunkt',
    type: 'User',
    name: 'Chris Wanstrath',
    bio: '🍔',
    public_repos: 107,
    public_gists: 273,
    followers: 22137,
    following: 214,
    location: 'San Francisco',
    blog: 'http://chriswanstrath.com/',
  },
  {
    id: 3,
    login: 'pjhyett',
    avatar_url: 'https://avatars.githubusercontent.com/u/3?v=4',
    html_url: 'https://github.com/pjhyett',
    type: 'User',
    name: 'PJ Hyett',
    bio: 'Software engineer',
    public_repos: 8,
    public_gists: 21,
    followers: 8312,
    following: 1,
    location: 'San Francisco',
    blog: 'https://pjhyett.com',
  },
  {
    id: 4,
    login: 'wycats',
    avatar_url: 'https://avatars.githubusercontent.com/u/4?v=4',
    html_url: 'https://github.com/wycats',
    type: 'User',
    name: 'Yehuda Katz',
    bio: 'Software engineer',
    public_repos: 284,
    public_gists: 760,
    followers: 10123,
    following: 4,
    location: 'Portland, OR',
    blog: 'http://yehudakatz.com',
  },
  {
    id: 5,
    login: 'ezmobius',
    avatar_url: 'https://avatars.githubusercontent.com/u/5?v=4',
    html_url: 'https://github.com/ezmobius',
    type: 'User',
    name: 'Ezra Zygmuntowicz',
    bio: 'Software engineer',
    public_repos: 22,
    public_gists: 92,
    followers: 2541,
    following: 12,
    location: 'Portland, OR',
    blog: 'http://ezmobius.com',
  },
  {
    id: 583231,
    login: 'octocat',
    avatar_url: 'https://avatars.githubusercontent.com/u/583231?v=4',
    html_url: 'https://github.com/octocat',
    type: 'User',
    name: 'The Octocat',
    company: '@github',
    blog: 'https://github.blog',
    location: 'San Francisco',
    email: null,
    hireable: null,
    bio: 'Testing MSW infrastructure',
    twitter_username: null,
    public_repos: 8,
    public_gists: 8,
    followers: 12798,
    following: 9,
    created_at: '2011-01-25T18:44:36Z',
    updated_at: '2024-01-22T12:13:38Z'
  }
];

export const handlers = [
  // GET /users
  http.get('https://api.github.com/users', () => {
    return HttpResponse.json(mockUsers.slice(0, 5));
  }),

  // GET /search/users?q=...
  http.get('https://api.github.com/search/users', ({ request }) => {
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get('q')?.toLowerCase() || '';
    
    const filteredUsers = mockUsers.filter(user => 
      user.login.toLowerCase().includes(searchTerm) || 
      (user.name && user.name.toLowerCase().includes(searchTerm))
    );

    return HttpResponse.json({
      total_count: filteredUsers.length,
      incomplete_results: false,
      items: filteredUsers
    });
  }),

  // GET /users/:login
  http.get('https://api.github.com/users/:login', ({ params }) => {
    const { login } = params;
    const user = mockUsers.find(u => u.login.toLowerCase() === login.toLowerCase());

    if (!user) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(user);
  }),
];
