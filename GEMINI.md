# 🚀 Project Context: API - GitHub Users

This project is a high-performance React engineering artifact designed for exploring the GitHub API, following "Master's Level" software engineering standards, Vercel best practices, and Clean Architecture principles.

## 🏗️ Architecture & Design Patterns

The system is built using an adapted **Feature-Sliced Design (FSD)**, prioritizing decoupling between infrastructure and domain logic.

1.  **Adapter Pattern (GoF):** Data normalization occurs in `src/models/adapters/`. It transforms raw API responses into standardized application models (`UserProfile`), shielding the UI from external schema changes.
2.  **Validation Layer (Zod):** Every data entry point (API responses, form inputs) MUST be validated using **Zod schemas**. This ensures runtime type safety and fail-fast behavior.
3.  **Facade Pattern:** Features in `src/features/` encapsulate complex logic (TanStack Query, state transitions) within **Facade Hooks**. This keeps UI components focused on presentation and decoupled from implementation details.
4.  **Mocking Layer (MSW):** Development and testing rely on **Mock Service Worker**. Handlers in `src/mocks/handlers.js` intercept real network requests to provide consistent and predictable data for offline development.
5.  **Concurrent UI:** Leverages React concurrent features to ensure an instantaneous and fluid user experience.
6.  **High-Fidelity Logging:** A custom logging utility (`src/app/logger.js`) provides visual feedback on renders, state changes, and data flows.

## 🛠️ Tech Stack

- **Core:** React 18/19, Vite 6 (Lightning CSS engine), Zod.
- **State/Data:** TanStack Query v5, MSW (Offline-first dev).
- **Styling:** Tailwind CSS v4 (Semantic variables), `tailwind-merge` + `clsx`.
- **UI:** Lucide-React (Icons), Sonner (Toasts).
- **Animations:** Motion v12.
- **Documentation:** Advanced JSDoc for IntelliSense.

## 🚀 Building and Running

| Command | Action |
| :--- | :--- |
| `pnpm install` | Install dependencies. |
| `pnpm dev` | Start dev server (MSW will be active if `mode` is `development`). |
| `pnpm build` | Production build (MSW is excluded by default). |
| `pnpm lint` | Run ESLint with accessibility and React hooks checks. |
| `pnpm preview` | Preview production build. |
| `pnpm py` | Build and serve via Python server (port 5000). |
| `pnpm clean` | Wipe `node_modules` and `dist`. |

## 📐 Development Conventions

1.  **Validation First:** Define a Zod schema in `src/models/types/` for every new data entity before implementing its adapter.
2.  **Type Safety:** Use JSDoc alongside Zod for comprehensive documentation and IntelliSense.
3.  **Utility Composition:** Use the `cn` utility from `src/lib/utils.js` for all conditional Tailwind classes to ensure correct class merging.
    ```javascript
    // Example:
    <div className={cn("base-class", isActive && "active-class", className)} />
    ```
4.  **Feature Encapsulation:** New business logic lives in `src/features/`. Each feature must expose its API via a Facade hook.
5.  **Data Normalization:** Raw API data is strictly forbidden in components. Pass everything through an **Adapter**.
6.  **Mocking:** If adding a new endpoint, always add a corresponding handler in `src/mocks/handlers.js`.
7.  **Logging:** Track execution using `log.flow()`, `log.render()`, and `log.state()`.

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
