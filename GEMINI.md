# 🚀 Project Instructions: GitHub User Explorer (Master's Level Artifact)

This project is a high-performance React engineering artifact designed for exploring the GitHub API, following "Master's Level" software engineering standards, Vercel best practices, and Clean Architecture principles.

## 🏗️ Architecture & Design Patterns

The system is built using an adapted **Feature-Sliced Design (FSD)**, prioritizing decoupling between infrastructure and domain logic.

### 1. Adapter Pattern (GoF Structural)

- **Location:** `src/models/adapters/`
- **Purpose:** Data normalization. Transforms raw API responses into standardized application models (e.g., `UserProfile`).
- **Mandate:** Raw API data is strictly forbidden in components. Pass everything through an **Adapter**.
- **Validation:** Uses **Zod schemas** (`src/models/types/`) for runtime type safety and fail-fast behavior.

### 2. Facade Pattern

- **Location:** `src/features/[feature]/hooks/` (e.g., `useUserSearchFacade.js`)
- **Purpose:** Orchestration. Encapsulates complex logic (TanStack Query, debouncing, state transitions) within **Facade Hooks**.
- **Mandate:** UI components must remain focused on presentation. They interact with business logic ONLY through Facades.

### 3. Validation Layer (Zod)

- **Mandate:** Every data entry point (API responses, form inputs) MUST be validated using **Zod schemas** before reaching the domain layer.

### 4. Mocking Layer (MSW)

- **Location:** `src/mocks/`
- **Purpose:** Offline-first development and testing.
- **Mandate:** If adding a new endpoint, always add a corresponding handler in `src/mocks/handlers.js`.

### 5. High-Fidelity Logging

- **Utility:** `src/app/logger.js`
- **Convention:** Use `log.flow()`, `log.render()`, and `log.state()` to provide visual feedback on execution flows and state transitions.

## 🛠️ Tech Stack

- **Core:** React 18.3+, Vite 5.4, Zod.
- **Data Fetching:** TanStack Query v5 (Cache-first strategy).
- **Styling:** Tailwind CSS v4 (using `@tailwindcss/vite` plugin), `tailwind-merge` + `clsx`.
- **Animations:** Motion v12 (High-fidelity transitions).
- **Icons/UI:** Lucide-React, Sonner (Toasts).
- **Documentation:** Advanced JSDoc for IntelliSense and Type-safe JS.

## 🚀 Building and Running

| Command        | Action                                                          |
| :------------- | :-------------------------------------------------------------- |
| `pnpm install` | Install dependencies.                                           |
| `pnpm dev`     | Start dev server (MSW active in `development` mode).            |
| `pnpm build`   | Production build (MSW excluded).                                |
| `pnpm lint`    | Run ESLint (includes a11y and hooks checks).                    |
| `pnpm py`      | Build and serve via Python server (port 5000) for prod testing. |

## 📐 Development Conventions

1. **Validation First:** Define a Zod schema in `src/models/types/` for every new data entity.
2. **Type Safety:** Use JSDoc alongside Zod for comprehensive documentation. Use `/** @typedef */` for reusable types.
3. **Utility Composition:** Use the `cn` utility from `src/lib/utils.js` for all conditional Tailwind classes.
4. **Feature Encapsulation:** New business logic lives in `src/features/`. Each feature must expose its API via a Facade hook.
5. **A11Y Compliance:** Follow WCAG 2.1 AA standards. Ensure proper ARIA roles and keyboard navigation.

## 📂 Directory Structure

- `src/app/`: Centralized configuration, providers, and logging.
- `src/components/`: Domain-agnostic UI components (`common`, `layout`, `ui`, `factories`).
- `src/features/`: Encapsulated business domains (e.g., `users`, `user-detail`).
- `src/models/`: `adapters/` for transformation and `types/` for Zod schemas.
- `src/services/`: Infrastructure layer for API communication.
- `src/docs/`: Deep technical documentation (Architecture, Quality, UX Analysis).

## 🤖 AI Interaction Guidelines (Gemini CLI)

- **Strict Adherence:** Follow the patterns in `src/models/adapters/` and `src/features/` when adding new functionality.
- **No Refactoring:** Do not modify the `logger.js` or `utils.js` unless explicitly requested.
- **Validation:** Always suggest or implement a Zod schema when creating new data structures.
- **Documentation:** Maintain high-quality JSDoc headers for all new functions and components.

---

_Last updated: 2026-05-12_
