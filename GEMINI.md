# 🚀 Project Instructions: GitHub User Explorer (Master's Level Artifact)

This project is a high-performance React engineering artifact designed for exploring the GitHub API, following "Master's Level" software engineering standards, Vercel best practices, and Clean Architecture principles.

## 🏗️ Architecture & Design Patterns

The system is built using **Clean Architecture** layered architecture (Domain, Infrastructure, Application, Presentation), prioritizing decoupling between infrastructure and domain logic.

### 1. Adapter Pattern (GoF Structural)

- **Location:** `src/domain/adapters/`
- **Purpose:** Data normalization. Transforms raw API responses into standardized application models (e.g., `UserProfile`).
- **Mandate:** Raw API data is strictly forbidden in components. Pass everything through an **Adapter**.
- **Validation:** Uses **Zod schemas** (`src/domain/schemas/`) for runtime type safety and fail-fast behavior.

### 2. Facade Pattern

- **Location:** `src/application/facades/` (e.g., `useUserSearchFacade.js`)
- **Purpose:** Orchestration. Encapsulates complex logic (TanStack Query, debouncing, state transitions) within **Facade Hooks**.
- **Mandate:** UI components must remain focused on presentation. They interact with business logic ONLY through Facades.

### 3. Validation Layer (Zod)

- **Mandate:** Every data entry point (API responses, form inputs) MUST be validated using **Zod schemas** before reaching the domain layer.

### 4. Mocking Layer (MSW)

- **Location:** `src/infrastructure/mocks/`
- **Purpose:** Offline-first development and testing.
- **Mandate:** If adding a new endpoint, always add a corresponding handler in `src/infrastructure/mocks/handlers.js`.

### 5. High-Fidelity Logging

- **Utility:** `src/infrastructure/logger/logger.js`
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

1. **Validation First:** Define a Zod schema in `src/domain/schemas/` for every new data entity.
2. **Type Safety:** Use JSDoc alongside Zod for comprehensive documentation. Use `/** @typedef */` for reusable types.
3. **Utility Composition:** Use the `cn` utility from `src/lib/utils.js` for all conditional Tailwind classes.
4. **Feature Encapsulation:** New business logic lives in `src/presentation/features/`. Each feature must expose its API via a Facade hook in `@/application/facades/`.
5. **A11Y Compliance:** Follow WCAG 2.1 AA standards. Ensure proper ARIA roles and keyboard navigation.

## 📂 Directory Structure

- `src/domain/`: Pure domain entities, schemas, adapters, and custom errors.
- `src/infrastructure/`: Base httpClient, API services, logger, and development mocks.
- `src/application/`: Query orchestration hooks, facade layer, and global hooks.
- `src/presentation/`: React components, views, bento boxes, factories, and styles.
- `src/docs/`: In-depth study guides, architecture guides, and technical simulated interviews.

## 🤖 AI Interaction Guidelines (Gemini CLI)

- **Strict Adherence:** Follow the patterns in `src/domain/adapters/` and `src/presentation/features/` when adding new functionality.
- **No Refactoring:** Do not modify the `logger.js` or `utils.js` unless explicitly requested.
- **Validation:** Always suggest or implement a Zod schema when creating new data structures.
- **Documentation:** Maintain high-quality JSDoc headers for all new functions and components.

---

_Last updated: 2026-05-22_
