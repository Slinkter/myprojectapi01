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

*   **Glassmorphism:** Para tarjetas, inputs y contenedores, usa las clases utilitarias definidas en `index.css`: `.glass`, `.glass-card`, `.glass-card-hover`, `.glass-input`, `.btn-glass`, `.badge`.
*   **Variables de Temas:** Evita colores duros en Tailwind. Usa siempre variables semánticas (ej. `bg-bg`, `text-text`, `border-border`, `text-accent`) declaradas en `src/shared/styles/index.css`.
*   **Sistema de Doble Tema:** Las variables `:root` = light mode, `.dark` = dark mode. No agregues clases condicionales de tema en JSX. El toggle vía `useTheme()` cambia la clase `.dark` en `<html>` y las variables se actualizan automáticamente.
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
