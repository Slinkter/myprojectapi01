# 🚀 API - GitHub Users: The Senior React Artifact

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![React Version](https://img.shields.io/badge/React-19_Concurrent-blue)
![Tailwind Version](https://img.shields.io/badge/Tailwind-v4_Semantic-38bdf8)
![Motion Version](https://img.shields.io/badge/Motion-v12_Fluid-ff0055)
![Architecture](https://img.shields.io/badge/Patterns-Facade_|_Adapter_|_FSD-orange)

> **Una aplicación de ingeniería de alto rendimiento para explorar la API de GitHub, diseñada bajo estándares de Vercel y principios de Arquitectura Limpia.**

🏆 **Logro de Ingeniería:** Proyecto auditado con un score de **100/100 en React Doctor**. Implementa **Concurrent UI** para una respuesta de entrada instantánea y un **Sistema de Temas Semánticos** basado íntegramente en CSS nativo a través de Tailwind v4.

---

## 🏗️ Arquitectura de Software (Master's Level)

Este proyecto no es solo una UI; es un sistema desacoplado siguiendo patrones de diseño clásicos y modernos:

1.  **Adapter Pattern (GoF):** Normalización de datos de la API externa a un modelo de dominio propio (`UserProfile`), protegiendo la UI de cambios en GitHub.
2.  **Facade Pattern:** Encapsulación de la lógica de Redux, Thunks y Hooks en una interfaz limpia (`useUserSearchFacade`) para los componentes de presentación.
3.  **Concurrent Rendering:** Uso de `useTransition` de React 19 para priorizar la interactividad del usuario sobre el renderizado pesado de listas.
4.  **Memoized Data Flow:** Tubería de datos optimizada con `createSelector` para evitar re-renders innecesarios.

---

## 🎨 Design System & Motion

- **Tailwind CSS v4:** Migración total a variables CSS semánticas (`--color-app-bg`, `--color-app-surface`).
- **Motion v12:** Animaciones de grid fluidas y entradas escalonadas (`staggered reveals`) para una experiencia de usuario nativa.
- **Responsive Artifacts:** Componentes diseñados con **Atomic Design** y **Lite Virtualization** (`content-visibility: auto`).

---

## 🛠️ Stack Tecnológico Pro

| Categoría      | Tecnologías                                                          |
| -------------- | -------------------------------------------------------------------- |
| **Core**       | React 19, Vite 6                                                     |
| **Estilos**    | Tailwind CSS v4 (Motor Lightning CSS)                                |
| **Estado**     | Redux Toolkit (Memoized Selectors)                                   |
| **Motion**     | Motion v12 (High Fidelity Animations)                                |
| **Doc Standards**| JSDoc Advanced (Type-Safe IntelliSense)                            |

---

## 📖 Documentación Profunda

Consulta la biblia técnica del proyecto en [`src/docs/`](./src/docs/):

- 🏗️ **[Arquitectura Detallada](./src/docs/02-arquitectura.md)**: El flujo Facade-Adapter.
- 🔄 **[Flujo de Datos Memoizado](./src/docs/05-flujo-de-datos.md)**: Cómo viajan los datos.
- 🎨 **[Sistema de Temas Semánticos](./src/docs/09-auditoria-diseño.md)**: Tokens de Tailwind v4.

---

## 🚀 Instalación y Despliegue

```bash
pnpm install
pnpm dev    # Desarrollo con Hot Reload
pnpm build  # Compilación optimizada (Lightning CSS)
```

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. © 2026 LJCR Engineering.
