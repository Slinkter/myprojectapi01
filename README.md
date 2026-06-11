# GitExplorer — Guía de Estudio para Programadores Junior

> **React SPA para explorar perfiles de GitHub.** Construida con Clean Architecture, TanStack Query, Tailwind CSS v4, Zod y Motion v12. Cada decisión técnica está pensada para enseñar buenas prácticas de ingeniería de software.

```txt
Estado:       Producción
React:        v18.3
Vite:         v5.4
Tailwind:     v4
Arquitectura: Clean Architecture (4 capas)
Estilo:       Glassmorphism + Minimalismo técnico
```

---

## 📦 Índice

1. [Stack Tecnológico — Cada librería explicada](#-stack-tecnológico--cada-librería-explicada)
2. [Clean Architecture — Las 4 capas](#-clean-architecture--las-4-capas)
3. [TanStack Query a profundidad](#-tanstack-query-a-profundidad)
4. [Zod — Validación en Runtime](#-zod--validación-en-runtime)
5. [Patrones de Diseño (GoF)](#-patrones-de-diseño-gof)
6. [Glassmorphism + Sistema de Temas](#-glassmorphism--sistema-de-temas)
7. [Inmutabilidad y Spread Operator](#-inmutabilidad-y-spread-operator)
8. [Closures en el proyecto](#-closures-en-el-proyecto)
9. [DRY y SOLID aplicados](#-dry-y-solid-aplicados)
10. [Scope y Hoisting](#-scope-y-hoisting)
11. [Estructura del Proyecto](#-estructura-del-proyecto)
12. [Diagrama de Flujo de Datos](#-diagrama-de-flujo-de-datos)
13. [Comandos](#-comandos)
14. [Documentación Adicional](#-documentación-adicional)

---

## 📦 Stack Tecnológico — Cada librería explicada

### Producción

| Librería | Versión | ¿Qué hace? | ¿Por qué la usamos? |
|----------|---------|------------|---------------------|
| **React** | 18.3 | Biblioteca para construir interfaces de usuario con componentes reutilizables | Estándar de la industria. JSX, hooks, y el ecosistema más grande del frontend |
| **Vite** | 5.4 | Bundler (empaquetador) para desarrollo y producción | HMR (Hot Module Replacement) instantáneo. No empaqueta todo en dev, solo los archivos que cambian |
| **TanStack Query** | ^5.100 | Librería para manejar estado del servidor (fetch, caché, sincronización) | Reemplaza a Redux para datos de API. Sin boilerplate, con stale-while-revalidate, retry automático, y cancelación de peticiones |
| **Tailwind CSS** | v4 | Framework CSS utilitario | Escribes estilos directamente en el HTML con clases atómicas. Sin nombres de clases inventados, sin CSS separado |
| **Motion** | ^12.38 | Animaciones con resortes físicos (antes se llamaba Framer Motion) | Anima con físicas reales (stiffness + damping). Las transiciones se sienten orgánicas, no lineales |
| **React Router** | ^7.15 | Enrutador para SPA (Single Page Application) | Cambia de página sin recargar el navegador. Permite lazy loading con `React.lazy()` |
| **Zod** | ^4.4 | Validador de esquemas en tiempo de ejecución | Garantiza que los datos que llegan de la API sean exactamente lo que esperamos. Si no, lanza error antes de que llegue a la UI |
| **Lucide React** | ^1.16 | Paquete de iconos en SVG | Iconos limpios, consistentes y personalizables por CSS (color, tamaño, stroke) |
| **Sonner** | ^2.0 | Notificaciones toast | Liviano, accesible, con richColors y animaciones suaves |
| **clsx + tailwind-merge** | — | Utilidades para manejar clases condicionales | `clsx` une clases, `tailwind-merge` resuelve conflictos. Juntos forman `cn()` — la función que usamos en todo el proyecto |
| **PropTypes** | ^15.8 | Validación de propiedades (props) en desarrollo | Ayuda a detectar errores de tipo: si un componente espera un string y recibe un número, PropTypes avisa en consola |

### Desarrollo

| Librería | ¿Qué hace? |
|----------|------------|
| **ESLint** | Analiza el código en busca de errores, malas prácticas y problemas de accesibilidad (jsx-a11y) |
| **MSW (Mock Service Worker)** | Intercepta peticiones HTTP en el navegador durante desarrollo. Permite trabajar sin conexión a internet |
| **gh-pages** | Sube el build de producción a GitHub Pages con un solo comando |
| **@tailwindcss/vite** | Plugin que integra Tailwind v4 con Vite |
| **PostCSS** | Procesador de CSS que Tailwind usa internamente |
| **Autoprefixer** | Agrega prefijos de navegador (-webkit-, -moz-) automáticamente |

---

## 🧱 Feature-Sliced Design (FSD) — Las 6 capas

Este proyecto sigue **Feature-Sliced Design (FSD)** (Diseño Orientado a Características). El código está dividido en 6 capas con una regla de oro:

> **Las capas externas/superiores pueden importar de las internas/inferiores, pero no al revés.**

```
app ➔ pages ➔ widgets ➔ features ➔ entities ➔ shared
```

### Capa 1: Shared (`src/shared/`) — Elementos reutilizables comunes
- Contiene utilidades (`lib/utils/`), hooks reutilizables (`lib/hooks/`), componentes atómicos (`ui/`), config (`config/`), estilos generales (`styles/`), mocks (`mocks/`) y el cliente HTTP (`api/httpClient.js`).

### Capa 2: Entities (`src/entities/`) — Conceptos de negocio
- Define el modelo de negocio y UI básica de la entidad `user` (schemas, adaptadores, hooks de consulta `useUserQuery`/`useUserDetailQuery` y componentes básicos como `UserCard`).

### Capa 3: Features (`src/features/`) — Acciones de usuario
- Implementa interacciones que aportan valor directo (como la barra de búsqueda `PageHeader` y el coordinamiento del buscador en la fachada `useUserSearchFacade`).

### Capa 4: Widgets (`src/widgets/`) — Bloques autónomos
- Composición compleja de features y entities en unidades de UI independientes (por ejemplo, el orquestador de resultados `SearchResults` y el bento grid de detalles `UserDetail`).

### Capa 5: Pages (`src/pages/`) — Vistas de pantalla
- Páginas que combinan widgets para armar las distintas pantallas de la aplicación (`SearchPage`, `DetailPage`, `NotFoundPage`).

### Capa 6: App (`src/app/`) — Inicialización general
- Configuración global y punto de montaje (`App.jsx` para rutas, `main.jsx` para iniciar React y QueryClient).

---

## ⚡ TanStack Query a profundidad

### ¿Por qué TanStack Query y no Redux?

**Redux** es para estado global de la aplicación (tema, usuario logueado, carrito de compras). **TanStack Query** es para estado del servidor (datos que vienen de una API). Mezclarlos es un error común.

TanStack Query nos da **gratis**:
- Caché automática con tiempo de expiración (`staleTime`)
- Re-fetch cuando el usuario regresa a la pestaña
- Retry automático si la petición falla
- Loading / error / success states sin boilerplate
- Cancelación de peticiones cuando el query key cambia

### Configuración global (`src/main.jsx`)

```jsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,  // 5 minutos: los datos se consideran frescos
      gcTime: 10 * 60 * 1000,    // 10 minutos: se mantienen en caché después de desuscribirse
      retry: 1,                   // reintenta 1 vez si falla
      refetchOnWindowFocus: false, // no recarga al cambiar de pestaña
    },
  },
});
```

### Las dos queries del proyecto

**`useUserQuery.js`** — Búsqueda de usuarios:
```js
export const useUserQuery = (searchTerm) => {
  return useQuery({
    queryKey: ["users", searchTerm],
    queryFn: ({ signal }) => fetchUsersAPI(searchTerm, signal),
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
```

**`useUserDetailQuery.js`** — Detalle de un usuario:
```js
export const useUserDetailQuery = (login) => {
  return useQuery({
    queryKey: ["user-detail", login],
    queryFn: ({ signal }) => fetchUserDetailAPI(login, signal),
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: !!login,   // 👈 solo se ejecuta si login tiene valor
  });
};
```

### queryKey — La clave del caché

TanStack Query usa el `queryKey` para identificar cada petición. Si el key cambia, la anterior se **aborta automáticamente** (gracias al `signal`) y se inicia la nueva:

```js
queryKey: ["users", "mojombo"]  // busca "mojombo"
queryKey: ["users", "defunkt"]  // 👈 cambió, aborta la anterior, busca "defunkt"
```

El `signal` es un `AbortSignal` que TanStack Query inyecta en `queryFn`. Se lo pasamos a `fetch`:

```js
// httpClient.js
const response = await fetch(url, { signal, ...options });
// Si el query key cambia, fetch se cancela automáticamente
```

### Flujo completo de datos

```
Usuario escribe en el input
       │
       ▼
setSearchTerm("mojombo")           ← actualiza inmediatamente el input
       │
       ▼
useDebouncedSearch (500ms)         ← espera a que deje de escribir
       │
       ▼
debouncedSearchTerm cambia         ← "mojombo"
       │
       ▼
useUserQuery(["users", "mojombo"]) ← queryKey cambió
       │
       ├─ ¿Hay caché fresca?       ← staleTime 5min
       │   └─ Sí → devuelve datos instantáneo (sin red)
       │
       └─ No → ejecuta queryFn
              │
              ▼
       fetchUsersAPI("mojombo", signal)  ← signal permite cancelar
              │
              ▼
       httpClient(url, { signal })       ← wrapper de fetch
              │
              ▼
       GitHub API (o MSW en dev)
              │
              ▼
       usersCollectionAdapter() → userAdapter() → Zod valida
              │
              ▼
       TanStack cachea el resultado
              │
              ▼
       useUserSearchFacade expone:
         { users, isLoading, isError, isEmpty }
              │
              ▼
       SearchResults renderiza:
         loading → SkeletonGrid
         error   → ErrorDisplay
         empty   → NotFound
         data    → UserList → UserCard
```

---

## 🔍 Zod — Validación en Runtime

### ¿Por qué validar en runtime?

TypeScript valida en **tiempo de compilación**. Pero la API de GitHub devuelve datos en **tiempo de ejecución**. Si GitHub cambia su API o viene un campo `null` donde esperamos un string, TypeScript no lo detecta. Zod sí.

### Esquema (`src/domain/schemas/user.js`)

```js
export const GitHubUserSchema = z.object({
  id: z.number(),
  login: z.string(),
  avatar_url: z.string().url(),
  html_url: z.string().url(),
  name: z.string().nullable().optional(),
  bio: z.string().nullable().optional(),
  public_repos: z.number().optional().default(0),  // si falta, usa 0
  followers: z.number().optional().default(0),
  // ...
});
```

### Adapter + Zod (`src/domain/adapters/userAdapter.js`)

```js
export const userAdapter = (rawUser) => {
  const data = GitHubUserSchema.parse(rawUser);  // ← valida O lanza ZodError
  return {
    username: data.login,        // renombramos propiedades
    photo: data.avatar_url,
    repos: data.public_repos,
    // ...
  };
};
```

Si la API devuelve algo inesperado (ej. `login` viene `undefined`), `GitHubUserSchema.parse()` lanza un `ZodError` que el servicio captura y convierte en `ApiError(422)` — "Unprocessable Entity". La app nunca recibe datos inválidos.

---

## 🏗️ Patrones de Diseño (GoF)

### Adapter (Estructural) — `src/domain/adapters/userAdapter.js`

**Problema**: La API de GitHub devuelve objetos con propiedades como `avatar_url`, `html_url`, `public_repos`. Nuestra app quiere `photo`, `profileUrl`, `repos`.

**Solución**: Un adaptador que recibe los datos crudos, los valida con Zod, y devuelve un objeto con la estructura que nuestra app entiende. Si mañana cambiamos la API, solo tocamos el adaptador.

### Facade (Estructural) — `src/application/facades/useUserSearchFacade.js`

**Problema**: El componente `UserSearch` tendría que manejar debounce, TanStack Query, estados de carga/error/vacío, toasts de error y retry. Cientos de líneas.

**Solución**: Una fachada que oculta toda esa complejidad y expone solo lo que la UI necesita:

```js
const { users, isLoading, isError, isEmpty, handleRetry } = useUserSearchFacade();
```

### Factory (Creacional) — `src/presentation/components/factories/ResultFactory.jsx`

**Problema**: La búsqueda puede devolver usuarios individuales u organizaciones. Cada tipo tiene una tarjeta diferente.

**Solución**: Una factoría que examina el `data.type` y devuelve el componente adecuado:

```js
switch (data.type) {
  case "Organization": return <OrganizationCard />;
  case "User":         return <UserCard />;
}
```

---

## 🎨 Glassmorphism + Sistema de Temas

### Cómo funciona el glass

Cada tarjeta o contenedor usa la clase `.glass` o `.glass-card`, que aplica:

```css
.glass-card {
  background: var(--glass-bg);            /* semi-transparente */
  backdrop-filter: blur(20px);            /* desenfoque del fondo */
  border: 1px solid var(--glass-border);  /* borde sutil */
  box-shadow: var(--glass-shadow);        /* sombra suave */
  border-radius: 0.75rem;                 /* rounded-xl */
}
```

Esto crea el efecto "frosted glass" (vidrio esmerilado): ves el fondo a través de la tarjeta pero borroso.

### Dos temas

| | Light "Holographic Terminal" | Dark "Cyberpunk" |
|---|---|---|
| Fondo | `#F0EDE8` (cálido papel) | `#0A0A0F` (oscuro profundo) |
| Superficie | `#FFFFFF` | `#12121A` |
| Acento | `#0D9488` (teal) | `#00F0FF` (neón cyan) |
| Texto | `#1A1A2E` | `#E8E8F0` |
| Borde | `#E5E2DC` | `#1E1E2A` |

El toggle de tema (`ThemeToggle`) agrega o quita la clase `.dark` en `<html>`. Las variables CSS cambian automáticamente gracias a:

```css
:root { --glass-bg: rgba(255,255,255,0.6); ... }
.dark { --glass-bg: rgba(255,255,255,0.04); ... }
```

### Clases utilitarias disponibles

| Clase | Uso |
|-------|-----|
| `.glass` | Efecto vidrio base |
| `.glass-card` | Tarjeta glass con bordes redondeados |
| `.glass-card-hover` | Igual que glass-card pero con glow accent al hover |
| `.glass-input` | Input con efecto glass, glow al focus |
| `.btn-glass` | Botón glass con hover accent |
| `.badge` | Etiqueta glass pequeña |
| `.divider` | Línea divisoria sutil |

### Tipografía

- **Orbitron** — Headings (técnico, futurista)
- **Inter** — Cuerpo de texto (legible, limpio)
- **JetBrains Mono** — Datos técnicos, badges, código

---

## 🔒 Inmutabilidad y Spread Operator

### ¿Qué es inmutabilidad?

No modificar los datos originales. Cada cambio crea una **copia nueva** con la modificación.

### Spread operator (`...`)

Crea copias superficiales (shallow copy) sin mutar el original:

```js
// httpClient.js — merge inmutable de objetos
const response = await fetch(url, {
  ...options,              // copia todas las propiedades de options
  headers: {
    "Content-Type": "application/json",
    ...options.headers,   // si options ya traía headers, los mezcla sin pisar
  },
});
```

### Métodos de array inmutables (los que usamos)

| Método | ¿Muta? | ¿Qué devuelve? |
|--------|--------|----------------|
| `.map()` | ❌ No | Nuevo array transformado |
| `.filter()` | ❌ No | Nuevo array filtrado |
| `.find()` | ❌ No | El elemento encontrado (o undefined) |
| `.slice()` | ❌ No | Nuevo array con una porción |

Los que **NUNCA** usamos (porque mutan): `.push()`, `.pop()`, `.splice()`, `.sort()`, `.reverse()`.

### ¿Por qué es importante en React?

React detecta cambios comparando referencias. Si mutas un array, la referencia sigue siendo la misma y React **no se entera** del cambio. Siempre debes crear un nuevo array/objeto.

---

## 🔐 Closures en el proyecto

### ¿Qué es un closure?

Una función que "recuerda" las variables del lugar donde fue creada, incluso después de que ese lugar ya terminó de ejecutarse.

### Ejemplo: `useDebouncedSearch.js`

```js
useEffect(() => {
  const handler = setTimeout(() => {
    setDebouncedValue(inputValue);  // ← captura inputValue del scope del effect
  }, delay);

  return () => {
    clearTimeout(handler);  // ← captura handler del scope del effect
  };
}, [inputValue, delay]);
```

Aquí ocurren dos closures:

1. **`() => setDebouncedValue(inputValue)`** — esta arrow function captura `inputValue`. Aunque el `useEffect` ya terminó, cuando pasan los 500ms y el `setTimeout` se ejecuta, todavía "recuerda" cuál era `inputValue` en ese momento.

2. **`() => clearTimeout(handler)`** — la cleanup captura `handler` (el ID del timeout). Si el usuario escribe otra letra, React ejecuta esta cleanup **antes** de re-ejecutar el effect, y cancela el timeout anterior.

### Otros closures

- **`useTheme.js`** — `toggleTheme` captura `theme` del estado del hook
- **`useIntersectionObserver.js`** — la callback del observer captura `setIsIntersecting`
- **`httpClient.js`** — cualquier `.catch()` captura variables del scope del `fetch`

Cada vez que escribes `() => { ... }` dentro de otra función y accedes a una variable exterior, estás usando un closure. En React ocurre **constantemente**.

---

## 🧹 DRY y SOLID aplicados

### DRY (Don't Repeat Yourself)

| Archivo | Evita repetir |
|---------|---------------|
| `src/lib/utils.js` — `cn()` | La lógica de unir clases condicionales con `clsx` + resolver conflictos con `tailwind-merge` |
| `src/infrastructure/api/httpClient.js` | El manejo de `fetch`, headers, errores HTTP y `ApiError` en un solo lugar |
| `src/domain/adapters/userAdapter.js` | La transformación y validación de datos de GitHub → `UserProfile` |

### SOLID

| Principio | ¿Dónde se aplica? |
|-----------|-------------------|
| **S**ingle Responsibility | `PageHeader` solo renderiza el hero. `SearchResults` solo decide qué estado mostrar. `UserSearch` solo orquesta. Cada uno hace **una sola cosa** |
| **O**pen/Closed | `ResultFactory` — puedes agregar un nuevo tipo de tarjeta (ej. `TeamCard`) sin modificar el código existente, solo agregas un `case` |
| **L**iskov | `ApiError` extiende `Error` sin romper su interfaz. Puede usarse donde se espere un `Error` |
| **I**nterface Segregation | Los componentes reciben solo las props que necesitan (`isLoading`, `users`), no objetos gigantes con datos que no usan |
| **D**ependency Inversion | La capa de dominio (`userAdapter`) **no sabe** que React, HTTP, ni la UI existen. Las capas externas dependen de la interna |

---

## 📐 Scope y Hoisting

### Scope (alcance de variables)

En `UserSearch.jsx`:

```js
import { useUserSearchFacade } from "@/...";  // ← Global Scope

const UserSearch = () => {
  const { users, isLoading } = useUserSearchFacade();  // ← Local Scope
  return ( ... );
};
```

- **Global scope**: Importaciones, disponibles en todo el archivo
- **Local scope**: Variables dentro del componente, solo existen mientras el componente se renderiza

### Hoisting (elevación)

JavaScript "eleva" las declaraciones al principio de su scope antes de ejecutar el código:

```js
// Esto funciona aunque la función esté definida después
saludar();  // "Hola!"
function saludar() { console.log("Hola!"); }

// Esto NO funciona con const/let
despedir();  // ReferenceError
const despedir = () => console.log("Chau!");
```

Las **importaciones** también son hoisted — por eso el orden no importa.

---

## 📁 Estructura del Proyecto (Feature-Sliced Design)

```
src/
├── app/                       # Configuración general y de enrutado
│   ├── App.jsx
│   └── main.jsx
│
├── pages/                     # Composiciones completas de páginas
│   ├── search-page/
│   ├── detail-page/
│   └── not-found/
│
├── widgets/                   # Componentes de UI auto-contenidos complejos
│   ├── search-results/        # Orquestación y grids de resultados
│   └── user-profile-bento/    # Layout detallado en Bento Grid
│
├── features/                  # Acciones interactivas con valor de negocio
│   └── search-user/           # Lógica y barra del buscador (facade)
│
├── entities/                  # Conceptos de negocio (user)
│   └── user/
│       ├── api/               # Servicios HTTP y query hooks
│       ├── model/             # Schemas Zod y adaptadores
│       └── ui/                # Tarjetas, fábricas y skeletons
│
└── shared/                    # Infraestructura y elementos reutilizables
    ├── api/                   # Cliente HTTP y clase ApiError
    ├── config/                # Constantes globales
    ├── lib/                   # Hooks generales y utils (cn)
    ├── logger/                # Logging con ASCII art
    ├── mocks/                 # MSW en desarrollo local
    ├── styles/                # index.css de Tailwind v4 y theme
    └── ui/                    # ErrorBoundary, ErrorDisplay, ThemeToggle
```

---

## 🔄 Diagrama de Flujo de Datos

```
                     ┌──────────────┐
                     │   Usuario    │
                     │  escribe en  │
                     │   el input   │
                     └──────┬───────┘
                            │
                     ┌──────▼───────┐
                     │  setSearch   │
                     │  Term(value) │
                     └──────┬───────┘
                            │
                     ┌──────▼───────┐
                     │ useDebounced │
                     │ Search(500ms)│
                     └──────┬───────┘
                            │ debouncedSearchTerm cambia
                            │
                     ┌──────▼──────────────────┐
                     │   useUserQuery(["users",  │
                     │    debouncedSearchTerm]) │
                     └──────┬───────────────────┘
                            │
                    ┌───────┴────────┐
                    │                │
              ¿Hay caché?      No hay caché
              (staleTime)           │
                    │               ▼
              ┌─────▼────┐   ┌─────────────┐
              │ Devuelve │   │ queryFn se  │
              │ instantá-│   │ ejecuta con │
              │ neo   ✓  │   │ signal para │
              └──────────┘   │ cancelación │
                             └──────┬──────┘
                                    ▼
                             ┌──────────────┐
                             │ fetchUsersAPI │
                             │ (searchTerm,  │
                             │  signal)      │
                             └──────┬───────┘
                                    ▼
                             ┌──────────────┐
                             │  httpClient   │
                             │  (fetch)      │
                             └──────┬───────┘
                                    ▼
                             ┌──────────────────┐
                             │ GitHub API / MSW  │
                             └──────┬───────────┘
                                    ▼
                             ┌──────────────────┐
                             │ userAdapter +    │
                             │ Zod validation   │
                             └──────┬───────────┘
                                    ▼
                             ┌──────────────────┐
                             │ TanStack Query   │
                             │ guarda en caché  │
                             └──────┬───────────┘
                                    ▼
                     ┌──────────────┴──────────────┐
                     │    useUserSearchFacade      │
                     │  { users, isLoading, ... }  │
                     └──────────────┬──────────────┘
                                    ▼
                     ┌──────────────┴──────────────┐
                     │       SearchResults         │
                     │                             │
                     │  loading  → SkeletonGrid    │
                     │  error    → ErrorDisplay    │
                     │  empty    → NotFound        │
                     │  success  → UserList        │
                     │               │             │
                     │         ┌─────▼──────┐      │
                     │         │  UserCard  │      │
                     │         │ (glass)    │      │
                     │         └────────────┘      │
                     └─────────────────────────────┘
```

---

## 🚀 Comandos

```bash
pnpm install      # Instala dependencias
pnpm dev          # Servidor desarrollo (http://localhost:5173)
pnpm build        # Build producción (en /dist)
pnpm preview      # Previsualiza el build
pnpm lint         # ESLint con reglas de accesibilidad
pnpm deploy       # Build + sube a GitHub Pages
pnpm py           # Build + sirve con Python (puerto 5000)
```

---

## 📖 Documentación Adicional

| Documento | Descripción |
|-----------|-------------|
| [`src/docs/01-Guia-del-Proyecto.md`](./src/docs/01-Guia-del-Proyecto.md) | Visión general, casos de uso y requerimientos |
| [`src/docs/02-Arquitectura-y-Patrones.md`](./src/docs/02-Arquitectura-y-Patrones.md) | Clean Architecture y patrones GoF a detalle |
| [`src/docs/03-Guia-de-Desarrollo.md`](./src/docs/03-Guia-de-Desarrollo.md) | Setup, comandos y flujo de trabajo |
| [`src/docs/GUIA_ESTUDIO.md`](./src/docs/GUIA_ESTUDIO.md) | 📚 Manual completo de React desde cero |
| [`src/docs/PRUEBA_TECNICA.md`](./src/docs/PRUEBA_TECNICA.md) | 📝 Simulación de entrevista técnica frontend |

---

> MIT © 2026 — Hecho con 💜 para que juniors aprendan React con buenas prácticas.
