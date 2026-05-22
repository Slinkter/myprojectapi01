# AGENTS.md - Agent Coding Guidelines

This document provides guidelines for agents working in this repository.

## Project Overview

React 18 SPA for exploring GitHub user profiles, built with Vite, TanStack Query, and Tailwind CSS v4. Uses Layered Clean Architecture with path aliases (`@/*` maps to `./src/*`). Deploys to GitHub Pages at `/myprojectapi01/`.

---

## Commands

### Build & Development

```bash
pnpm dev          # Start development server (http://localhost:5173)
pnpm build        # Build for production (outputs to dist/)
pnpm preview      # Preview production build
pnpm deploy       # Build and deploy to GitHub Pages
pnpm py           # Build and serve on Python HTTP server (port 5000)
```

### Linting

```bash
pnpm lint         # Run ESLint with all rules enabled
```

### Testing

**Note:** Currently no test framework is configured. To add tests, install Vitest:

```bash
pnpm add -D vitest @vitest/ui jsdom
```

Then add to package.json:
```json
"test": "vitest",
"test:ui": "vitest --ui",
"test:run": "vitest run"
```

To run a single test file when tests are added:
```bash
pnpm vitest run src/application/queries/userQuery.test.js
```

---

## Documentation

The project includes comprehensive documentation in `src/docs/`:

| Document | Description |
|----------|-------------|
| `01-Guia-del-Proyecto.md` | Visión general, casos de uso y requerimientos del sistema |
| `02-Arquitectura-y-Patrones.md` | Capas de la arquitectura limpia y patrones GoF aplicados (Adapter, Facade, Factory) |
| `03-Guia-de-Desarrollo.md` | Guía de setup rápido, pnpm, comandos básicos y flujos de trabajo |
| `GUIA_ESTUDIO.md` | Complete study guide (book format) - learn React from scratch |
| `PRUEBA_TECNICA.md` | Technical interview simulation for practice |
| `SIMULACRO_SCRUM.md` | Simulación completa de proyecto Scrum (roles, sprints, user stories, retrospectivas, daily scrums, velocity, burndown) |

---

## Code Style Guidelines

### General Principles

- Use Layered Clean Architecture (domain, infrastructure, application, presentation)
- Prefer functional components with hooks over class components
- Keep components small and focused on single responsibility
- Use utility-first Tailwind CSS (no custom CSS frameworks like MUI)
- Write JSDoc comments for functions, components, and complex logic

### Imports & Path Aliases

Use `@/*` for absolute imports from `src/`:

```javascript
import UserSearch from "@/presentation/features/users/UserSearch.jsx";
import { fetchUsersAPI } from "@/infrastructure/api/userService.js";
import { useTheme } from "@/application/hooks/useTheme.js";
```

- Use explicit file extensions in imports (`.jsx`, `.js`)
- Order imports: React > external libs > internal aliases > relative

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `UserSearch.jsx`, `ThemeToggle.jsx` |
| Hooks | camelCase, prefix `use` | `useTheme.js`, `useDebouncedSearch.js` |
| Services | camelCase | `userService.js` |
| Adapters | camelCase | `userAdapter.js` |
| Facades | camelCase, suffix `Facade` | `useUserSearchFacade.js` |
| Schemas | camelCase | `userSchema.js` |
| Utilities | camelCase | `cn.js`, `formatDate.js` |

### JSX & React Patterns

```javascript
const App = () => { ... };
export default App;
App.displayName = "App";
```

- Use functional components with arrow functions or `function` declarations
- Use `displayName` for debugging
- Use PropTypes for prop validation (project uses `prop-types` package)

### PropTypes Example

```javascript
import PropTypes from "prop-types";

const UserCard = ({ name, avatar, onSelect }) => { ... };

UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  onSelect: PropTypes.func,
};

UserCard.defaultProps = {
  avatar: "",
  onSelect: () => {},
};
```

### TanStack Query (NOT Redux)

This project uses **TanStack Query** for server state, NOT Redux:

```javascript
import { useQuery } from "@tanstack/react-query";

export const useUserSearchQuery = (searchTerm) => {
  return useQuery({
    queryKey: ['users', searchTerm],
    queryFn: () => fetchUsersAPI(searchTerm),
    enabled: searchTerm.length >= 3,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
```

**Important:**
- Never use Redux Thunks for API fetching
- Use TanStack Query for all server state
- Create Facade hooks to encapsulate query complexity

### Facade Pattern

Create facade hooks that expose clean API to components:

```javascript
// src/application/facades/useUserSearchFacade.js
export const useUserSearchFacade = (searchTerm) => {
  const query = useUserSearchQuery(searchTerm);

  return {
    users: query.data || [],
    isSearching: query.isLoading,
    isEmpty: !query.isLoading && query.data?.length === 0,
    error: query.error,
  };
};
```

---

## Architecture Patterns

### Clean Architecture Structure

```
src/
├── domain/                 # Layer 1: Core business logic
│   ├── schemas/            # Zod schemas (domain rules)
│   ├── adapters/           # Data normalization
│   └── errors/             # Custom application errors
├── infrastructure/         # Layer 2: External frameworks & tech details
│   ├── api/                # HTTP clients & API services
│   ├── logger/             # Semantic logging
│   └── mocks/              # Mock Service Worker (MSW)
├── application/            # Layer 3: Use case coordinators
│   ├── queries/            # TanStack Query hooks
│   ├── facades/            # UI Facades encapsulating logic
│   └── hooks/              # Global React hooks
└── presentation/           # Layer 4: View & visuals
    ├── components/         # Reusable UI (ui/, layout/, common/)
    ├── features/           # Specific modules (users, user-detail)
    └── styles/             # Tailwind CSS global styling
```

### Data Flow

```
Presentation (UI) → Facade Hook → TanStack Query → Adapter + Zod → Service → API
```

---

## Design System — Glassmorphism + Minimalismo

- Use glass utility classes from `index.css`: `glass`, `glass-card`, `glass-card-hover`, `glass-input`, `btn-glass`, `badge`, `divider`
- Theme variables: `bg-bg`, `bg-surface`, `text-text`, `text-text-mute`, `text-accent`, `border-border`, `bg-accent-soft`
- Two themes via CSS variables in `:root` (light) and `.dark`. No conditional classes in JSX.
- Use `rounded-xl` for all glass containers/buttons
- Using Orbitron (headings), Inter (body), JetBrains Mono (technical)

## Tailwind CSS v4

- Use utility-first classes exclusively
- Use semantic class names (describe content, not appearance)
- Use `cn()` utility for conditional classes:

```javascript
import { cn } from "@/lib/utils";

<button className={cn(
  "px-4 py-2 rounded",
  isActive && "bg-accent"
)}>
```

- Follow Tailwind v4 best practices with CSS variables
- **Never use `@apply` with custom classes** (Tailwind v4 limitation)

---

## Zod Validation

Always validate external API data with Zod in the adapter layer:

```javascript
import { z } from "zod";

const GitHubUserSchema = z.object({
  login: z.string(),
  avatar_url: z.string().url(),
  html_url: z.string().url(),
  public_repos: z.number(),
  followers: z.number(),
  following: z.number(),
});

export const userAdapter = (rawData) => {
  const validated = GitHubUserSchema.parse(rawData);
  return {
    username: validated.login,
    photo: validated.avatar_url,
    // ...
  };
};
```

---

## ESLint Rules

- `react-refresh/only-export-components`: Warn on non-component exports
- `jsx-a11y/*`: Accessibility rules enabled
- React hooks rules enabled

Ignore linting for specific lines:
```javascript
// eslint-disable-next-line rule-name
```

---

## JSDoc Usage

Use JSDoc for file-level descriptions, functions, and components:

```javascript
/**
 * Fetches users from the GitHub API
 *
 * @async
 * @function fetchUsersAPI
 * @param {string} [searchTerm=""] - Search term to filter users
 * @returns {Promise<Array<Object>>} Array of user objects
 * @throws {ApiError} Throws ApiError if request fails
 */
```

---

## Before Committing

1. Run `pnpm lint` and fix any warnings/errors
2. Verify build works with `pnpm build`
3. No `console.log` in production code

---

## Important Notes

- **lucide-react version**: v1.7.0 - not all icons available. Use `Globe` instead of `GitHub`.
- **Base path**: `/myprojectapi01/` for GitHub Pages deployment
- **MSW**: Mock Service Worker configured for development API mocking
- **NO Redux**: This project uses TanStack Query, NOT Redux Toolkit
- **Design**: Glassmorphism (`glass-card`, `glass-input`, `btn-glass`) with dual theme (light "Holographic Terminal" / dark "Cyberpunk"). No navbar — UX starts at hero.
