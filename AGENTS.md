# AGENTS.md - Agent Coding Guidelines

This document provides guidelines for agents working in this repository.

## Project Overview

A React 18 SPA for exploring GitHub user profiles, built with Vite, Redux Toolkit, and Tailwind CSS v4. Uses Feature-Sliced Design (FSD) architecture with path aliases (`@/*` maps to `./src/*`).

---

## Commands

### Build & Development

```bash
pnpm dev        # Start development server
pnpm build      # Build for production
pnpm preview    # Preview production build
pnpm deploy     # Build and deploy to GitHub Pages (gh-pages)
```

### Linting

```bash
pnpm lint       # Run ESLint with all rules enabled
```

ESLint config extends: `eslint:recommended`, `react/recommended`, `react/jsx-runtime`, `react-hooks/recommended`, `jsx-a11y/recommended`.

**Note:** There are currently no test commands configured.

---

## Code Style Guidelines

### General Principles

- Use Feature-Sliced Design (FSD) architecture
- Prefer functional components with hooks over class components
- Keep components small and focused on single responsibility
- Use utility-first Tailwind CSS (no custom CSS frameworks like MUI)
- Write JSDoc comments for functions, components, and complex logic

### Imports & Path Aliases

Use `@/*` for absolute imports from `src/`:

```javascript
import UserSearch from "@/features/users/UserSearch.jsx";
import { fetchUsersAPI } from "@/services/userService";
import { useTheme } from "@/hooks/useTheme.js";
```

### Naming Conventions

- **Components**: PascalCase (e.g., `UserSearch.jsx`, `ThemeToggle.jsx`)
- **Hooks**: camelCase starting with `use` (e.g., `useTheme.js`, `useDebouncedSearch.js`)
- **Services**: camelCase (e.g., `userService.js`)
- **Slices**: camelCase (e.g., `usersSlice.js`)
- **Files**: Match the main export name

### JSX & React Patterns

- Use functional components with arrow functions or `function` declarations
- Always use `displayName` for components when helpful for debugging
- Use PropTypes for component prop validation (project uses `prop-types` package)
- Use explicit file extensions in imports (`.jsx`, `.js`)

```javascript
const App = () => { ... };
export default App;
App.displayName = "App";
```

### Redux Toolkit

- Use `createSlice` for synchronous state
- Use `createAsyncThunk` for async operations
- Handle all three states: `pending`, `fulfilled`, `rejected`
- Use `rejectWithValue` for error handling in thunks

```javascript
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (searchTerm = "", { rejectWithValue, signal }) => {
    try {
      const users = await fetchUsersAPI(searchTerm, signal);
      return users;
    } catch (error) {
      if (error.name === "AbortError") throw error;
      return rejectWithValue({ message: error.message, status: error.status });
    }
  }
);
```

### Error Handling

- Create custom error classes for API errors (see `ApiError` in `src/services/userService.js`)
- Handle `AbortError` separately for request cancellation
- Use try/catch with meaningful error messages
- Log errors appropriately with `console.error`

### Tailwind CSS

- Use utility-first classes exclusively (no custom component libraries)
- Use semantic class names that describe content, not appearance
- Use `cn()` utility pattern for conditional classes (see docs)
- Follow Tailwind v4 best practices from project documentation

### File Structure

```
src/
├── app/           # Store configuration
├── components/   # Reusable UI components (layout, ui)
├── features/      # Domain modules (users, user-detail)
├── hooks/         # Custom hooks
├── services/      # API integrations
└── docs/          # Project documentation
```

---

## ESLint Rules

Key rules enforced:
- `react-refresh/only-export-components`: Warn on non-component exports in component files
- `jsx-a11y/*`: Accessibility rules enabled
- React hooks rules enabled

To ignore linting for specific lines:
```javascript
// eslint-disable-next-line rule-name
```

---

## JSDoc Usage

Use JSDoc for:
- File-level descriptions
- Function documentation with `@param`, `@returns`, `@throws`
- Complex component descriptions
- Custom types/interfaces

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
3. Ensure no console.log statements in production code (except in slice reducers for debugging)
