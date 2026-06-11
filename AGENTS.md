# AGENTS.md - Agent Coding Guidelines

This document provides guidelines for agents working in this repository.

## Project Overview

React 18 SPA for exploring GitHub user profiles, built with Vite, TanStack Query, and Tailwind CSS v4. Uses Feature-Sliced Design (FSD) architecture with path aliases (`@/*` maps to `./src/*`). Deploys to GitHub Pages at `/myprojectapi01/`.

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

```bash
pnpm test         # Run tests in interactive mode
pnpm test:run     # Run all unit tests once using Vitest
```

---

## Documentation

The project includes comprehensive documentation in `src/docs/`:

| Document | Description |
|----------|-------------|
| `01-Guia-del-Proyecto.md` | Visión general, casos de uso y requerimientos del sistema |
| `02-Arquitectura-y-Patrones.md` | Capas de la arquitectura FSD y patrones GoF aplicados (Adapter, Facade, Factory) |
| `03-Guia-de-Desarrollo.md` | Guía de setup rápido, pnpm, comandos básicos y flujos de trabajo en FSD |
| `GUIA_ESTUDIO.md` | Complete study guide (book format) - learn React from scratch |
| `PRUEBA_TECNICA.md` | Technical interview simulation for practice |
| `SIMULACRO_SCRUM.md` | Simulación completa de proyecto Scrum |

---

## Code Style Guidelines

### General Principles

- Use Feature-Sliced Design (FSD) layers: `app`, `pages`, `widgets`, `features`, `entities`, `shared`.
- Prefer functional components with hooks over class components.
- Keep components small and focused on single responsibility.
- Use utility-first Tailwind CSS.
- Write JSDoc comments for functions, components, and complex logic.

### Imports & Path Aliases

Use `@/*` for absolute imports from `src/`:

```javascript
import { SearchResults } from "@/widgets/search-results";
import { useUserSearchFacade } from "@/features/search-user";
import { useTheme } from "@/shared";
```

- Always import from the public API (`index.js`) of slices/layers to respect FSD encapsulation.
- Explicitly use `.jsx` and `.js` extensions where applicable.

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `UserCard.jsx`, `ThemeToggle.jsx` |
| Hooks | camelCase, prefix `use` | `useTheme.js`, `useDebouncedSearch.js` |
| Services | camelCase | `userService.js` |
| Adapters | camelCase | `adapter.js` |
| Facades | camelCase | `useUserSearchFacade.js` |
| Schemas | camelCase | `schema.js` |
| Utilities | camelCase | `utils.js` |

---

## Architecture Patterns

### FSD Structure

```
src/
├── app/                    # Initialization (routes, entry point, global styles)
├── pages/                  # Page layouts composing widgets
├── widgets/                # Autonomous UI blocks composing features and entities
├── features/               # Interactive actions with business value (facades, search bar)
├── entities/               # Core business concepts (user data, adapter, card, query hook)
└── shared/                 # Generic code, helpers, configurations, API client, theme styles
```

### Data Flow

```
Page ➔ Widget ➔ Feature (Facade) ➔ Entity (Query Hook ➔ Adapter/Zod ➔ Service) ➔ Shared (httpClient) ➔ API
```

---

## Design System — Glassmorphism + Minimalismo

- Use glass utility classes: `glass`, `glass-card`, `glass-card-hover`, `glass-input`, `btn-glass`, `badge`, `divider`.
- Theme variables: `bg-bg`, `bg-surface`, `text-text`, `text-text-mute`, `text-accent`, `border-border`, `bg-accent-soft`.
- Typography: **Inter** is used exclusively for all texts, headings, and code. Fallback to system fonts like `-apple-system, BlinkMacSystemFont` on Apple devices.

---

## Zod Validation

Always validate external API data with Zod in the adapter layer:

```javascript
import { z } from "zod";

export const GitHubUserSchema = z.object({
  id: z.number(),
  login: z.string(),
  avatar_url: z.string().url(),
  html_url: z.string().url(),
});

export const userAdapter = (rawData) => {
  const validated = GitHubUserSchema.parse(rawData);
  return {
    id: validated.id,
    username: validated.login,
    photo: validated.avatar_url,
  };
};
```
