# 02 - Arquitectura de Patrones Avanzados

## 🏢 Estructura de Carpetas (FSD + Pattern Oriented)

```text
src/
├── app/                  # Orquestador: store.js y logger.js (Debug system)
├── components/           # UI Compartida y Patrones Estructurales
│   ├── common/           # (ErrorBoundary - Resilience Pattern)
│   ├── factories/        # (ResultFactory - Creational Factory Pattern)
│   ├── layout/           # (PageHeader, ErrorDisplay, NotFound)
│   └── ui/               # (ThemeToggle, Modals, FaSpinner)
├── features/             # Slices de Negocio (Dominios)
│   ├── users/            
│   │   ├── hooks/        # (useUserSearchFacade - Facade Pattern)
│   │   └── components/   # (UserCard - Compound Component Pattern)
│   └── user-detail/      
├── models/               # Modelos de Datos
│   └── adapters/         # (UserAdapter - Structural Adapter Pattern)
├── hooks/                # Hooks globales (useTheme, useDebounce)
├── services/             # API Layer (Standard Fetch + Adapter usage)
└── docs/                 # "Tutorial Book & Architecture Guide"
```

## 📐 Diagrama de Relaciones de Datos (ASCII)

```text
  ┌─────────────────┐       ┌──────────────────┐       ┌─────────────────┐
  │   Redux Store   │       │   UserAdapter    │       │   GitHub API    │
  │ (Single Source) │◀──────│  (Normalizador)  │◀──────│   (External)    │
  └────────┬────────┘       └──────────────────┘       └─────────────────┘
           │
           ▼ [useSelector]
  ┌─────────────────┐       ┌──────────────────┐       ┌─────────────────┐
  │  UserSearch     │       │  ResultFactory   │       │   UserCard      │
  │    (Facade)     │──────▶│   (Decisor)      │──────▶│ (Presentation)  │
  └─────────────────┘       └──────────────────┘       └─────────────────┘
```

## 🧩 Catálogo de Patrones Implementados

1.  **Factory Method (`ResultFactory.jsx`):** La lista de resultados no decide qué renderizar; la factoría evalúa el tipo de dato y devuelve el componente adecuado.
2.  **Adapter Pattern (`userAdapter.js`):** Traduce la API externa a nuestro modelo interno (`photo`, `username`).
3.  **Compound Components (`UserCard.jsx`):** Divide el componente en `Avatar`, `Header`, `Footer` para máxima flexibilidad.
4.  **Facade Pattern (`useUserSearchFacade.js`):** Oculta la complejidad de Redux y Fetching tras una interfaz simple.
5.  **Error Boundary:** Red de seguridad para capturar fallos de renderizado.
