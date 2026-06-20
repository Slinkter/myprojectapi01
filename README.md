# 🚀 GitExplorer — Artefacto de Ingeniería React (Nivel Master)

> **Repositorio Educativo de Alto Rendimiento.** Una Single Page Application (SPA) diseñada bajo estándares de arquitectura **Feature-Sliced Design (FSD)**, patrones de diseño **GoF** y un sistema de **Logging Educativo de 9 Pasos** único en su clase.

Este proyecto no es solo un explorador de perfiles de GitHub; es una **pieza de ingeniería documentada** para enseñar React avanzado, validación de datos en tiempo real y flujos de datos profesionales a desarrolladores que buscan dar el salto al nivel Senior.

---

## ✨ Características Destacadas

### 1. 🎓 Documentación JSDoc Universal
El 100% del código fuente está documentado siguiendo estándares de industria, incluyendo secciones exclusivas:
- **Técnico Senior:** Explicación del "porqué" de las decisiones arquitectónicas.
- **🎓 CONCEPTO JUNIOR:** Píldoras educativas que explican conceptos como Closures, Inmutabilidad, Virtual DOM y Patrones de Diseño de forma sencilla.

### 2. 🛡️ Arquitectura FSD & Patrones GoF
Estructura robusta que garantiza el desacoplamiento total:
- **Capas FSD:** `app`, `pages`, `widgets`, `features`, `entities`, `shared`.
- **Patrones:** **Adapter** (Normalización), **Facade** (Orquestación), **Factory** (Creación dinámica) y **Compound Components**.
- **Type Safety:** Validación estricta en runtime con **Zod**.

### 3. 📡 Logger Educativo de 9 Pasos (log.flow)
Visualiza el ciclo de vida de una petición y el renderizado en la consola del navegador con una traza profesional numerada:
1.  **Mounting** -> 2. **Shell** -> 3. **Pages** -> 4. **Widgets** -> 5. **Factory** -> 6. **Facade** -> 7. **Query** -> 8. **Service** -> 9. **Adapter**.

### 4. 🏭 ResultFactory y Compound Components
- `ResultFactory` aplica el patrón **Factory** para instanciar `UserCard` o `OrganizationCard` según el tipo de perfil.
- `UserCard` implementa **Compound Components** con tres sub-componentes: `.Avatar`, `.Header`, `.Footer`.
- `OrganizationCard` reutiliza `UserCard` inyectando contenido extra (badge "Organización") en el slot `Header`.
- **Error típico:** Usar un sub-componente inexistente (ej: `UserCard.Actions`) lanza *"Element type is invalid"*. La solución es verificar los sub-componentes disponibles.

### 5. 🎨 UI/UX de Alta Fidelidad
- **Estética Bento Grid:** Dashboards modernos para visualizar estadísticas de usuario.
- **Motion v12:** Animaciones fluidas basadas en física.
- **Tailwind CSS v4:** Sistema de diseño ultra-optimizado.
- **Pokéball Cursor:** Interacción visual única y reactiva.

---

## 🚀 Inicio Rápido

### Requisitos Previos
- Node.js 18+
- pnpm (recomendado)

### Instalación y Ejecución
```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/myprojectapi01.git

# 2. Instalar dependencias
pnpm install

# 3. Iniciar entorno de desarrollo (con MSW activo)
pnpm dev
```

> **Tip de Ingeniería:** Abre la consola del navegador (F12) para ver el **Logger Educativo** en acción mientras navegas.

---

## 📂 Estructura de Documentación

El proyecto cuenta con una biblioteca completa en `docs/`:

| Documento | Enfoque |
| :--- | :--- |
| [Guía del Proyecto](./docs/01-Guia-del-Proyecto.md) | Visión, requerimientos y stack. |
| [Arquitectura y Patrones](./docs/02-Arquitectura-y-Patrones.md) | **Deep Dive** en FSD, GoF y el Flujo de 9 Pasos. |
| [Guía de Desarrollo](./docs/03-Guia-de-Desarrollo.md) | Estándares de código, JSDoc y Logging. |
| [Artefactos de Ingeniería](./docs/ARTEFACTOS_INGENIERIA.md) | Documento técnico de 1000+ líneas. |
| [Guía de Estudio](./docs/GUIA_ESTUDIO.md) | Manual de React desde cero hasta avanzado. |
| [Prueba Técnica](./docs/PRUEBA_TECNICA.md) | Simulacro de entrevista técnica React. |
| [Simulacro Scrum](./docs/SIMULACRO_SCRUM.md) | Simulación completa de proyecto Scrum. |
| [FSD Nivel Pollito](./docs/FSD_NIVEL_POLLITO.md) | FSD explicado para principiantes. |
| [Big O Nivel Pollito](./docs/BIG_O_POLLITO.md) | Complejidad algorítmica explicada simple. |

---

## 🛠️ Stack Tecnológico

- **Core:** React 18.3, Vite 5.4.
- **Estado:** TanStack Query v5.
- **Validación:** Zod.
- **Estilos:** Tailwind CSS v4, Lucide Icons.
- **Mocking:** MSW (Mock Service Worker).

---

> MIT © 2026 — Diseñado por LJCR para la comunidad de ingeniería de software.
