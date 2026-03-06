# 🏗️ Arquitectura de Software: API - GitHub Users

## 1. Visión General

Este sistema utiliza una arquitectura **Feature-Sliced Design (FSD)** adaptada, centrada en el desacoplamiento entre la infraestructura (APIs externas) y la lógica de dominio (la Aplicación).

## 2. Patrones de Diseño Aplicados (The Senior Core)

### A. Pattern: Adapter (Modelo de Datos)

El sistema implementa un **Adapter Pattern** en la capa `src/models/adapters/`. Su propósito es proteger la UI de los cambios en los esquemas de la API de GitHub.

- **Input:** Raw Data de la API (ej. `avatar_url`, `login`).
- **Output:** Standardized Model `UserProfile` (ej. `photo`, `username`).
- **Beneficio:** Si la API cambia su estructura, solo se modifica el adaptador, no los componentes.

### B. Pattern: Facade (Interfaz de Feature)

Cada módulo en `src/features/` expone un **Hook de Fachada** (`useUserSearchFacade`).

- **Propósito:** Encapsular la complejidad de **TanStack Query (React Query)** y la lógica de debouncing.
- **Beneficio:** Los componentes de presentación (`UserSearch.jsx`) son "limpios" y solo consumen propiedades booleanas (`isLoading`, `isSuccess`) y handlers simples.

### C. Patrón Smart/Presentational (Container/View)

- **Smart Hooks (Hooks de Capa):** Gestionan el estado asíncrono y la lógica de negocio.
- **Dumb Components:** Reciben props y renderizan UI minimalista de alta gama.

---

## 3. Flujo Arquitectónico ASCII

```
[ API EXTERNA: GitHub ]
           |
           v
[ CAPA SERVICIO: userService.js ] -- (HTTP/Fetch)
           |
           v
[ CAPA ADAPTADOR: userAdapter.js ] -- (Normalización de Datos)
           |
           v
[ SERVER STATE: TanStack Query ] -- (Caché e Invalación)
           |
           v
[ FACADE HOOK: useUserSearchFacade ] -- (Abstracción de Lógica)
           |
           v
[ COMPONENTE UI: UserSearch.jsx ] -- (Renderizado Minimalista)
```

---

## 4. Estructura de Directorios

```
src/
├── app/          # Core: Configuración de Providers (QueryClient, Store) y Logs.
├── components/   # UI: Botones, Toggles y Layouts agnósticos al dominio.
├── features/     # Dominios: Lógica de negocio encapsulada por funcionalidad.
├── hooks/        # Utilitarios: useDebounce, useTheme, etc.
├── models/       # Dominio: Adaptadores y esquemas de datos.
├── services/     # Infraestructura: Definiciones de API externas.
└── docs/         # Ingeniería: Documentación técnica centralizada.
```

## 5. Decisiones Técnicas (The Whys)

- **Vite:** Por su motor de desarrollo instantáneo y soporte de Lightning CSS.
- **TanStack Query:** Reemplaza los Thunks tradicionales para una gestión superior del caché y estado del servidor.
- **Minimalismo v3:** Reducción de ruido visual para priorizar la experiencia de usuario técnica.
- **Tailwind v4:** Por su motor de temas nativo y reducción drástica de la configuración JS.
- **Motion v12:** Por su gestión de animaciones por hardware y soporte de React 19.
