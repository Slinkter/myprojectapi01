# 🚀 Project Context: API - GitHub Users

This project is a high-performance React engineering artifact designed for exploring the GitHub API, following "Master's Level" software engineering standards, Vercel best practices, and Clean Architecture principles.

## 🏗️ Architecture & Design Patterns

The system is built using an adapted **Feature-Sliced Design (FSD)**, prioritizing decoupling between infrastructure and domain logic.

1.  **Adapter Pattern (GoF):** Data normalization occurs in `src/models/adapters/`. It transforms raw API responses into standardized application models (`UserProfile`), shielding the UI from external schema changes.
2.  **Facade Pattern:** Features in `src/features/` encapsulate complex logic (TanStack Query, debouncing, state transitions) within **Facade Hooks** (e.g., `useUserSearchFacade`). This keeps UI components "dumb" and focused on presentation.
3.  **Concurrent UI:** Leverages React concurrent features to ensure an instantaneous and fluid user experience.
4.  **High-Fidelity Logging:** A custom logging utility (`src/app/logger.js`) provides visual feedback on renders, state changes, and data flows using CSS styling and ASCII art.

## 🛠️ Tech Stack

- **Core:** React 18/19, Vite 5/6 (Lightning CSS engine).
- **State Management:** TanStack Query v5 (Server state) and Redux Toolkit.
- **Styling:** Tailwind CSS v4 (Semantic variables-based theming).
- **Animations:** Motion v12 (Hardware-accelerated fluid transitions).
- **Routing:** React Router 7.
- **Documentation:** Advanced JSDoc for type-safe IntelliSense without heavy TS overhead.

## 🚀 Building and Running

| Command | Action |
| :--- | :--- |
| `pnpm install` | Install dependencies. |
| `pnpm dev` | Start development server with Hot Reload. |
| `pnpm build` | Generate an optimized production build (Lightning CSS). |
| `pnpm lint` | Run ESLint with accessibility and React hooks checks. |
| `pnpm preview` | Preview the production build locally. |
| `pnpm py` | Build and serve the `dist` folder using a Python server (port 5000). |
| `pnpm clean` | Wipe `node_modules` and `dist` for a fresh start. |

## 📐 Development Conventions

1.  **Type Safety:** Always use **JSDoc** for documenting functions, hooks, and data models to ensure IDE IntelliSense and maintainability.
2.  **Feature Encapsulation:** New business logic should live in `src/features/`. Each feature should expose its logic through a `Facade` hook.
3.  **Data Normalization:** Never use raw API data directly in components. Always pass it through an **Adapter** in `src/models/adapters/`.
4.  **Styling:** Prioritize **Tailwind v4 semantic variables** (e.g., `--color-app-bg`) for theming.
5.  **Logging:** Use `log.flow()`, `log.render()`, and `log.state()` from `src/app/logger.js` to track application execution.
6.  **Accessibility:** Adhere to WCAG 2.1 AA standards (audited via `eslint-plugin-jsx-a11y`).

## 📂 Directory Structure

- `src/app/`: Centralized configuration, providers, and logging.
- `src/components/`: Domain-agnostic UI components (buttons, toggles, layouts).
- `src/features/`: Encapsulated business domains (e.g., `users`, `user-detail`).
- `src/models/adapters/`: Structural patterns for data transformation.
- `src/services/`: Infrastructure layer for API communication (`userService.js`).
- `src/docs/`: Deep technical documentation and engineering guides.
- `src/hooks/`: Reusable utility hooks (debouncing, intersection observer).

---
*Last updated: 2026-04-02*
