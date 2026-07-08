# 2. Technical Requirements Document (TRD) — GitExplorer

Este documento detalla las especificaciones técnicas, arquitectura de software, patrones de diseño y estándares de código de **GitExplorer**.

---

## 1. Stack Tecnológico (Tech Stack)

La infraestructura de frontend está construida sobre las siguientes tecnologías y versiones:

| Tecnología | Versión | Rol e Impacto en el Sistema |
| :--- | :--- | :--- |
| **React** | 18.3.1 | Motor de renderizado declarativo basado en componentes funcionales y Hooks. |
| **Vite** | 5.4.21 | Bundler y herramienta de desarrollo rápida basado en ESM nativo y Rollup. |
| **Tailwind CSS** | 4.3.0 | Framework CSS atómico. Integración nativa con Vite mediante `@tailwindcss/vite` (sin PostCSS). |
| **TanStack Query** | 5.100.10 | Gestor de estado asíncrono para peticiones HTTP, políticas de caché y reintentos. |
| **Zod** | 4.4.3 | Motor de validación de esquemas y tipado estricto en runtime. |
| **React Router** | 7.15.1 | Biblioteca de enrutamiento del lado del cliente con soporte para lazy loading. |
| **Motion** | 12.38.0 | Motor de animaciones físicas fluidas (Spring) y transiciones de salida. |
| **MSW** | 2.14.6 | Mock Service Worker para mocking de APIs interceptando a nivel de red (Service Worker). |
| **Vitest** | 1.6.0 | Suite de pruebas unitarias compatible con la configuración de Vite. |

---

## 2. Requerimientos No Funcionales (RNF)

| ID | Requerimiento No Funcional | Categoría | Métrica de Aceptación |
| :--- | :--- | :---: | :--- |
| **RNF-01** | La aplicación debe ser CSR pura (Client-Side Rendering) ejecutable de forma estática. | Operatividad | Despliegue en GitHub Pages sin servidor activo. |
| **RNF-02** | Compatibilidad en las últimas dos versiones de Chrome, Firefox, Safari y Edge. | Portabilidad | Pruebas de compatibilidad cross-browser exitosas. |
| **RNF-03** | Rendimiento de carga inicial (FCP - First Contentful Paint) menor a 2 segundos. | Rendimiento | Auditoría Lighthouse en red 4G simulada. |
| **RNF-04** | El tamaño de bundle compilado principal (JS + CSS) debe ser menor a 500 KB. | Rendimiento | Reporte de compilación de `pnpm build`. |
| **RNF-05** | Las consultas ya cacheadas en memoria deben responder en menos de 10ms. | Rendimiento | TanStack Query Cache Hit (cero llamadas de red). |
| **RNF-06** | Calidad de código garantizada por linter sin fallos ni advertencias. | Calidad | `pnpm lint --max-warnings 0`. |
| **RNF-07** | Accesibilidad web garantizada bajo el estándar WCAG 2.1 nivel AA. | Accesibilidad | ESLint `jsx-a11y` y DOM semántico sin anidaciones inválidas. |
| **RNF-08** | Todo dato proveniente de la API externa debe parsearse de manera estricta. | Seguridad | Validación con esquemas Zod en la capa de adaptación. |
| **RNF-09** | Trazabilidad estructurada de los flujos de datos en consola. | Calidad | Logs descriptivos en consola durante la fase de desarrollo. |

---

## 3. Arquitectura del Sistema (Feature-Sliced Design)

El código fuente está organizado bajo la metodología **Feature-Sliced Design (FSD)**. Esta arquitectura agrupa el software por rodajas de dominio (slices) y capas (layers) de forma jerárquica:

```text
src/
├── app/          # Capa 6 (Initialization) - Estilos globales, providers y enrutador (App.jsx, main.jsx).
├── pages/        # Capa 5 (Views) - Páginas de la app (SearchPage, DetailPage) que componen widgets.
├── widgets/      # Capa 4 (Composition) - Bloques autónomos y reutilizables (SearchResults, UserProfileBento).
├── features/     # Capa 3 (Interactions) - Acciones de negocio del usuario (search-user, view-user-details).
├── entities/     # Capa 2 (Domain) - Componentes y lógica del dominio (user/api, user/model, user/ui).
└── shared/       # Capa 1 (Infrastructure) - Utilidades, clientes HTTP, hooks de sistema y componentes UI base.
```

### Reglas de Dependencias Fundamentales
1. **Flujo Descendente:** Las capas superiores pueden importar de las capas inferiores, pero **nunca** al revés (ej: un componente en `entities` nunca puede importar código de `widgets` o `pages`).
2. **Barrel Files (Public APIs):** Cada carpeta de slice debe tener un `index.js` que actúe como API pública. Las capas superiores solo pueden importar lo expuesto en esta API pública; las importaciones profundas (ej: `@/entities/user/ui/UserCard.jsx`) están prohibidas para preservar la encapsulación.

---

## 4. Patrones de Diseño Implementados

* **Adapter Pattern (Estructural):**
  * **Ubicación:** `src/entities/user/model/adapter.js`
  * **Implementación:** `userAdapter` transforma las propiedades crudas devueltas por la API de GitHub (como `avatar_url` o `public_repos`) al modelo unificado interno `UserProfile`.
  
* **Facade Pattern (Estructural):**
  * **Ubicación:** `src/features/search-user/model/useUserSearchFacade.js`
  * **Implementación:** Oculta la complejidad de enrutamiento, temporizadores de debounce y llamadas a hooks de TanStack Query exponiendo un conjunto simple de métodos y estados booleanos directos a la UI.

* **Factory Pattern (Creacional):**
  * **Ubicación:** `src/entities/user/ui/ResultFactory.jsx`
  * **Implementación:** Instancia de forma condicional `UserCard` u `OrganizationCard` evaluando la propiedad `type` del perfil (User vs Organization).

* **Compound Components (Estructural):**
  * **Ubicación:** `src/entities/user/ui/UserCard.jsx`
  * **Implementación:** Permite la composición flexible de tarjetas atando subcomponentes (`UserCard.Avatar`, `UserCard.Header`, `UserCard.Footer`) como propiedades estáticas de `UserCard`.

---

## 5. Estándares de Código y Documentación

### 1. Universal JSDoc
Todo archivo fuente debe documentar el **Porqué** técnico de las decisiones y agregar un bloque didáctico explicativo de JavaScript/React para programadores junior:
```javascript
/**
 * 🎓 CONCEPTO JUNIOR: [Concepto]
 * Explicación detallada y sencilla del concepto...
 */
```

### 2. Path Aliases
Se prohíben las importaciones relativas profundas (ej: `../../../../shared`). En su lugar, se configuró el alias `@/*` en `vite.config.js` y `jsconfig.json` para apuntar de forma absoluta a `src/`.
