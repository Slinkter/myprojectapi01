# AGENTS.md - Agentic Coding Guidelines

## Project Overview

This is a React 18 + Vite project using JavaScript (JSX). It features a GitHub user search application with dark/light theme support, using Redux Toolkit for state management, React Router for navigation, and Tailwind CSS for styling.

## Build / Lint / Test Commands

### Development
```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview production build
```

### Linting
```bash
pnpm lint         # Run ESLint with all rules enforced
```

### Testing
**Note**: This project does NOT currently have a test framework set up. To add tests:

```bash
# Install Vitest (recommended for Vite projects)
pnpm add -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom

# Add test scripts to package.json:
# "test": "vitest",
# "test:run": "vitest run",
# "test:ui": "vitest --ui"
```

To run a single test file after setting up Vitest:
```bash
pnpm test run src/features/users/UserSearch.test.jsx
# or with coverage
pnpm test run src/features/users/UserSearch.test.jsx --coverage
```

### Deployment
```bash
pnpm predeploy    # Runs pnpm build
pnpm deploy       # Deploys dist folder to GitHub Pages
```

## Code Style Guidelines

### General Rules
- Use JavaScript/JSX (not TypeScript)
- Use ES modules (`import`/`export`, not CommonJS)
- Use functional components with hooks, not class components
- Use named exports for components

### Imports
- Use path alias `@/` for imports from `src/` directory
- Order imports: React/framework → external libraries → internal components/hooks → styles
- Group imports with blank lines between groups
```jsx
// Good
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IconButton } from "@material-tailwind/react";
import { MdDarkMode } from "react-icons/md";

import UserSearch from "@/features/users/UserSearch";
import { setSearchQuery } from "@/features/users/userSlice";
import "@/index.css";
```

### Formatting
- Use 2 spaces for indentation
- Use double quotes for strings in JSX, single quotes elsewhere
- Add trailing commas in multiline objects/arrays
- Maximum line length: 100 characters (soft limit)
- Use template literals for string interpolation

### Component Structure
```jsx
/**
 * @file Component Name
 * @description Brief description of what this component does
 */

// JSDoc for component
/**
 * Component Name
 * @component
 * @description Detailed description
 * @param {Object} props - Component props
 * @param {string} props.propName - Description
 * @returns {JSX.Element} Description
 */
export const ComponentName = ({ propName }) => {
  // Hooks first
  // State/effects
  // Handlers
  // Render

  return <div>...</div>;
};

ComponentName.propTypes = {
  propName: PropTypes.string.isRequired,
};
```

### Naming Conventions
- **Components**: PascalCase (`UserSearch`, `ThemeToggle`)
- **Files**: PascalCase for components (`.jsx`), camelCase otherwise (`userSlice.js`, `useTheme.js`)
- **Hooks**: camelCase starting with `use` (`useTheme`, `useAuth`)
- **Constants**: UPPER_SNAKE_CASE
- **CSS Classes**: kebab-case (Tailwind classes)

### Props and PropTypes
- Always define PropTypes for component props
- Use `isRequired` for required props
```jsx
MyComponent.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
  })),
  onSelect: PropTypes.func,
};
```

### State Management (Redux)
- Use Redux Toolkit (`@reduxjs/toolkit`)
- Create slices in `src/features/[feature]/[feature]Slice.js`
- Use `createAsyncThunk` for async operations
- Use selectors with `useSelector` for reading state
```jsx
const users = useSelector((state) => state.users.items);
const dispatch = useDispatch();
dispatch(fetchUsers());
```

### React Router
- Use React Router v7 patterns
- Define routes in `App.jsx` using `<Routes>` and `<Route>`
- Use dynamic segments: `/user/:login`

### Tailwind CSS
- Use Tailwind utility classes
- Use `clsx` or template literals for conditional classes
- Follow custom theme colors defined in `tailwind.config.cjs`
- Use `dark:` prefix for dark mode variants

### Error Handling
- Use try/catch for async operations
- Display errors with `ErrorDisplay` component
- Use error boundaries for component-level errors

### Accessibility
- Use semantic HTML elements
- Add `aria-label` for icon-only buttons
- Ensure keyboard navigation works
- Use proper heading hierarchy

### File Organization
```
src/
├── app/           # Redux store configuration
├── components/   # Reusable UI components
│   ├── layout/   # Layout components (Header, Footer)
│   └── ui/       # UI primitives (Button, Input)
├── features/     # Feature-based modules with slice + components
├── hooks/        # Custom hooks
├── services/     # API services
└── docs/         # Documentation
```
