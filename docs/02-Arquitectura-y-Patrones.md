# 02 - Arquitectura FSD (Feature-Sliced Design) y Patrones Explicados

Este proyecto utiliza **Feature-Sliced Design (FSD)** como su única y estricta arquitectura. FSD organiza el código en capas (Layers), rebanadas (Slices) y segmentos (Segments) para maximizar la mantenibilidad, escalabilidad y legibilidad de la aplicación.

---

## 🏗️ Capas de la Arquitectura FSD (Layers)

La aplicación se estructura en 6 capas verticales respetando la regla inquebrantable de dependencias: **Un elemento de una capa superior puede importar elementos de cualquier capa inferior, pero un elemento de una capa inferior jamás puede importar de una capa superior.**

```
 ┌────────────────────────────────────────────────────────┐
 │ 1. app (Configuración global, Ruteo, Proveedores)       │
 └───────────┬────────────────────────────────────────────┘
             ▼
 ┌────────────────────────────────────────────────────────┐
 │ 2. pages (Composiciones completas de páginas)          │
 └───────────┬────────────────────────────────────────────┘
             ▼
 ┌────────────────────────────────────────────────────────┐
 │ 3. widgets (Bloques autónomos y auto-contenidos de UI) │
 └───────────┬────────────────────────────────────────────┘
             ▼
 ┌────────────────────────────────────────────────────────┐
 │ 4. features (Interacciones con valor de negocio)       │
 └───────────┬────────────────────────────────────────────┘
             ▼
 ┌────────────────────────────────────────────────────────┐
 │ 5. entities (Modelos de dominio, lógica y UI básica)   │
 └───────────┬────────────────────────────────────────────┘
             ▼
 ┌────────────────────────────────────────────────────────┐
 │ 6. shared (Código técnico común y reutilizable)        │
 └────────────────────────────────────────────────────────┘
```

---

## 📂 Estructura Detallada del Proyecto por Capas

### 1. `app/`
El punto de entrada del sistema. Inicializa el enrutador y los estilos globales.
*   `App.jsx`: Componente raíz y definición de rutas.
*   `main.jsx`: Punto de entrada de React 18 que inicializa MSW y monta la app.

### 2. `pages/`
Composiciones de nivel de página que cargan widgets o features.
*   `search-page/`: Página principal de búsqueda de usuarios.
*   `detail-page/`: Página de visualización del perfil en formato Bento Grid.
*   `not-found/`: Página de error 404 amigable.

### 3. `widgets/`
Organiza features y entities en componentes complejos y auto-contenidos de UI.
*   `search-results/`: Gestiona la visualización condicional de los resultados (cargando, error, lista, no encontrado).
*   `user-profile-bento/`: Dashboard Bento ultra-premium para detalles del usuario, modularizado en subcomponentes de UI (`ProfileHeader`, `BentoStatsGrid`, etc.) para desacoplar el maquetado.

### 4. `features/`
Acciones interactivas que aportan valor directo al usuario.
*   `search-user/`: Barra de búsqueda, debouncing, y estado de búsqueda a través de la Fachada (`useUserSearchFacade.js`).
*   `view-user-details/`: Gestión de parámetros y estados de carga de perfiles mediante la Fachada (`useUserDetailFacade.js`).

### 5. `entities/`
Conceptos de negocio (en este caso, el `user`). Define schemas, adaptadores, llamadas de servicio, hooks de consulta y componentes de UI puros (como tarjetas individuales o esqueletos).
*   `user/api/`: Servicios HTTP (`userService.js`) y hooks de TanStack Query (`useUserQuery.js`, `useUserDetailQuery.js`).
*   `user/model/`: Validación en tiempo de ejecución (`schema.js`) con Zod y traducción de datos (`adapter.js`).
*   `user/ui/`: Componentes básicos (`UserCard.jsx`, `ResultFactory.jsx`, `SkeletonCard.jsx`, `UserDetailSkeleton.jsx`).

### 6. `shared/`
Contenedor transversal de herramientas técnicas, estilos y componentes atómicos.
*   `api/`: Cliente HTTP genérico (`httpClient.js`) y clase `ApiError.js`.
*   `lib/hooks/`: Hooks reutilizables independientes del dominio (`useTheme.js`, `useIntersectionObserver.js`, `useDebouncedSearch.js`).
*   `lib/utils/`: Utilidades genéricas de formateo o CSS (`utils.js` con el helper `cn`).
*   `ui/`: Componentes genéricos de UI (`ErrorBoundary.jsx`, `ErrorDisplay.jsx`, `ThemeToggle.jsx`).
*   `styles/`: Estilos base de Tailwind CSS v4 (`index.css`) y tokens de temas (`theme.js`).
*   `config/`: Configuración y constantes de red (`config.js`).
*   `mocks/`: Manejadores de Service Worker de MSW para desarrollo offline.

---

## 📡 Trazabilidad Educativa: El Flujo de 9 Pasos (log.flow)

Una de las innovaciones de este proyecto es el sistema de logging numerado que permite a los desarrolladores visualizar la ejecución de la arquitectura en tiempo real desde la consola del navegador.

| Paso | Nombre | Responsabilidad Técnica |
| :--- | :--- | :--- |
| **1** | **Mounting** | Inicialización de React y anclaje al DOM real (`main.jsx`). |
| **2** | **App Shell** | Configuración de Providers (Query, Router, Theme) (`App.jsx`). |
| **3** | **Pages** | Composición de la vista y orquestación de alto nivel (`SearchPage.jsx`). |
| **4** | **Widgets** | Orquestación de lógica visual y renderizado condicional (`SearchResults.jsx`). |
| **5** | **Factory** | Selección dinámica del componente visual según el tipo de dato (`ResultFactory.jsx`). |
| **6** | **Facade** | **Cerebro de la feature:** Orquestación de hooks, estados y efectos (`useUserSearchFacade.js`). |
| **7** | **Query Hook** | Gestión de caché y estado del servidor con TanStack Query (`useUserQuery.js`). |
| **8** | **Service** | Comunicación pura con la infraestructura de red (`userService.js`). |
| **9** | **Adapter** | **Filtro de Seguridad:** Validación con Zod y normalización de datos (`adapter.js`). |

---

## 🗺️ Mapa de Flujo de Datos

El flujo de información se desplaza de forma estructurada e unidireccional, siguiendo la traza del logger:

```text
[CLIENTE UI]
      │
(3) Pages ──────┐
      │         │
(4) Widgets ─── (6) Facade <───────┐
      │         │                  │
(5) Factory ────┘           (7) Query Hook
      │                            │
      └─────────────────────> (8) Service ──────> [RED / API]
                                   │                   │
                            (9) Adapter <──────────────┘
```

---

## 💎 Patrones de Diseño Integrados en FSD

Para garantizar la calidad de la arquitectura a nivel "Senior", aplicamos tres patrones clásicos integrados en las capas de FSD:

### 1. El Patrón Adapter (GoF - Estructural)
*   **Ubicación:** `src/entities/user/model/adapter.js`
*   **Filosofía:** "No confíes en los datos externos". La API de GitHub devuelve una estructura compleja con propiedades variables (`avatar_url`, `html_url`). El adaptador las traduce al modelo estandarizado `UserProfile` con tipados limpios (`photo`, `username`, `repos`). 
*   **Seguridad:** Realiza una validación estricta usando **Zod** para fallar inmediatamente si el contrato de la API cambia, protegiendo a la UI de errores de "undefined".

### 2. El Patrón Facade (GoF - Estructural)
*   **Ubicación:** `src/features/search-user/model/useUserSearchFacade.js`
*   **Filosofía:** "Simplifica la complejidad". Centraliza la coordinación de múltiples hooks (TanStack Query, react-router-dom, useDebounce) y efectos (toasts de error) en un solo punto de entrada. 
*   **Beneficio:** Los widgets y páginas simplemente consumen booleanos (`isLoading`, `isError`) y funciones (`setSearchTerm`), quedando 100% desacoplados de la implementación de red o ruteo.

### 3. El Patrón Factory (GoF - Creacional)
*   **Ubicación:** `src/entities/user/ui/ResultFactory.jsx`
*   **Filosofía:** "Delega la creación". Instancia dinámicamente componentes basándose en el campo `type` de la API (User vs Organization).
*   **Beneficio:** Si mañana GitHub añade un tipo "Bot" o "Enterprise", solo modificamos la Factory en un lugar, sin tocar la lógica de los widgets de resultados.
