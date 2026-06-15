# 03 - Guía de Desarrollo

Esta guía es todo lo que necesitas para ejecutar el proyecto en tu entorno local y empezar a desarrollar bajo la arquitectura **Feature-Sliced Design (FSD)**.

---

## 🛠️ Requisitos Previos

Asegúrate de tener instalado:
*   [Node.js](https://nodejs.org/) (versión 18.0 o superior)
*   [pnpm](https://pnpm.io/) (nuestro gestor de paquetes de alto rendimiento)

---

## 🚀 Comandos de la Terminal

El archivo `package.json` define scripts simplificados para el ciclo de vida del desarrollo:

| Comando | Acción | Descripción |
| :--- | :--- | :--- |
| `pnpm install` | Instalación | Descarga e instala todas las dependencias en la carpeta `node_modules/`. |
| `pnpm dev` | Servidor Dev | Levanta un servidor Vite local en `http://localhost:5173`. MSW se activa automáticamente para emulación offline. |
| `pnpm build` | Compilación | Genera el bundle optimizado para producción en la carpeta `/dist`. MSW se excluye en producción. |
| `pnpm preview` | Servidor Preview | Levanta un servidor local apuntando al build de `/dist` para pruebas de QA locales. |
| `pnpm lint` | Análisis Estático | Ejecuta ESLint revisando accesibilidad WCAG y reglas estrictas de hooks. |
| `pnpm test` | Suite de Pruebas | Ejecuta la suite de pruebas unitarias interactiva utilizando Vitest. |
| `pnpm test:run` | Ejecutar Pruebas | Corre todas las pruebas unitarias del proyecto una sola vez. |
| `pnpm deploy` | Despliegue | Compila el bundle y lo sube automáticamente a GitHub Pages (`/myprojectapi01/`). |
| `pnpm py` | Servidor Python | Construye la app y la sirve en un servidor HTTP nativo de Python en el puerto `5000` para validar el comportamiento del build. |

---

## 📐 Estándares de Documentación y Trazabilidad

Para que este proyecto cumpla su propósito educativo, todo código nuevo debe seguir estas dos reglas inquebrantables:

### 1. Documentación Maestro-Aprendiz (Universal JSDoc)
No basta con decir *qué* hace el código; hay que explicar *cómo* se conecta con la teoría. Cada archivo debe incluir:
*   **Encabezado de archivo:** Con `@file` y `@description`.
*   **Anotaciones Técnicas:** Uso de `@param`, `@returns`, `@typedef`, `@hook`, `@example`.
*   **🎓 CONCEPTO JUNIOR:** Un bloque de comentario que explica un concepto fundamental (Virtual DOM, Inmutabilidad, Closures, etc.) relacionado con el código actual.

```javascript
/**
 * 🎓 CONCEPTO JUNIOR: Inmutabilidad
 * React necesita saber cuándo algo cambió para redibujar. Si cambias un objeto directamente,
 * React no se entera. Por eso usamos el spread operator (...) para crear una COPIA nueva.
 */
```

### 2. El Flujo de 9 Pasos (log.flow)
Para mantener la visibilidad del ciclo de vida, utiliza la utilidad `log.flow()` de `@/shared` en los puntos estratégicos de la arquitectura:

1.  **Mounting** (`main.jsx`)
2.  **App Shell** (`App.jsx`)
3.  **Pages** (`Page.jsx`)
4.  **Widgets** (`Widget.jsx`)
5.  **Factory** (`ResultFactory.jsx`)
6.  **Facade** (`useFacade.js`)
7.  **Query Hook** (`useQuery.js`)
8.  **Service** (`service.js`)
9.  **Adapter** (`adapter.js`)

---

## 📐 Flujo de Trabajo para Nuevas Funcionalidades (FSD)

Para mantener la cohesión y la integridad de nuestra arquitectura **FSD**, sigue estos pasos al agregar lógica:

### Paso 1: Definir el Dominio en la Entidad (Entities)
1. Crea o modifica un esquema Zod en `src/entities/<slice>/model/schema.js` (por ejemplo, `user`) para validar los datos que ingresarán del exterior.
2. Implementa un transformador/adaptador en `src/entities/<slice>/model/adapter.js` para mapear el JSON caótico de la API a un objeto de dominio unificado.

### Paso 2: Crear el Servicio de Datos y Queries en la Entidad (Entities)
1. Escribe el servicio de llamadas de red en `src/entities/<slice>/api/` (por ejemplo, `userService.js`).
2. Implementa hooks de consulta mediante `TanStack Query` en `src/entities/<slice>/api/` (por ejemplo, `useUserQuery.js`).
3. Expón los hooks, adaptadores y componentes base a través del entry point público de la entidad en `src/entities/<slice>/index.js`.

### Paso 3: Crear Funcionalidades Interactivas (Features)
1. Implementa acciones o controles en `src/features/<slice>/ui/` (por ejemplo, barra de búsqueda en `PageHeader.jsx`).
2. Si la feature tiene lógica de estado o coordinación compleja, crea una fachada (Facade Hook) en `src/features/<slice>/model/` (por ejemplo, `useUserSearchFacade.js`).
3. Expón la UI y lógica mediante `src/features/<slice>/index.js`.

### Paso 4: Ensamblar la UI en Widgets y Páginas (Widgets / Pages)
1. Combina múltiples features y/o entities en widgets autónomos en `src/widgets/<slice>/` (por ejemplo, `SearchResults.jsx`).
2. Diseña y monta las vistas completas de la página en `src/pages/<slice>/` (por ejemplo, `SearchPage.jsx`), consumiendo exclusivamente widgets, features y componentes compartidos.
3. Asegura el enrutado de la nueva página en `src/app/App.jsx`.

---

## 🎨 Convenciones de Programación Visual

*   **Tailwind Website Branding:** Para tarjetas, inputs y botones, utiliza los componentes utilitarios y variables declarados en `index.css` (ej. `@utility tailwind-card`, `@utility tailwind-input`, `@utility btn-tailwind`, `@utility badge-tailwind`).
*   **Variables de Temas:** Usa variables semánticas (ej. `bg-bg`, `text-text`, `border-border`, `text-accent`) declaradas en `src/shared/styles/index.css`.
*   **Sistema de Doble Tema:** Las variables `:root` = light mode, y `.dark` = dark mode. No agregues clases condicionales de tema de Tailwind en JSX (`dark:bg-slate-900`, etc.). En su lugar, el toggle vía `useTheme()` conmuta la clase `.dark` en `<html>` y las variables de CSS semánticas cambian automáticamente.
*   **Cursor Interactivo:** El cursor custom Pokéball se aplica a nivel global. Los elementos interactivos (`a`, `button`, etc.) cambian de forma automática a la Pokébola abierta al pasar sobre ellos sin requerir clases adicionales.
*   **Física de Resortes:** Para animaciones elásticas premium, usa configuraciones de resorte en Motion (`type: "spring", stiffness: 100, damping: 15`).
*   **Comentarios Didácticos (JSDoc):** Escribe firmas de tipo descriptivas para que VS Code provea autocompletado type-safe nativo:
    ```javascript
    /**
     * @typedef {Object} UserProfile
     * @property {string} username - Nombre de usuario único
     * @property {string} photo - URL de la imagen del perfil
     */
    ```

Siguiendo esta guía mantendrás el proyecto limpio, escalable y digno de un portafolio de sistemas de primer nivel.
