# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### 🧹 Pending
- Remove 5 duplicate files from old locations (see `task.md`)

---

## [0.2.0] - 2026-01-12

### 🏗️ Added - Feature-Based Architecture
- **Feature-Based Architecture** implementation
  - Created `features/users/` with complete autonomy
  - Created `features/user-detail/` for user detail view
  - Added `features/users/components/` (UserCard, UserList, SkeletonCard, SkeletonGrid)
  - Added `features/users/hooks/` (useUserFetching)
  - Added `features/users/index.js` as public API
  - Added `features/users/README.md` documentation

### 🎨 Added - Routing & Navigation
- **React Router DOM** integration (v7.12.0)
  - Route `/` for user search
  - Route `/user/:login` for user detail
  - Navigation between views
- **UserDetail Component** with full GitHub API integration
  - Real-time user data fetching
  - Stats display (repos, followers, following, gists)
  - Loading states with Spinner
  - Error handling
  - Professional UI with gradients and cards

### 🔧 Changed - Component Updates
- **UserCard** now has dual action buttons:
  - "Ver Detalles" (green) - navigates to detail view
  - "GitHub Profile" (amber outlined) - opens GitHub in new tab
- **UserSearch** updated to use feature-local imports
- **App.jsx** refactored to use Routes configuration

### 📝 Added - Documentation
- `src/docs/REFACTOR_FEATURE_BASED.md` - Feature-Based refactoring guide
- `src/docs/RESUMEN_FINAL.md` - Final project summary
- `src/docs/INFORME_REFACTORIZACION.md` - Complete refactoring report
- `src/features/users/README.md` - Users feature documentation

### 🚚 Moved - File Reorganization
- `src/components/UserCard.jsx` → `src/features/users/components/UserCard.jsx`
- `src/components/SkeletonCard.jsx` → `src/features/users/components/SkeletonCard.jsx`
- `src/components/layout/UserList.jsx` → `src/features/users/components/UserList.jsx`
- `src/components/layout/SkeletonGrid.jsx` → `src/features/users/components/SkeletonGrid.jsx`
- `src/hooks/useUserFetching.js` → `src/features/users/hooks/useUserFetching.js`

---

## [0.1.0] - 2026-01-12

### 🎨 Added - Styling System
- **Tailwind CSS Utility-First** migration complete
  - Removed all BEM classes (14 classes eliminated)
  - Applied Tailwind utilities directly in JSX
  - Reduced `index.css` from 117 to 59 lines (-49%)

### 🔧 Added - Developer Experience
- **Path Aliases** configuration
  - Added `@/` alias pointing to `src/`
  - Configured `vite.config.js` with path resolution
  - Created `jsconfig.json` for IDE IntelliSense
  - Refactored 13 files to use absolute imports

### 📝 Added - Technical Documentation
- **Complete documentation suite** (00-08 series):
  - `00-diagnostico-tecnico.md` - Technical audit
  - `01-overview-del-sistema.md` - System overview
  - `02-arquitectura.md` - Architecture patterns
  - `03-casos-de-uso.md` - Use cases
  - `04-requerimientos.md` - Requirements (FR/NFR)
  - `05-flujo-de-datos.md` - Data flow diagrams
  - `06-guia-para-desarrolladores.md` - Developer guide
  - `07-calidad-y-riesgos.md` - Quality & risks
  - `08-cierre-del-proyecto.md` - Project closure
- **Additional documentation**:
  - `GLOSSARY.md` - Technical glossary
  - `PLAN_DE_MEJORA.md` - Improvement roadmap
  - `README.md` - Professional landing page

### 🔧 Changed - Component Refactoring
- **PageHeader.jsx** - Removed BEM, applied Tailwind utilities
- **UserCard.jsx** - Removed BEM, applied Tailwind utilities
- **App.jsx** - Removed BEM, applied Tailwind utilities
- **main.jsx** - Added BrowserRouter wrapper

### 🚀 Dependencies
- Added `react-router-dom` v7.12.0

---

## [0.0.1] - Initial State

### 🎯 Initial Features
- GitHub user search functionality
- User card display with Material Tailwind
- Redux state management
- Dark mode support
- Responsive design
- Debounced search
- Lazy loading with Intersection Observer
- Skeleton loading states

### 🛠️ Tech Stack
- React 18.3.1
- Vite 5.4.21
- Redux Toolkit 2.11.2
- Material Tailwind 2.1.10
- Tailwind CSS 3.4.19
- React Icons 5.5.0

---

## Legend

- 🎨 **Added** - New features
- 🔧 **Changed** - Changes in existing functionality
- 🗑️ **Deprecated** - Soon-to-be removed features
- ❌ **Removed** - Removed features
- 🐛 **Fixed** - Bug fixes
- 🔒 **Security** - Vulnerability fixes
- 🚚 **Moved** - File/folder reorganization
- 📝 **Documentation** - Documentation changes
- 🏗️ **Architecture** - Structural changes

---

## Migration Guides

### From 0.1.0 to 0.2.0
If you have custom code importing from old paths, update as follows:

```javascript
// OLD (0.1.0):
import UserCard from "@/components/UserCard";
import { useUserFetching } from "@/hooks/useUserFetching";

// NEW (0.2.0):
import { UserCard, useUserFetching } from "@/features/users";
// or
import UserCard from "@/features/users/components/UserCard";
import { useUserFetching } from "@/features/users/hooks/useUserFetching";
```

---

[Unreleased]: https://github.com/Slinkter/myprojectapi01/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/Slinkter/myprojectapi01/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/Slinkter/myprojectapi01/compare/v0.0.1...v0.1.0
[0.0.1]: https://github.com/Slinkter/myprojectapi01/releases/tag/v0.0.1
