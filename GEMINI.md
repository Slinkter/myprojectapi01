# 🚀 Project Instructions: GitHub User Explorer (Master's Level Artifact)

This project is a high-performance React engineering artifact designed for exploring the GitHub API, following "Master's Level" software engineering standards, Vercel best practices, and Feature-Sliced Design (FSD) principles.

## 🏗️ Architecture & Design Patterns

The system is built using **Feature-Sliced Design (FSD)** architecture, prioritizing encapsulation, decoupling, and strict directional dependencies.

### 1. Adapter Pattern (GoF Structural)

- **Location:** `src/entities/user/model/adapter.js`
- **Purpose:** Data normalization. Transforms raw API responses into standardized application models (`UserProfile`).
- **Mandate:** Raw API data is strictly forbidden in components. Pass everything through the adapter.
- **Validation:** Uses **Zod schemas** (`src/entities/user/model/schema.js`) for runtime type safety.

### 2. Facade Pattern

- **Location:**
  - Search User Facade: `src/features/search-user/model/useUserSearchFacade.js`
  - View User Details Facade: `src/features/view-user-details/model/useUserDetailFacade.js`
- **Purpose:** Orchestration & Decoupling. Encapsulates route parameters, TanStack query states, and error triggers.
- **Mandate:** UI widgets and pages must remain focused on presentation. They interact with data fetching and states ONLY through Facades.

### 3. Factory Pattern (GoF Creational)

- **Location:** `src/entities/user/ui/ResultFactory.jsx`
- **Purpose:** Dynamic UI creation. Selects and instantiates specialized components (UserCard vs. OrganizationCard) based on entity type.

### 4. Bento Grid Pattern (UI/UX)

- **Location:** `src/widgets/user-profile-bento/`
- **Purpose:** Information Density. Uses a modular, high-fidelity dashboard layout for user details, optimized for visual hierarchy and responsiveness.

### 5. Validation Layer (Zod)

- **Mandate:** Every data entry point (API responses, form inputs) MUST be validated using **Zod schemas** before reaching the application layers.

### 6. Mocking Layer (MSW)

- **Location:** `src/shared/mocks/`
- **Purpose:** Offline-first development and testing.
- **Mandate:** In development mode, mock handlers intercept requests automatically to avoid GitHub API rate limit blocks.

## 🛠️ Tech Stack

- **Core:** React 18.3+, Vite 5.4, Zod.
- **Data Fetching:** TanStack Query v5.
- **Styling:** Tailwind CSS v4.
- **Animations:** Motion v12.
- **Icons/UI:** Lucide-React, Sonner.
- **Documentation:** Advanced JSDoc for IntelliSense & GitHub Artifacts.

## 🚀 Building and Running

| Command         | Action                                               |
| :-------------- | :--------------------------------------------------- |
| `pnpm install`  | Install dependencies.                                |
| `pnpm dev`      | Start dev server (MSW active in `development` mode). |
| `pnpm build`    | Production build (MSW excluded).                     |
| `pnpm lint`     | Run ESLint (includes a11y and hooks checks).         |
| `pnpm test:run` | Run unit tests once.                                 |

## 📐 Development Conventions

1. **Validation First:** Define a Zod schema in `src/entities/<slice>/model/schema.js` for every new data entity.
2. **Type Safety:** Use JSDoc alongside Zod for comprehensive documentation.
3. **Public APIs:** Always export slice resources in `index.js` files at slice roots and import from `@/<layer>/<slice>`.
4. **Resilience:** Wrap widgets and UI blocks in `<ErrorBoundary>` to insulate layout.

## 📂 Documentation & Engineering Artifacts

The project includes a robust ecosystem of documentation in `src/docs/`:

- `01-Guia-del-Proyecto.md`: Core vision and requirements.
- `02-Arquitectura-y-Patrones.md`: Deep dive into FSD and GoF patterns.
- `ARTEFACTOS_INGENIERIA.md`: Comprehensive technical and management document (1000+ lines).
- `GUIA_ESTUDIO.md`: React & Frontend learning path.
- `AGENTS.md`: Technical guide for AI and human contributors.

## 📂 Directory Structure

- `src/app/`: App Shell and initialization logic (`App.jsx`, `main.jsx`).
- `src/pages/`: Page compositions.
- `src/widgets/`: Autonomous blocks (SearchResults, UserProfileBento).
- `src/features/`: Interactive user actions (SearchUser).
- `src/entities/`: Domain schemas, adapters, query hooks, and UI primitives.
- `src/shared/`: Generic helpers, API client (`httpClient`, `queryClient`), theme configuration, and mocks.

---

_Last updated: 2026-06-14 (Decoupled User Details Facade & Modularized Bento)_
