# GitExplorer — Guía del Desarrollador & Aprendizaje Interactiva

> **React 18 SPA para explorar perfiles de GitHub.** Diseñada meticulosamente siguiendo la arquitectura **Feature-Sliced Design (FSD)** y patrones de diseño empresariales. 
> 
> *Nota: Este documento está estructurado en módulos independientes ("Slices") optimizados para facilitar la lectura de principiantes y permitir el procesamiento automatizado mediante NotebookLM.*

---

## 🧭 Especificaciones del Sistema

```txt
React:          v18.3 (SPA)
Vite:           v5.4 (Fast Dev Server)
Tailwind:       v4 (Utility-First Design System)
Arquitectura:   Feature-Sliced Design (FSD)
Diseño:         Estética Tailwind CSS Website Branding
Tipografía:     Plus Jakarta Sans (Exclusiva)
Cursor:         Pokéball interactiva y reactiva (SVG)
```

---

## 🧩 Slice 1: Stack Tecnológico y Propósito

Este módulo explica las herramientas del proyecto, su función y el motivo de su elección.

### 🛠️ Capa de Producción

| Herramienta | Función | ¿Por qué la elegimos para aprender? |
| :--- | :--- | :--- |
| **React 18.3** | UI declarativa basada en componentes. | Estándar moderno de la industria. Permite composición y hooks reutilizables. |
| **Vite 5.4** | Empaquetador (bundler) ultrarrápido. | Servidor local instantáneo (HMR) y compilaciones de producción optimizadas. |
| **TanStack Query v5** | Gestor de estado del servidor y caché. | Elimina la necesidad de usar Redux/Context para datos de API. Resuelve la caché y reintentos. |
| **Tailwind CSS v4** | Estilado rápido con clases de utilidad. | Permite diseñar interfaces profesionales directamente en HTML sin hojas CSS complejas. |
| **Motion v12** | Animaciones basadas en física de resortes. | Anima elementos simulando físicas reales (resortes elásticos), logrando un look premium. |
| **React Router v7** | Enrutamiento del lado del cliente. | Cambia de vista instantáneamente sin recargar la página del navegador (experiencia SPA). |
| **Zod v4** | Validador de esquemas en tiempo de ejecución. | Asegura que la API de GitHub responda con datos válidos antes de que toquen la UI. |
| **Sonner v2** | Sistema de notificaciones contextuales (toasts). | Toasts elegantes, accesibles y con soporte directo para cola de notificaciones. |

### 💻 Capa de Desarrollo

*   **ESLint:** Analiza el código de forma estática previniendo bugs, malas prácticas y fallos de accesibilidad (WCAG).
*   **MSW (Mock Service Worker):** Intercepta llamadas de red locales y devuelve respuestas simuladas para trabajar sin conexión y evitar bloqueos por Rate Limit de GitHub.

---

## 🧩 Slice 2: Feature-Sliced Design (FSD) en Práctica

FSD divide la aplicación en capas verticales donde **las capas superiores pueden importar de las inferiores, pero nunca al revés**.

```txt
┌────────────────────────────────────────────────────────┐
│ 1. app (Configuración global, Estilos y Rutas)         │
└───────────┬────────────────────────────────────────────┘
            ▼
┌────────────────────────────────────────────────────────┐
│ 2. pages (Estructuras y layouts de pantallas)          │
└───────────┬────────────────────────────────────────────┘
            ▼
┌────────────────────────────────────────────────────────┐
│ 3. widgets (Módulos independientes complejos de UI)    │
└───────────┬────────────────────────────────────────────┘
            ▼
┌────────────────────────────────────────────────────────┐
│ 4. features (Acciones interactivas con valor de negocio)│
└───────────┬────────────────────────────────────────────┘
            ▼
┌────────────────────────────────────────────────────────┐
│ 5. entities (Conceptos de negocio, en este caso 'user')│
└───────────┬────────────────────────────────────────────┘
            ▼
┌────────────────────────────────────────────────────────┐
│ 6. shared (Código transversal, API, Hooks y Utils)     │
└────────────────────────────────────────────────────────┘
```

### 📂 Estructura del Código

*   [`src/app/`](file:///c:/Users/LJCR/Documents/GitHub/myprojectapi01/src/app/): Punto de entrada y configuración de rutas (`App.jsx`).
*   [`src/pages/`](file:///c:/Users/LJCR/Documents/GitHub/myprojectapi01/src/pages/): Páginas principales de la aplicación (`SearchPage`, `DetailPage`, `NotFoundPage`).
*   [`src/widgets/`](file:///c:/Users/LJCR/Documents/GitHub/myprojectapi01/src/widgets/):
    *   `search-results/`: Orquesta la visualización condicional de resultados (grid, skeletons, errores).
    *   `user-profile-bento/`: Dashboard asimétrico bento detallando el perfil de un desarrollador.
*   [`src/features/`](file:///c:/Users/LJCR/Documents/GitHub/myprojectapi01/src/features/):
    *   `search-user/`: Barra de búsqueda con autocompletado y debouncing (`useUserSearchFacade.js`).
    *   `view-user-details/`: Gestión de parámetros y estados de perfiles detallados (`useUserDetailFacade.js`).
*   [`src/entities/`](file:///c:/Users/LJCR/Documents/GitHub/myprojectapi01/src/entities/):
    *   `user/api/`: Capa de servicios (`userService.js`) y hooks de red (`useUserQuery.js`).
    *   `user/model/`: Esquemas de validación Zod (`schema.js`) y adaptadores de datos (`adapter.js`).
    *   `user/ui/`: Tarjetas de usuario reutilizables y skeletons (`UserCard.jsx`, `ResultFactory.jsx`).
*   [`src/shared/`](file:///c:/Users/LJCR/Documents/GitHub/myprojectapi01/src/shared/): Utilidades comunes (`httpClient.js`, `useTheme.js`, `cn()`).

---

## 🧩 Slice 3: TanStack Query (Estado del Servidor)

TanStack Query se encarga del estado de red, reemplazando a los gestores tradicionales mediante almacenamiento en caché inteligente.

### ⚙️ Ciclo de Vida y Configuración

El motor de consultas se inicializa con parámetros clave para optimizar la red:
*   `staleTime` (5 minutos): Tiempo durante el cual los datos se consideran "frescos" y no requieren recarga.
*   `gcTime` (10 minutos): Tiempo de persistencia de datos en caché inactivos antes de ser eliminados.

### 🔄 Flujo de Peticiones en Desarrollo (MSW) vs Producción

```txt
[En Búsqueda] ➔ Cambia Término ➔ ¿Existe en Caché Fresco?
                                       │
                      ┌────────────────┴────────────────┐
                   SÍ │                                 │ NO
                      ▼                                 ▼
              Datos Instantáneos                Llamar a queryFn
                                                        │
                                          ┌─────────────┴─────────────┐
                                      DEV │                           │ PROD
                                          ▼                           ▼
                                    Mock Intercept              API Real GitHub
                                   (MSW Local Cache)          (Sujeto a Rate Limit)
```

### 🛑 Cancelación Automática (AbortSignal)

Cuando el usuario escribe rápidamente, TanStack Query cancela de forma automática las llamadas anteriores inyectando un `AbortSignal` al método `fetch` en [httpClient.js](file:///c:/Users/LJCR/Documents/GitHub/myprojectapi01/src/shared/api/httpClient.js).

---

## 🧩 Slice 4: Zod (Validación de Datos en Runtime)

TypeScript valida tipos al compilar, pero **Zod valida los datos recibidos de la red en tiempo de ejecución**.

```js
// src/entities/user/model/schema.js
export const GitHubUserSchema = z.object({
  id: z.number(),
  login: z.string(),
  avatar_url: z.string().url(),
  html_url: z.string().url(),
  public_repos: z.number().optional().default(0),
});
```

Si la API responde con un campo nulo o un tipo alterado, Zod lo captura inmediatamente en el adaptador lanzando un error descriptivo antes de que llegue a renderizarse en la interfaz, evitando fallos inesperados de UI.

---

## 🧩 Slice 5: Patrones de Diseño (GoF)

Implementamos tres patrones clásicos integrados en las rebanadas FSD:

### 🔄 1. Patrón Adapter (Estructural)
*   **Archivo:** [adapter.js](file:///c:/Users/LJCR/Documents/GitHub/myprojectapi01/src/entities/user/model/adapter.js)
*   **Propósito:** Traduce variables externas (`public_repos`, `avatar_url`) a campos internos unificados de la aplicación (`repos`, `photo`). Limpia y desacopla la API del resto del código.

### 🧱 2. Patrón Facade (Fachada - Estructural)
*   **Archivos:** [useUserSearchFacade.js](file:///c:/Users/LJCR/Documents/GitHub/myprojectapi01/src/features/search-user/model/useUserSearchFacade.js) y [useUserDetailFacade.js](file:///c:/Users/LJCR/Documents/GitHub/myprojectapi01/src/features/view-user-details/model/useUserDetailFacade.js)
*   **Propósito:** Simplifican el acceso a lógica compleja. Exponen únicamente booleanos limpios (`isLoading`, `isError`, `isSuccess`) y colecciones, abstrayendo a los componentes visuales de hooks de ruta o de consultas a bases de datos.

### 🏭 3. Patrón Factory (Creacional)
*   **Archivo:** [ResultFactory.jsx](file:///c:/Users/LJCR/Documents/GitHub/myprojectapi01/src/entities/user/ui/ResultFactory.jsx)
*   **Propósito:** Decide dinámicamente si instanciar una tarjeta de organización (`OrganizationCard`) o de usuario común (`UserCard`) basándose en el parámetro de tipo devuelto por la API.

---

## 🧩 Slice 6: Identidad Visual, Temas y Cursor Pokéball

### 🎨 Estética Tailwind Website

Inspirada en el sitio oficial de tailwindcss.com, implementa las siguientes directrices estéticas de alta calidad:
*   **Grilla de Fondo:** Una textura elegante de puntos de rejilla mediante la clase `.bg-grid-pattern`.
*   **Tipografía Unificada:** Se utiliza únicamente **Plus Jakarta Sans** para mantener la coherencia y el look SaaS moderno.
*   **Degradados de Color:** Gradiantes dinámicos de color **Indigo-Purple-Pink** aplicados a encabezados y barras de progreso.

### 🌓 Sistema de Doble Tema

El estado del tema conmutado mediante el hook [useTheme.js](file:///c:/Users/LJCR/Documents/GitHub/myprojectapi01/src/shared/lib/hooks/useTheme.js) añade la clase `.dark` a la raíz del documento, actualizando de forma automática los colores semánticos:

| Variable | Tema Claro | Tema Oscuro |
| :--- | :--- | :--- |
| `bg-bg` (Fondo) | `#f8fafc` (Slate 50) | `#030712` (Midnight Black) |
| `bg-surface` (Paneles) | `#ffffff` (Blanco) | `#0f172a` (Slate 900) |
| `border-border` (Bordes) | `#e2e8f0` (Slate 200) | `#1e293b` (Slate 800) |
| `text-text` (Texto) | `#0f172a` (Slate 900) | `#f8fafc` (Slate 50) |
| `text-accent` (Acento) | `#6366f1` (Indigo 500) | `#38bdf8` (Sky 400) |

### 🔴 Cursor Pokéball Interactivo (SVG)

El cursor del navegador se reemplaza por un gráfico vectorial SVG:
*   **Estado General:** Pokébola cerrada rotada en 45 grados. El punto activo de click está configurado en las coordenadas del extremo superior izquierdo (`9 9`).
*   **Estado Hover:** Al situarse sobre botones, inputs, selectores o enlaces, la Pokébola se abre a la mitad mediante transiciones de CSS, revelando una estrella de energía dorada brillante.

---

## 🧩 Slice 7: JavaScript Moderno (Inmutabilidad, Spread, Closures)

### 🔒 Inmutabilidad
Evitamos mutar los datos originales del servidor. Generamos copias nuevas de arrays y objetos usando métodos nativos como `.map()`, `.filter()`, y `.slice()`. Esto permite a React detectar de manera eficiente las actualizaciones comparando referencias en lugar de analizar propiedades internas.

### ⚡ Operador de Propagación (Spread Operator `...`)
Usado en [httpClient.js](file:///c:/Users/LJCR/Documents/GitHub/myprojectapi01/src/shared/api/httpClient.js) para combinar opciones de configuración de red y headers de forma segura sin mutar el objeto original:
```js
const options = {
  ...defaultOptions,
  headers: {
    "Content-Type": "application/json",
    ...customHeaders,
  }
};
```

### 🔐 Closures
El hook [useDebouncedSearch.js](file:///c:/Users/LJCR/Documents/GitHub/myprojectapi01/src/shared/lib/hooks/useDebouncedSearch.js) utiliza closures para "recordar" el valor actual de búsqueda dentro del temporizador de `setTimeout`, cancelando y reiniciando el temporizador si el usuario presiona otra tecla antes de transcurrir 500ms.

---

## 🧩 Slice 8: Buenas Prácticas (SOLID y DRY)

*   **Responsabilidad Única (Single Responsibility):** Cada componente se limita a una función específica. `PageHeader` gestiona el buscador, `BentoStatsGrid` renderiza las estadísticas y `ResultFactory` decide la tarjeta a renderizar.
*   **Inversión de Dependencias:** El adaptador de dominio (`userAdapter`) no conoce la lógica visual ni de red. Las capas exteriores dependen de los tipos y mapeos que dicta esta capa interna.
*   **DRY (Don't Repeat Yourself):** Centralización de estilos a través de componentes utilitarios de Tailwind CSS (`tailwind-card`, `tailwind-input`) y normalización del fetch en `httpClient`.

---

## 🧩 Slice 9: Comandos del Ciclo de Vida del Proyecto

Ejecuta las siguientes instrucciones utilizando tu consola local:

```bash
pnpm install      # Instala las dependencias y prepara el proyecto
pnpm dev          # Inicia el servidor de desarrollo (http://localhost:5173)
pnpm build        # Compila el build de producción optimizado en /dist
pnpm preview      # Previsualiza de manera local la compilación de producción
pnpm lint         # Ejecuta el análisis estático de accesibilidad y ESLint
pnpm test:run     # Ejecuta las pruebas unitarias del proyecto una sola vez
pnpm deploy       # Compila y despliega el proyecto en GitHub Pages
```
