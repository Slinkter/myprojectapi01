# 03 - Guía de Desarrollo

Esta guía es todo lo que necesitas para ejecutar el proyecto en tu entorno local y empezar a desarrollar con los estándares de ingeniería más exigentes.

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
| `pnpm deploy` | Despliegue | Compila el bundle y lo sube automáticamente a GitHub Pages (`/myprojectapi01/`). |
| `pnpm py` | Servidor Python | Construye la app y la sirve en un servidor HTTP nativo de Python en el puerto `5000` para validar el comportamiento del build. |

---

## 📐 Flujo de Trabajo para Nuevas Funcionalidades

Para mantener la cohesión y la integridad de nuestra **Clean Architecture**, sigue estos pasos al agregar lógica:

### Paso 1: Definir el Modelo de Dominio y Validación
1. Crea o modifica un esquema Zod en `src/domain/schemas/` (por ejemplo, `user.js`) para validar los datos que ingresarán del exterior.
2. Implementa un transformador en `src/domain/adapters/` (por ejemplo, `userAdapter.js`) para mapear el JSON caótico del backend a un objeto de dominio unificado.

### Paso 2: Configurar la Infraestructura y Servicios
1. Crea tu servicio de llamadas de red en `src/infrastructure/api/` (por ejemplo, `userService.js`).
2. Agrega los handlers correspondientes en `src/infrastructure/mocks/handlers.js` para asegurar que la app funcione offline en desarrollo.

### Paso 3: Orquestar el Estado en la Aplicación
1. Implementa hooks de consulta mediante `TanStack Query` en `src/application/queries/`.
2. Encapsula toda la complejidad (estados de carga, queries, toasts y debounces) en una **Fachada** en `src/application/facades/`.

### Paso 4: Implementar la Capa de Presentación (UI)
1. Escribe componentes modulares altamente estilizados con **Tailwind CSS v4** y **Motion v12** en `src/presentation/features/` o `src/presentation/components/`.
2. Conéctalos exclusivamente a las Fachadas (`facades/`), manteniendo tus componentes JSX enfocados 100% en la renderización visual limpia.

---

## 🎨 Convenciones de Programación Visual

*   **Glassmorphism:** Para tarjetas, inputs y contenedores, usa las clases utilitarias definidas en `index.css`: `.glass`, `.glass-card`, `.glass-card-hover`, `.glass-input`, `.btn-glass`, `.badge`.
*   **Variables de Temas:** Evita colores duros en Tailwind. Usa siempre variables semánticas (ej. `bg-bg`, `text-text`, `border-border`, `text-accent`) declaradas en `src/presentation/styles/index.css`.
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
