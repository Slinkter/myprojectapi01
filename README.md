# 🚀 GitExplorer — Artefacto de Ingeniería React (Nivel Máster)

> **Repositorio Educativo de Alto Rendimiento.** Una Single Page Application (SPA) en React diseñada bajo los estándares de la arquitectura **Feature-Sliced Design (FSD)**, patrones de diseño **GoF** y validación estricta de tipado en tiempo de ejecución con **Zod**.

Este proyecto no es solo un explorador de perfiles de GitHub; es una **pieza de ingeniería de software** diseñada para enseñar React avanzado, flujos de datos profesionales, adaptadores de datos y mocking robusto a desarrolladores que buscan dar el salto al nivel Senior.

---

## 🛠️ Stack Tecnológico

El proyecto está construido sobre un stack moderno y ultra-optimizado:

| Tecnología | Rol en el Sistema |
| :--- | :--- |
| **React 18.3** | Librería principal de interfaz basada en componentes funcionales. |
| **Vite 5.4** | Herramienta de compilación rápida (bundler). |
| **Tailwind CSS v4.0** | Framework de estilos utility-first integrado nativamente a Vite mediante `@tailwindcss/vite`. |
| **TanStack Query v5** | Gestión avanzada de estado asíncrono y caché de peticiones HTTP. |
| **Zod** | Validación y tipado estricto en runtime para asegurar la integridad de datos externos. |
| **MSW (Mock Service Worker)** | Intercepción y mocking de peticiones HTTP a nivel de red para desarrollo offline. |
| **Motion v12** | Animaciones fluidas de interfaz basadas en física. |
| **Vitest & jsdom** | Entorno de pruebas unitarias y simulación de DOM en Node.js. |

---

## 🏗️ Arquitectura y Patrones de Diseño

El codebase está diseñado siguiendo **Feature-Sliced Design (FSD)**, estructurando el código en capas con dependencias estrictamente unidireccionales de arriba hacia abajo:

```text
src/
├── app/          # Inicialización global (rutas, estilos globales, providers)
├── pages/        # Vistas/Páginas de la aplicación que componen widgets
├── widgets/      # Bloques de interfaz autónomos y reutilizables (ej: Bento Grid)
├── features/     # Acciones interactivas con valor de negocio (ej: búsqueda, detalles)
├── entities/     # Lógica y componentes del dominio de negocio (ej: usuario, adaptador)
└── shared/       # Recursos genéricos sin lógica de negocio (ej: API client, hooks genéricos, UI base)
```

### Patrones de Diseño Implementados

1. **Adapter Pattern (GoF Estructural)**:
   * **Ubicación:** `src/entities/user/model/adapter.js`
   * **Propósito:** Normaliza las respuestas crudas de la API de GitHub al modelo interno de la aplicación (`UserProfile`). Los componentes consumen únicamente datos limpios y validados.
   
2. **Facade Pattern**:
   * **Ubicación:** 
     * `src/features/search-user/model/useUserSearchFacade.js`
     * `src/features/view-user-details/model/useUserDetailFacade.js`
   * **Propósito:** Desacopla la UI de la lógica de negocio y llamadas a la API. Las páginas e interfaces se comunican únicamente con la fachada expuesta.

3. **Factory Pattern (GoF Creacional)**:
   * **Ubicación:** `src/entities/user/ui/ResultFactory.jsx`
   * **Propósito:** Instancia dinámicamente el tipo de tarjeta correspondiente (`UserCard` o `OrganizationCard`) basándose en el tipo de perfil retornado por GitHub.

4. **Compound Components**:
   * **Ubicación:** `src/entities/user/ui/UserCard.jsx`
   * **Propósito:** Estructura modular para componer tarjetas de usuario usando sub-componentes especializados (`UserCard.Avatar`, `UserCard.Header`, `UserCard.Footer`).

---

## 🎓 Estándar de Documentación (Universal JSDoc)

Todo el código fuente implementa el estándar **JSDoc Universal** para optimizar el autocompletado e IntelliSense en el editor y servir de manual de estudio:

1. **Cabecera del Archivo:** Explicación del propósito del archivo mediante `@file` y `@description`.
2. **Senior Técnico:** Detalles técnicos, decisiones arquitectónicas, tipos de parámetros (`@param`), retornos (`@returns`) y ejemplos de uso (`@example`).
3. **Concepto Junior:** Bloques de comentarios educativos enfocados en explicar conceptos básicos de React o Javascript implicados en el código.

```javascript
/**
 * 🎓 CONCEPTO JUNIOR: Closures
 * Un closure es una función que recuerda el estado de las variables a su alrededor...
 */
```

---

## 📡 Simulación de Red (Mocking)

Para evitar bloqueos por límite de peticiones (rate limiting) de la API pública de GitHub, el proyecto integra **Mock Service Worker (MSW)**. 
En el modo de desarrollo (`pnpm dev`), las peticiones a la API son interceptadas automáticamente por el service worker ubicado en `public/mockServiceWorker.js` y devuelven datos de prueba realistas localizados en `src/shared/mocks/`.

---

## 🎨 Identidad Visual y UI/UX

* **Estilo Tailwind CSS v4:** El diseño visual se inspira en la estética bento grid y de gradientes modernos (`from-indigo-500 via-purple-500 to-pink-500`) típica de la web oficial de Tailwind CSS.
* **Tipografía:** Se utiliza **Plus Jakarta Sans** para todos los textos y **JetBrains Mono** para código y bloques técnicos, importados dinámicamente de Google Fonts.
* **Cursor:** Cursor estándar limpio y moderno con interacciones CSS suaves sobre elementos interactivos (enlaces, botones, etc.).

---

## 🚀 Guía de Comandos y Ejecución

Asegúrate de contar con **Node.js 18+** y **pnpm** instalados.

| Comando | Acción / Propósito |
| :--- | :--- |
| `pnpm install` | Instala todas las dependencias del proyecto. |
| `pnpm dev` | Inicia el servidor de desarrollo local (con MSW activo en `http://localhost:5173`). |
| `pnpm build` | Compila la aplicación para producción generando los recursos optimizados en `dist/`. |
| `pnpm preview` | Ejecuta un servidor local para previsualizar la compilación de producción. |
| `pnpm deploy` | Compila el proyecto y lo despliega automáticamente en GitHub Pages. |
| `pnpm lint` | Valida el código con ESLint usando reglas estrictas de accesibilidad (A11Y) y React Hooks. |
| `pnpm test` | Inicia la suite de pruebas unitarias interactiva con Vitest. |
| `pnpm test:run` | Ejecuta las pruebas unitarias una sola vez (ideal para CI/CD). |
| `pnpm clean` | Elimina la carpeta `node_modules` y `dist` para realizar una instalación limpia. |
| `pnpm run build` | Alias de build estándar de Vite. |
| `pnpm py` | Compila para producción y levanta un servidor de pruebas básico en Python sobre el puerto 5000. |

---

## 📂 Biblioteca de Documentación del Proyecto

El repositorio cuenta con guías de aprendizaje, arquitectura y diseño detalladas en el directorio raíz [docs/](file:///C:/Users/LJCR/Documents/GitHub/myprojectapi01/docs):

| Documento | Enfoque Principal |
| :--- | :--- |
| [1. PRD](./docs/01-PRD.md) | **Product Requirements Document** - Visión, CANVAS, alcance e historias de usuario (ATDD/Gherkin). |
| [2. TRD](./docs/02-TRD.md) | **Technical Requirements Document** - Stack tecnológico, FSD, RNF y patrones estructurales GoF. |
| [3. DISEÑO UI/UX](./docs/03-DISENO_UI_UX.md) | **Design System** - Colores base claro/oscuro, tipografías, tokens CSS y micro-animaciones Motion. |
| [4. APPFLOW](./docs/04-APPFLOW.md) | **Flujos y Transiciones** - Diagrama de estados de la UI, flujos de navegación y casos de uso. |
| [5. ESQUEMA DEL BACKEND](./docs/05-ESQUEMA_BACKEND.md) | **Integración de APIs** - Endpoints consumidos, esquemas de validación Zod y mocking local (MSW). |
| [6. PLAN DE IMPLEMENTACION](./docs/06-PLAN_IMPLEMENTACION.md) | **Roadmap** - Planificación de Sprints, comandos CLI y hoja de ruta para futuras expansiones. |
| [7. MANUAL DE ESTUDIO](./docs/07-MANUAL_ESTUDIO.md) | **Guía didáctica de Ingeniería** - Conceptos de JavaScript, React, Clean Code, SOLID y patrones GoF explicados para juniors. |

---

> MIT © 2026 — Diseñado por LJCR para la comunidad de ingeniería de software.
