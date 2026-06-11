# GitExplorer — Simulación de Proyecto Ágil (Scrum)

> **Documento de simulación** que recrea cómo se gestionaría este proyecto bajo la metodología Scrum. Creado con fines didácticos para que programadores junior entiendan los artefactos, ceremonias y roles de Scrum a través de un caso real.

---

## 📋 Índice

1. [El Equipo](#-el-equipo)
2. [Product Vision](#-product-vision)
3. [Roadmap de Epics](#-roadmap-de-epics)
4. [Product Backlog — User Stories](#-product-backlog--user-stories)
5. [Sprint 0 — Fundación (Setup + Arquitectura)](#-sprint-0--fundación-setup--arquitectura)
6. [Sprint 1 — Corazón del Producto (Búsqueda + API)](#-sprint-1--corazón-del-producto-búsqueda--api)
7. [Sprint 2 — Detalle de Usuario + Diseño Glassmorphism](#-sprint-2--detalle-de-usuario--diseño-glassmorphism)
8. [Sprint 3 — Calidad, Documentación y Despliegue](#-sprint-3--calidad-documentación-y-despliegue)
9. [Definition of Done (DoD)](#-definition-of-done-dod)
10. [Sprint Reviews](#-sprint-reviews)
11. [Sprint Retrospectives](#-sprint-retrospectives)
12. [Daily Scrum — Ejemplos](#-daily-scrum--ejemplos)
13. [Velocity y Burndown](#-velocity-y-burndown)
14. [Glosario Scrum](#-glosario-scrum)

---

## 👥 El Equipo

| Rol               | Nombre          | Responsabilidad                                                                                    |
| ----------------- | --------------- | -------------------------------------------------------------------------------------------------- |
| **Product Owner** | Ana García      | Define el qué y el porqué. Prioriza el backlog, valida los incrementos, habla con los stakeholders |
| **Scrum Master**  | Carlos López    | Facilita las ceremonias, elimina impedimentos, protege al equipo, asegura que se siga Scrum        |
| **Developer**     | Lucía Martínez  | React, componentes, hooks, TanStack Query, diseño UI/UX                                            |
| **Developer**     | David Rodríguez | API integration, Zod, MSW, testing, performance                                                    |
| **Developer**     | Sofía Ramírez   | Estilos, animaciones, Tailwind, tema claro/oscuro, documentación                                   |

_Nota: En un equipo Scrum real todos los developers son multifuncionales. Esta división es solo para visualizar responsabilidades._

---

## 🎯 Product Vision

> **GitExplorer** es una SPA (Single Page Application) que permite a desarrolladores explorar perfiles de GitHub de forma rápida, visual y sin distracciones. A diferencia de la interfaz nativa de GitHub, GitExplorer ofrece búsqueda con debounce, caché inteligente, diseño glassmorphism con tema dual (claro/oscuro) y una arquitectura limpia de 4 capas que sirve como caso de estudio para buenas prácticas frontend.

---

## 🗺️ Roadmap de Epics

| Epic                             | Descripción                                                                                          | Sprint   | Estado        |
| -------------------------------- | ---------------------------------------------------------------------------------------------------- | -------- | ------------- |
| **E-1: Fundación**               | Setup del proyecto Vite + React, Feature-Sliced Design (FSD), Tailwind v4, ESLint, path aliases               | Sprint 0 | ✅ Completado |
| **E-2: Búsqueda de Usuarios**    | Integración con GitHub API, TanStack Query, debounce, adaptador con Zod, estados loading/error/empty | Sprint 1 | ✅ Completado |
| **E-3: Detalle de Perfil**       | Página de detalle con bento grid, repositorios, datos completos                                      | Sprint 2 | ✅ Completado |
| **E-4: Diseño y Experiencia**    | Glassmorphism, tema claro/oscuro, animaciones, micro-interacciones                                   | Sprint 2 | ✅ Completado |
| **E-5: Calidad y Documentación** | Guías de estudio, documentación Scrum, testing setup, MSW para mocks                                 | Sprint 3 | ✅ Completado |
| **E-6: Despliegue**              | GitHub Pages, build optimizado, base path /myprojectapi01/                                           | Sprint 3 | ✅ Completado |

---

## 📦 Product Backlog — User Stories

### E-1: Fundación

| ID    | User Story                                                                                                                                                                                                     | Prioridad | Story Points |
| ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | :----------: |
| US-01 | **Como** desarrollador, **quiero** tener un proyecto Vite + React con ESLint y configuración estándar **para** empezar a codificar con herramientas modernas listas para usar                                  | 🔥 Alta   |      3       |
| US-02 | **Como** desarrollador, **quiero** tener la estructura de Feature-Sliced Design (FSD) de 4 capas (domain, infrastructure, application, presentation) **para** separar responsabilidades y mantener el código mantenible | 🔥 Alta   |      5       |
| US-03 | **Como** desarrollador, **quiero** tener Tailwind CSS v4 configurado con diseño atómico **para** estilizar componentes rápidamente sin escribir CSS manual                                                     | 🔥 Alta   |      2       |
| US-04 | **Como** desarrollador, **quiero** tener path aliases (`@/*`) configurados **para** importar archivos con rutas absolutas limpias en vez de `../../../`                                                        | 🔥 Alta   |      1       |

### E-2: Búsqueda de Usuarios

| ID    | User Story                                                                                                                                            | Prioridad | Story Points |
| ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | :----------: |
| US-05 | **Como** usuario, **quiero** escribir en un campo de búsqueda **para** encontrar usuarios de GitHub por nombre de usuario                             | 🔥 Alta   |      5       |
| US-06 | **Como** usuario, **quiero** ver resultados con debounce de 500ms **para** no saturar la API mientras escribo                                         | 🔥 Alta   |      3       |
| US-07 | **Como** usuario, **quiero** ver una tarjeta con foto, nombre, bio y estadísticas de cada usuario **para** identificar rápidamente el perfil correcto | 🔥 Alta   |      5       |
| US-08 | **Como** usuario, **quiero** ver un estado de carga (skeleton) mientras se buscan resultados **para** saber que la app está trabajando                | 🔥 Alta   |      3       |
| US-09 | **Como** usuario, **quiero** ver un mensaje amigable cuando no hay resultados **para** entender que no existe ese usuario                             | 🔥 Alta   |      2       |
| US-10 | **Como** usuario, **quiero** ver un mensaje de error cuando la API falla **para** saber qué pasó y poder reintentar                                   | 🔥 Alta   |      3       |
| US-11 | **Como** desarrollador, **quiero** validar los datos de la API con Zod **para** garantizar que la app nunca reciba datos corruptos o inesperados      | 🔥 Alta   |      3       |

### E-3: Detalle de Perfil

| ID    | User Story                                                                                                                              | Prioridad | Story Points |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------- | --------- | :----------: |
| US-12 | **Como** usuario, **quiero** hacer clic en una tarjeta de usuario **para** ver su perfil completo con toda su información               | 🔥 Alta   |      8       |
| US-13 | **Como** usuario, **quiero** ver el perfil en un layout tipo bento grid **para** tener una vista moderna y organizada de la información | 🔥 Alta   |      5       |
| US-14 | **Como** usuario, **quiero** ver un skeleton del detalle mientras carga **para** no ver una pantalla en blanco                          | 🔥 Alta   |      2       |

### E-4: Diseño y Experiencia

| ID    | User Story                                                                                                                                       | Prioridad | Story Points |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------ | --------- | :----------: |
| US-15 | **Como** usuario, **quiero** una interfaz con efecto glassmorphism **para** una experiencia visual moderna y atractiva                           | 🔥 Alta   |      5       |
| US-16 | **Como** usuario, **quiero** poder cambiar entre tema claro ("Holographic Terminal") y oscuro ("Cyberpunk") **para** adaptar la app a mi entorno | 🔥 Alta   |      3       |
| US-17 | **Como** usuario, **quiero** que la experiencia sea inmersiva sin navbar **para** concentrarme en la búsqueda desde el primer momento            | 🔥 Alta   |      1       |
| US-18 | **Como** usuario, **quiero** animaciones suaves al navegar entre páginas **para** una experiencia fluida y agradable                             | 🔥 Media  |      3       |
| US-19 | **Como** usuario, **quiero** ver una tarjeta con glow accent al hacer hover **para** sentir que los elementos son interactivos                   | 🔥 Media  |      2       |
| US-20 | **Como** usuario, **quiero** que el diseño sea responsive **para** usar la app desde el celular                                                  | 🔥 Media  |      3       |

### E-5: Calidad y Documentación

| ID    | User Story                                                                                                                      | Prioridad | Story Points |
| ----- | ------------------------------------------------------------------------------------------------------------------------------- | --------- | :----------: |
| US-21 | **Como** desarrollador, **quiero** tener mocks con MSW **para** desarrollar y testear sin conexión a internet                   | 🔥 Media  |      5       |
| US-22 | **Como** desarrollador, **quiero** tener una guía de estudio completa **para** aprender React y las buenas prácticas desde cero | 🔥 Media  |      5       |
| US-23 | **Como** desarrollador, **quiero** tener documentación de la arquitectura **para** entender cómo está organizado el proyecto    | 🔥 Media  |      3       |
| US-24 | **Como** desarrollador, **quiero** TODO el proyecto pase ESLint sin warnings **para** mantener calidad de código constante      | 🔥 Alta   |      2       |
| US-25 | **Como** desarrollador, **quiero** tener configurado Vitest **para** poder escribir tests unitarios y de integración            | 🔥 Baja   |      3       |

### E-6: Despliegue

| ID    | User Story                                                                                                                           | Prioridad | Story Points |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------ | --------- | :----------: |
| US-26 | **Como** usuario, **quiero** que la app esté disponible en GitHub Pages **para** acceder desde cualquier navegador sin instalar nada | 🔥 Alta   |      3       |
| US-27 | **Como** usuario, **quiero** que la app cargue rápido con lazy loading **para** no esperar mucho en la primera visita                | 🔥 Media  |      3       |
| US-28 | **Como** usuario, **quiero** que la caché de TanStack Query evite llamadas innecesarias a la API **para** una experiencia más rápida | 🔥 Alta   |      2       |

---

## 🏃 Sprint 0 — Fundación (Setup + Arquitectura)

### Sprint Planning

| Aspecto                | Detalle                                                                        |
| ---------------------- | ------------------------------------------------------------------------------ |
| **Sprint Goal**        | Establecer la base técnica del proyecto: tooling, arquitectura y diseño visual |
| **Duración**           | 1 semana                                                                       |
| **Sprint Backlog**     | US-01, US-02, US-03, US-04                                                     |
| **Total Story Points** | 11                                                                             |
| **Capacity**           | 3 developers × 5 días = 15 días-hombre                                         |

### Tareas Técnicas

```
US-01 (3 pts) — Setup Vite + React + ESLint
  ├── Task-01: Scaffold Vite con template React (01-LJCR GitHub)
  ├── Task-02: Configurar ESLint con reglas jsx-a11y y react-hooks
  ├── Task-03: Configurar pnpm como package manager
  └── Task-04: Verificar que `pnpm dev` y `pnpm build` funcionan

US-02 (5 pts) — Feature-Sliced Design (FSD) de 4 capas
  ├── Task-05: Crear carpetas: domain/, infrastructure/, application/, presentation/
  ├── Task-06: Implementar layer structure con archivos placeholder
  ├── Task-07: Configurar path alias @/* en vite.config.js
  └── Task-08: Crear ApiError en domain/errors/

US-03 (2 pts) — Tailwind CSS v4
  ├── Task-09: Instalar tailwindcss @tailwindcss/vite
  ├── Task-10: Configurar @import "tailwindcss" en index.css
  └── Task-11: Verificar que las clases utilitarias funcionan

US-04 (1 pt) — Path Aliases
  └── Task-12: Verificar que `import {...} from "@/lib/utils"` funciona
```

### Sprint Backlog Board

| To Do   | In Progress | Done                          |
| ------- | ----------- | ----------------------------- |
| Task-01 |             | ✅ Task-01 — Setup Vite       |
| Task-02 |             | ✅ Task-02 — ESLint           |
| Task-03 |             | ✅ Task-03 — pnpm             |
| Task-04 |             | ✅ Task-04 — build check      |
| Task-05 |             | ✅ Task-05 — carpetas         |
| Task-06 |             | ✅ Task-06 — placeholders     |
| Task-07 |             | ✅ Task-07 — path aliases     |
| Task-08 |             | ✅ Task-08 — ApiError         |
| Task-09 |             | ✅ Task-09 — Tailwind install |
| Task-10 |             | ✅ Task-10 — CSS config       |
| Task-11 |             | ✅ Task-11 — verify classes   |
|         |             | ✅ Task-12 — alias check      |

### Daily Scrum — Ejemplo Día 3

```
Lucía: Ayer terminé Task-05 y Task-06 (estructura de capas).
       Hoy voy con Task-07 (path aliases) y Task-08 (ApiError).
       Sin bloqueos.

David: Ayer configuré ESLint (Task-02) y verifiqué el build (Task-04).
       Hoy Task-09 y Task-10 (Tailwind).
       Sin bloqueos.

Sofía: Ayer hice Task-01 (scaffold Vite) y Task-03 (pnpm).
       Hoy ayudo con Task-08 (ApiError) y empiezo a investigar glassmorphism.
       Sin bloqueos.
```

### Sprint Review

```diff
+ ✅ Vite + React 18 funcionando con HMR
+ ✅ ESLint con reglas de accesibilidad y hooks
+ ✅ Tailwind CSS v4 configurado y probado
+ ✅ Feature-Sliced Design (FSD) con 4 capas y path aliases
+ ✅ ApiError personalizado creado
+ ✅ pnpm dev, build, lint funcionan sin errores
```

**Demo**: Se muestra `pnpm dev` arrancando el server, se verifica ESLint pasando limpio, se muestra el build exitoso.

### Sprint Retrospective

| 👍 What went well                        | 👎 What to improve                                        | 🔧 Action items                                          |
| ---------------------------------------- | --------------------------------------------------------- | -------------------------------------------------------- |
| Buena coordinación inicial               | Subestimamos la configuración de ESLint                   | Investigar plugins ESLint antes del Sprint Planning      |
| Path aliases funcionaron a la primera    | Nos faltó definir la convención de nombres desde el día 1 | Escribir AGENTS.md con code style guidelines en Sprint 1 |
| Tailwind v4 se integró fácil             |                                                           |                                                          |
| Feature-Sliced Design (FSD) clara desde el inicio |                                                           |                                                          |

---

## 🏃 Sprint 1 — Corazón del Producto (Búsqueda + API)

### Sprint Planning

| Aspecto                | Detalle                                                                                                              |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **Sprint Goal**        | Implementar la funcionalidad principal de búsqueda de usuarios de GitHub con validación de datos y manejo de estados |
| **Duración**           | 2 semanas                                                                                                            |
| **Sprint Backlog**     | US-05, US-06, US-07, US-08, US-09, US-10, US-11                                                                      |
| **Total Story Points** | 24                                                                                                                   |
| **Capacity**           | 3 developers × 10 días = 30 días-hombre                                                                              |

### Tareas Técnicas

```
US-05 (5 pts) — Input de búsqueda + fetch a GitHub API
  ├── Task-13: Crear httpClient.js (wrapper de fetch con signal y errores)
  ├── Task-14: Crear userService.js (fetchUsersAPI)
  ├── Task-15: Crear PageHeader.jsx con el input de búsqueda
  ├── Task-16: Conectar input con TanStack Query
  └── Task-17: Mostrar resultados básicos en consola

US-06 (3 pts) — Debounce
  ├── Task-18: Crear hook useDebouncedSearch.js
  └── Task-19: Integrar debounce de 500ms en UserSearch

US-07 (5 pts) — Tarjeta de usuario
  ├── Task-20: Crear domain/schemas/user.js (Zod)
  ├── Task-21: Crear domain/adapters/userAdapter.js
  ├── Task-22: Crear UserCard.jsx (foto, nombre, bio, stats)
  ├── Task-23: Crear UserList.jsx (grid de tarjetas)
  └── Task-24: Conectar adapter en el flujo de datos

US-08 (3 pts) — Skeleton de carga
  ├── Task-25: Crear SkeletonCard.jsx
  └── Task-26: Crear SkeletonGrid.jsx

US-09 (2 pts) — Estado vacío
  └── Task-27: Crear NotFound.jsx

US-10 (3 pts) — Estado de error
  └── Task-28: Crear ErrorDisplay.jsx con botón de retry

US-11 (3 pts) — Zod validation
  └── Task-29: Integrar Zod parse en userAdapter con manejo de ZodError (ApiError 422)
```

### Sprint Backlog Board (Fin del Sprint)

```
✅ US-05 — Input + API fetch
✅ US-06 — Debounce 500ms
✅ US-07 — Tarjetas con datos reales
✅ US-08 — Skeleton de carga
✅ US-09 — NotFound cuando no hay resultados
✅ US-10 — ErrorDisplay con retry
✅ US-11 — Zod validation en adapter
```

### Daily Scrum — Ejemplo Día 7

```
David: Ayer terminé httpClient (Task-13) con el AbortSignal y los errores HTTP.
       Hoy Task-14: userService.js. Necesito definir la URL base de GitHub API.
       Bloqueo: ¿usamos MSW desde ahora o primero conectamos con API real?

Ana (PO): Primero API real para validar el flujo. MSW lo dejamos para Sprint 3.

Sofía: Ayer avancé PageHeader (Task-15) con el glass-input.
       Hoy Task-16: conectar el input con TanStack Query.
       Sin bloqueos.
```

### Sprint Review

```diff
+ ✅ Búsqueda de usuarios funcionando con debounce de 500ms
+ ✅ Tarjetas con foto, nombre, bio, repos, followers, following
+ ✅ Skeleton de carga con 6 placeholders animados
+ ✅ NotFound: "No se encontraron usuarios para 'xyz'"
+ ✅ ErrorDisplay: panel de diagnóstico con SYS_DIAGNOSTICS y botón retry
+ ✅ Zod valida cada usuario: si un campo falta, se rechaza con 422
+ ✅ Todo el flujo pasa por Feature-Sliced Design (FSD): Page → Widget → Feature (Facade) → Entity (Query/Adapter) → Shared (HTTP Client)
```

**Demo**: Se abre la app, se escribe "mojombo" en el input, aparecen tarjetas glass con datos reales. Se escribe un string sin resultados, aparece NotFound. Se desconecta internet, aparece ErrorDisplay.

### Sprint Retrospective

| 👍 What went well                                       | 👎 What to improve                                                      | 🔧 Action items                                              |
| ------------------------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------ |
| TanStack Query funcionó como esperábamos                | El adapter de colecciones (usersCollectionAdapter) lo hicimos dos veces | Revisar si realmente necesitamos adapter de colección aparte |
| Zod atrapó datos inválidos de la API real               | No documentamos los query keys de TanStack Query                        | Agregar sección de TanStack Query en README                  |
| El debounce se integró muy limpio                       |                                                                         |                                                              |
| Los estados de carga/error/empty cubren todos los casos |                                                                         |                                                              |

---

## 🏃 Sprint 2 — Detalle de Usuario + Diseño Glassmorphism

### Sprint Planning

| Aspecto                | Detalle                                                                                                         |
| ---------------------- | --------------------------------------------------------------------------------------------------------------- |
| **Sprint Goal**        | Implementar la página de detalle de usuario con bento grid y rediseñar toda la UI con glassmorphism + tema dual |
| **Duración**           | 2 semanas                                                                                                       |
| **Sprint Backlog**     | US-12, US-13, US-14, US-15, US-16, US-17, US-18, US-19, US-20                                                   |
| **Total Story Points** | 32                                                                                                              |
| **Capacity**           | 3 developers × 10 días = 30 días-hombre                                                                         |

### Tareas Técnicas

```
US-12 (8 pts) — Página de detalle
  ├── Task-30: Crear useUserDetailQuery.js
  ├── Task-31: Crear userService.js — fetchUserDetailAPI
  ├── Task-32: Crear UserDetail.jsx con datos completos
  ├── Task-33: Configurar ruta /user/:login en App.jsx
  ├── Task-34: Navegación desde UserCard al detalle
  └── Task-35: Manejar loading/error/empty en detalle

US-13 (5 pts) — Bento grid
  ├── Task-36: Diseñar layout bento grid (2 columnas, celdas irregulares)
  └── Task-37: Poblar cada celda (avatar, bio, stats, repos, etc.)

US-14 (2 pts) — Skeleton de detalle
  └── Task-38: Crear UserDetailSkeleton.jsx

US-15 (5 pts) — Rediseño glassmorphism
  ├── Task-39: Definir variables CSS glass en :root y .dark
  ├── Task-40: Crear clases utilitarias (.glass, .glass-card, .glass-input, .btn-glass)
  └── Task-41: Aplicar glass a UserCard, PageHeader, NotFound, ErrorDisplay

US-16 (3 pts) — Tema dual
  ├── Task-42: Crear useTheme.js (toggle light/dark)
  ├── Task-43: Crear ThemeToggle.jsx
  └── Task-44: Definir colores claros y oscuros en CSS

US-17 (1 pt) — Sin navbar
  └── Task-45: Eliminar navbar de App.jsx, flujo inicia en hero

US-18 (3 pts) — Animaciones
  ├── Task-46: Agregar Motion v12 con animaciones de entrada
  └── Task-47: Animar transiciones entre rutas

US-19 (2 pts) — Hover effects
  └── Task-48: Agregar glow accent en hover de tarjetas

US-20 (3 pts) — Responsive
  └── Task-49: Ajustar layout para mobile (stack en lugar de grid)
```

### Sprint Backlog Board (Fin del Sprint)

```
✅ US-12 — UserDetail con datos completos
✅ US-13 — Bento grid layout
✅ US-14 — Skeleton de detalle
✅ US-15 — Glassmorphism en toda la UI
✅ US-16 — Tema claro/oscuro con toggle
✅ US-17 — Navbar eliminado
✅ US-18 — Animaciones con Motion
✅ US-19 — Hover glow en tarjetas
✅ US-20 — Diseño responsive
```

### Daily Scrum — Ejemplo Día 14

```
Sofía: Ayer terminé las variables CSS de glassmorphism (Task-39) con :root y .dark.
       Hoy Task-40: clases utilitarias y Task-41: aplicar a todos los componentes.
       Bloqueo: Tailwind v4 no soporta @apply con clases personalizadas.

Scrum Master: Investigamos alternativa. Podemos aplicar las propiedades directamente
               en las clases CSS en index.css sin usar @apply.

David: Ayer hice Task-30 y Task-31 (query de detalle + servicio).
       Hoy Task-32: UserDetail.jsx. Necesito el schema Zod extendido para detalle.
       Sin bloqueos.

Lucía: Ayer Task-36: diseño del bento grid. Hoy Task-37: poblar celdas.
       Sin bloqueos.
```

### Sprint Review

```diff
+ ✅ Página de detalle con bento grid (avatar, bio, stats, repos, metadata)
+ ✅ Navegación desde UserCard a /user/:login con React Router
+ ✅ Skeleton de detalle con 6 áreas de carga
+ ✅ Glassmorphism completo: .glass-card, .glass-input, .btn-glass, .badge
+ ✅ Tema claro "Holographic Terminal" (fondo #F0EDE8, acento teal)
+ ✅ Tema oscuro "Cyberpunk" (fondo #0A0A0F, acento cyan #00F0FF)
+ ✅ ThemeToggle con sol/luna animado
+ ✅ Sin navbar — UX inmersiva desde el hero
+ ✅ Animaciones de entrada con Motion v12
+ ✅ Hover glow accent en tarjetas
+ ✅ Responsive: mobile stack, desktop grid
```

**Demo**: Se recorre el flujo completo: buscar usuario → ver tarjeta → clic → ver detalle en bento grid. Se togglea tema claro/oscuro. Se redimensiona el navegador a mobile. Se muestra el hover glow.

### Sprint Retrospective

| 👍 What went well                                               | 👎 What to improve                                    | 🔧 Action items                                                 |
| --------------------------------------------------------------- | ----------------------------------------------------- | --------------------------------------------------------------- |
| El rediseño glassmorphism quedó muy profesional                 | No anticipamos la limitación de @apply en Tailwind v4 | Documentar en AGENTS.md: "Never use @apply with custom classes" |
| Los dos temas son visualmente muy distintos                     | El bento grid en mobile necesitó ajustes extra        | Probar responsive desde el principio del diseño                 |
| Motion v12 se integró sin problemas                             |                                                       |                                                                 |
| El equipo se coordinó bien a pesar de las dependencias cruzadas |                                                       |                                                                 |

---

## 🏃 Sprint 3 — Calidad, Documentación y Despliegue

### Sprint Planning

| Aspecto                | Detalle                                                                                                             |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Sprint Goal**        | Completar la documentación, agregar MSW para mocks, configurar testing, asegurar calidad y desplegar a GitHub Pages |
| **Duración**           | 1 semana                                                                                                            |
| **Sprint Backlog**     | US-21, US-22, US-23, US-24, US-25, US-26, US-27, US-28                                                              |
| **Total Story Points** | 26                                                                                                                  |
| **Capacity**           | 3 developers × 5 días = 15 días-hombre                                                                              |

### Tareas Técnicas

```
US-21 (5 pts) — MSW
  ├── Task-50: Instalar msw
  ├── Task-51: Crear handlers.js con mocks de GitHub API
  ├── Task-52: Crear browser.js (worker)
  └── Task-53: Configurar MSW en main.jsx (solo dev)

US-22 (5 pts) — Guía de estudio
  ├── Task-54: Escribir GUIA_ESTUDIO.md (React desde cero)
  └── Task-55: Escribir PRUEBA_TECNICA.md (simulación de entrevista)

US-23 (3 pts) — Documentación de arquitectura
  ├── Task-56: Escribir 01-Guia-del-Proyecto.md
  ├── Task-57: Escribir 02-Arquitectura-y-Patrones.md
  └── Task-58: Escribir 03-Guia-de-Desarrollo.md

US-24 (2 pts) — ESLint clean
  └── Task-59: Ejecutar pnpm lint y corregir todos los warnings/errors

US-25 (3 pts) — Vitest setup
  ├── Task-60: Instalar vitest, @vitest/ui, jsdom
  └── Task-61: Agregar scripts test en package.json

US-26 (3 pts) — Despliegue GitHub Pages
  ├── Task-62: Configurar base: "/myprojectapi01/" en vite.config.js
  ├── Task-63: Instalar gh-pages
  └── Task-64: Crear script deploy en package.json

US-27 (3 pts) — Lazy loading
  └── Task-65: Implementar React.lazy() + Suspense en las rutas

US-28 (2 pts) — Caché TanStack Query
  └── Task-66: Configurar staleTime, gcTime, retry en QueryClient
```

### Sprint Backlog Board (Fin del Sprint)

```
✅ US-21 — MSW mockeando GitHub API
✅ US-22 — GUIA_ESTUDIO.md y PRUEBA_TECNICA.md
✅ US-23 — Documentación de proyecto y arquitectura
✅ US-24 — ESLint 0 warnings, 0 errors
✅ US-25 — Vitest instalado (sin tests aún)
✅ US-26 — Deploy a GitHub Pages funcionando
✅ US-27 — Lazy loading en rutas
✅ US-28 — Caché optimizada (staleTime 5min, gcTime 10min)
```

### Daily Scrum — Ejemplo Día 18

```
David: Ayer Task-50 y Task-51 (MSW instalado, handlers creados).
       Hoy Task-52 y Task-53: conectar MSW en main.jsx.
       Bloqueo: MSW en producción no debe ejecutarse.

Sofía: Ya lo discutimos: solo se activa con import.meta.env.DEV.
       Ayer escribí GUIA_ESTUDIO.md (Task-54) — 30 páginas.
       Hoy Task-55: PRUEBA_TECNICA.md.
       Sin bloqueos.

Lucía: Ayer Task-62 y Task-63 (base path y gh-pages).
       Hoy Task-64: script deploy. Probamos deploy con pnpm deploy.
       Sin bloqueos.
```

### Sprint Review

```diff
+ ✅ MSW intercepta peticiones en desarrollo, silencioso en producción
+ ✅ GUIA_ESTUDIO.md: guía completa de React desde cero (libro)
+ ✅ PRUEBA_TECNICA.md: simulación de entrevista técnica frontend
+ ✅ 01-Guia-del-Proyecto.md, 02-Arquitectura-y-Patrones.md, 03-Guia-de-Desarrollo.md
+ ✅ pnpm lint pasa con 0 warnings
+ ✅ Vitest instalado y listo para escribir tests
+ ✅ pnpm deploy sube a GitHub Pages exitosamente
+ ✅ Lazy loading con React.lazy() + Suspense + fallback animado
+ ✅ QueryClient con staleTime 5min, gcTime 10min, retry 1, refetchOnWindowFocus false
```

**Demo**: Se muestra `pnpm lint` pasando limpio. Se abre la app con MSW activo (sin internet). Se muestra lazy loading en la consola (Network tab). Se ejecuta `pnpm deploy` y se abre la URL de GitHub Pages.

### Sprint Retrospective

| 👍 What went well                       | 👎 What to improve                                     | 🔧 Action items                                            |
| --------------------------------------- | ------------------------------------------------------ | ---------------------------------------------------------- |
| Documentación completa y en español     | No escribimos tests reales                             | Para el próximo proyecto, escribir tests desde el Sprint 1 |
| MSW funcionó perfecto                   | La config de gh-pages nos tomó más tiempo del estimado | Documentar el paso a paso del deploy                       |
| ESLint 0 warnings se logró              |                                                        |                                                            |
| Lazy loading fue trivial de implementar |                                                        |                                                            |

---

## 📋 Definition of Done (DoD)

Cada User Story debe cumplir TODOS estos criterios para considerarse "Done":

### Código

- [ ] El código sigue Feature-Sliced Design (FSD) (capa correcta, sin fugas de dependencias)
- [ ] El código sigue las convenciones de nombres (PascalCase componentes, camelCase hooks, etc.)
- [ ] El código pasa `pnpm lint` sin warnings ni errors
- [ ] No hay `console.log` en producción
- [ ] PropTypes definidos para todos los componentes
- [ ] JSDoc en funciones y componentes públicos

### Funcionalidad

- [ ] La feature funciona según los criterios de aceptación
- [ ] Todos los estados están cubiertos: loading, success, error, empty
- [ ] Funciona en modo responsive (mobile y desktop)
- [ ] Funciona en tema claro y oscuro

### Integración

- [ ] `pnpm build` compila sin errores
- [ ] No rompe ninguna otra funcionalidad existente
- [ ] Los imports usan path alias `@/*`

### Documentación

- [ ] Si la feature agrega una nueva librería, se documenta en README
- [ ] Si la feature cambia la arquitectura, se actualiza la documentación

---

## 🎤 Sprint Reviews

### Sprint 0 Review

**Fecha**: Semana 1
**Asistentes**: Todo el equipo + Stakeholders (simulado)
**Demo**:

1. `pnpm dev` → server arranca en 2 segundos
2. `pnpm lint` → 0 problemas
3. Tree del proyecto muestra estructura de 4 capas
4. `import { cn } from "@/lib/utils"` funciona

**Feedback**:

- Stakeholder: "Me gusta la estructura limpia. ¿Podemos ver algo visual la próxima semana?"
- PO: "Prioridad máxima: tener la búsqueda funcionando en Sprint 1"

### Sprint 1 Review

**Fecha**: Semana 3
**Asistentes**: Todo el equipo + Stakeholders (simulado)
**Demo**:

1. Buscar "mojombo" → 6 tarjetas con foto y datos
2. Buscar "asdfghjk12345xyz" → NotFound: "No se encontraron usuarios"
3. Desconectar internet → ErrorDisplay con botón Retry
4. Mostrar skeleton cards mientras carga

**Feedback**:

- Stakeholder: "¡Increíble! La velocidad del debounce se siente muy natural"
- Stakeholder: "¿Se puede hacer clic en una tarjeta y ver más detalles?"
- PO: "Anotado para Sprint 2 — User Detail page"

### Sprint 2 Review

**Fecha**: Semana 5
**Asistentes**: Todo el equipo + Stakeholders (simulado)
**Demo**:

1. Flujo completo: buscar → tarjeta → clic → detalle en bento grid
2. Tema claro (Holographic Terminal) ↔ oscuro (Cyberpunk)
3. Efecto glassmorphism con blur, hover glow, animaciones
4. Responsive: mobile, tablet, desktop
5. Sin navbar — UX inmersiva

**Feedback**:

- Stakeholder: "El glassmorphism quedó espectacular. Los dos temas son muy distintos y ambos se ven premium"
- Stakeholder: "El bento grid es muy atractivo visualmente"
- PO: "¿Podemos agregar la guía de estudio que mencionamos?"

### Sprint 3 Review

**Fecha**: Semana 6
**Asistentes**: Todo el equipo + Stakeholders (simulado)
**Demo**:

1. MSW activo: app funciona sin internet
2. `pnpm lint` → 0 warnings
3. `pnpm build` → build exitoso
4. `pnpm deploy` → app en GitHub Pages
5. Lazy loading visible en Network tab
6. Documentación completa: 5 archivos en src/docs/

**Feedback**:

- Stakeholder: "Excelente. La app está lista para producción"
- Stakeholder: "La documentación es muy completa, especialmente la guía de estudio"
- PO: "Producto finalizado. Pasamos a mantenimiento"

---

## 🔄 Sprint Retrospectives

### Sprint 0 Retro

| Fecha    | Participantes                    |
| -------- | -------------------------------- |
| Semana 1 | Lucía, David, Sofía, Carlos (SM) |

**Grabación**: Reunión presencial, 30 minutos.

**Método**: Start / Stop / Continue

| Start                                  | Stop                                      | Continue                             |
| -------------------------------------- | ----------------------------------------- | ------------------------------------ |
| Documentar convenciones desde el día 1 | Asumir configuraciones sin verificar docs | Buena comunicación inicial           |
| Definir DoD antes del Sprint 1         |                                           | Pair programming en tareas complejas |
|                                        |                                           | Código limpio desde el inicio        |

**Action Items**:

1. 🔧 Escribir AGENTS.md con code style guidelines (Sofía)
2. 🔧 Investigar plugins ESLint antes del próximo Sprint Planning (David)

### Sprint 1 Retro

| Fecha    | Participantes                    |
| -------- | -------------------------------- |
| Semana 3 | Lucía, David, Sofía, Carlos (SM) |

**Grabación**: Reunión virtual, 45 minutos.

**Método**: Glad, Sad, Mad

| Glad                             | Sad                                         | Mad                                          |
| -------------------------------- | ------------------------------------------- | -------------------------------------------- |
| TanStack Query funcionó perfecto | No documentamos query keys                  | La API de GitHub rate-limit nos frenó un día |
| Zod atrapó datos inválidos       | El adapter de colecciones se hizo dos veces |                                              |
| Debounce muy limpio              |                                             |                                              |

**Action Items**:

1. 🔧 Documentar query keys en README (Lucía)
2. 🔧 Evaluar si realmente necesitamos usersCollectionAdapter (David)

### Sprint 2 Retro

| Fecha    | Participantes                    |
| -------- | -------------------------------- |
| Semana 5 | Lucía, David, Sofía, Carlos (SM) |

**Grabación**: Reunión presencial, 40 minutos.

**Método**: 4 L's (Liked, Learned, Lacked, Longed For)

| Liked                        | Learned                       | Lacked                                | Longed For          |
| ---------------------------- | ----------------------------- | ------------------------------------- | ------------------- |
| Glassmorphism espectacular   | Tailwind v4 no soporta @apply | Pruebas responsive desde el principio | Tests automatizados |
| Dos temas muy distintos      |                               | Documentación del diseño system       |                     |
| Motion v12 fácil integración |                               |                                       |                     |

**Action Items**:

1. 🔧 Agregar a AGENTS.md: "Never use @apply with custom classes" (Sofía)
2. 🔧 Probar responsive desde el principio del diseño (todo el equipo)

### Sprint 3 Retro

| Fecha    | Participantes                    |
| -------- | -------------------------------- |
| Semana 6 | Lucía, David, Sofía, Carlos (SM) |

**Grabación**: Reunión presencial, 30 minutos.

**Método**: Ship / Anchor / Iceberg / Lighthouse

| Ship (continuar)         | Anchor (dejar de hacer)       | Iceberg (riesgo)                 | Lighthouse (aspirar)              |
| ------------------------ | ----------------------------- | -------------------------------- | --------------------------------- |
| Documentación exhaustiva | Esperar al final para testing | Deuda técnica por falta de tests | Tests desde Sprint 1              |
| MSW desde desarrollo     |                               |                                  | TypeScript en el próximo proyecto |
| Code reviews             |                               |                                  |                                   |

**Action Items**:

1. 🔧 Para el próximo proyecto: escribir tests desde el Sprint 1 (todo el equipo)
2. 🔧 Documentar paso a paso del deploy a GitHub Pages (Lucía)

---

## ☀️ Daily Scrum — Ejemplos

### Formato estándar

Cada developer responde 3 preguntas:

1. **¿Qué hice ayer que ayudó al equipo a cumplir el Sprint Goal?**
2. **¿Qué voy a hacer hoy para ayudar al equipo a cumplir el Sprint Goal?**
3. **¿Veo algún impedimento que bloquee a mí o al equipo?**

### Día 1 — Sprint 1

```
Lucía: Ayer terminé el scaffold de Vite (Task-01).
       Hoy Task-13: crear httpClient.js con fetch wrapper.
       Sin bloqueos.

David: Ayer configuré ESLint (Task-02).
       Hoy Task-14: userService.js con fetchUsersAPI.
       Sin bloqueos.

Sofía: Ayer hice el setup de Tailwind (Task-09, Task-10).
       Hoy Task-15: PageHeader.jsx con el input de búsqueda.
       Sin bloqueos.
```

### Día 5 — Sprint 1

```
David: Ayer terminé userService.js y conecté el fetch con signal.
       Hoy Task-16: conectar input con TanStack Query.
       Bloqueo: Necesito la query key convention definida.

Lucía: Ya la definimos: ["users", searchTerm]. Hoy Task-17: mostrar resultados.
       Sin bloqueos.

Sofía: Ayer PageHeader con glass-input listo.
       Hoy Task-18: hook useDebouncedSearch.js.
       Sin bloqueos.
```

### Día 10 — Sprint 2

```
Sofía: Ayer terminé las variables CSS del tema claro/oscuro.
       Hoy Task-42: crear useTheme.js con toggle.
       Sin bloqueos.

Lucía: Ayer UserCard con glassmorphism aplicado.
       Hoy Task-43: ThemeToggle.jsx con icono sol/luna.
       Bloqueo: Lucide React no tiene icono de GitHub, usamos Globe.

David: Ayer MSW handlers funcionando.
       Hoy Task-44: definir colores oscuros en CSS.
       Sin bloqueos.
```

---

## 📊 Velocity y Burndown

### Velocity por Sprint

|    Sprint    | Story Points Planificados | Story Points Completados | Velocidad |
| :----------: | :-----------------------: | :----------------------: | :-------: |
|      0       |            11             |            11            |    11     |
|      1       |            24             |            24            |    24     |
|      2       |            32             |            32            |    32     |
|      3       |            26             |            26            |    26     |
| **Promedio** |                           |                          | **23.25** |

_La velocidad se usa para estimar cuántos Story Points el equipo puede completar en futuros sprints._

### Burndown Chart Conceptual

```
Story Points
   35 │
      │  📉 Sprint 1 (24 pts)
   30 │  │
      │  │
   25 │  │   📉 Sprint 2 (32 pts)
      │  │   │
   20 │  │   │
      │  │   │
   15 │  │   │   📉 Sprint 3 (26 pts)
      │  │   │   │
   10 │  │   │   │   📉 Sprint 0 (11 pts)
      │  │   │   │   │
    5 │  │   │   │   │
      │  │   │   │   │
    0 └──┴───┴───┴───┴──────────
         S0   S1   S2   S3
         ↑    ↑    ↑    ↑
       Sprint Reviews
```

En un burndown real, la línea ideal baja en diagonal desde el total de puntos hasta cero. La línea real muestra el trabajo pendiente día a día. Si la línea real está por encima de la ideal, el equipo está atrasado.

### Capacidad del Equipo

| Sprint | Días | Developers | Días-Hombre | SP Completados | SP / Día-Hombre |
| :----: | :--: | :--------: | :---------: | :------------: | :-------------: |
|   0    |  5   |     3      |     15      |       11       |      0.73       |
|   1    |  10  |     3      |     30      |       24       |      0.80       |
|   2    |  10  |     3      |     30      |       32       |      1.07       |
|   3    |  5   |     3      |     15      |       26       |      1.73       |

_La mejora en eficiencia se debe a que el equipo se fue familiarizando con el código y las herramientas._

---

## 📚 Glosario Scrum

| Término                      | Definición                                                                                                                              |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Sprint**                   | Período de tiempo fijo (1-4 semanas) en el que el equipo crea un incremento de producto potencialmente entregable                       |
| **Sprint Goal**              | Objetivo único que el equipo se compromete a lograr durante el Sprint                                                                   |
| **Product Backlog**          | Lista priorizada de todo lo que podría necesitarse en el producto. Viva, dinámica, nunca completa                                       |
| **Sprint Backlog**           | Subconjunto del Product Backlog que el equipo selecciona para un Sprint específico, más el plan para entregarlo                         |
| **Increment**                | Suma de todos los Product Backlog Items completados durante un Sprint, más los incrementos de Sprints anteriores                        |
| **User Story**               | Descripción corta de una funcionalidad desde la perspectiva del usuario final. Formato: "Como [rol], quiero [acción], para [beneficio]" |
| **Story Points**             | Unidad de medida relativa para estimar el esfuerzo de una User Story. Considera complejidad, riesgo y esfuerzo, NO horas                |
| **Definition of Done (DoD)** | Lista de criterios que cada User Story debe cumplir para considerarse "terminada"                                                       |
| **Epic**                     | User Story muy grande que se descompone en historias más pequeñas                                                                       |
| **Velocity**                 | Cantidad de Story Points que el equipo completa en promedio por Sprint. Se usa para pronosticar                                         |
| **Burndown Chart**           | Gráfico que muestra el trabajo restante a lo largo del tiempo del Sprint                                                                |
| **Product Owner**            | Rol responsable de maximizar el valor del producto. Prioriza el backlog, define las historias, valida los incrementos                   |
| **Scrum Master**             | Rol responsable de asegurar que Scrum se entienda y se aplique. Elimina impedimentos, facilita ceremonias                               |
| **Developer**                | Rol multifuncional responsable de crear el incremento. Diseña, codifica, testea y documenta                                             |
| **Sprint Planning**          | Ceremonia donde el equipo selecciona las historias del Sprint y define cómo las va a completar                                          |
| **Daily Scrum**              | Reunión diaria de 15 minutos donde los developers sincronizan su trabajo y ajustan planes                                               |
| **Sprint Review**            | Ceremonia al final del Sprint donde el equipo muestra el incremento a los stakeholders y recibe feedback                                |
| **Sprint Retrospective**     | Ceremonia donde el equipo inspecciona cómo fue el Sprint y crea un plan de mejora para el siguiente                                     |
| **Impediment**               | Cualquier cosa que bloquea al equipo y el Scrum Master debe eliminar                                                                    |
| **Time-box**                 | Duración máxima fija para una ceremonia o Sprint. No se extiende, se recorta el alcance                                                 |
| **INVEST**                   | Acrónimo para buenas User Stories: Independent, Negotiable, Valuable, Estimable, Small, Testable                                        |

---

## 🏁 Conclusión

Este documento simuló un proyecto Scrum real con:

| Aspecto                | Detalle                                                                 |
| ---------------------- | ----------------------------------------------------------------------- |
| **Duración total**     | 6 semanas (4 Sprints)                                                   |
| **Total Story Points** | 93                                                                      |
| **User Stories**       | 28                                                                      |
| **Tareas técnicas**    | 66                                                                      |
| **Equipo**             | 3 Developers + PO + SM                                                  |
| **Ceremonias**         | 4 Sprint Plannings, 4 Sprint Reviews, 4 Retrospectives, 18 Daily Scrums |
| **Incrementos**        | 4 (uno por Sprint)                                                      |
| **Despliegue**         | GitHub Pages (en producción)                                            |

### Lo que aprenderías haciendo este proyecto real:

1. **Cómo configurar un proyecto React moderno** con Vite, ESLint y path aliases
2. **Feature-Sliced Design (FSD) en el mundo real** — no teoría, código funcionando
3. **TanStack Query a profundidad** — caché, staleTime, signal, query keys
4. **Zod para validación en runtime** — protegiendo la app de datos corruptos
5. **Glassmorphism + CSS variables** — sistema de diseño profesional
6. **Patrones GoF** — Adapter, Facade, Factory en un proyecto real
7. **Scrum de verdad** — todas las ceremonias, artefactos y roles
8. **Deploy a GitHub Pages** — app en producción real

---

> **📝 Nota**: Este es un documento de simulación con fines educativos. En un proyecto Scrum real, los artefactos serían más dinámicos (el backlog nunca está "completo", los sprints planificados pueden cambiar, etc.). Sin embargo, refleja fielmente cómo se vería la documentación de un proyecto ágil real bajo Scrum.
