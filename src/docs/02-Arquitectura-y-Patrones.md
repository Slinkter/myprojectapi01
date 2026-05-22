# 02 - Arquitectura Limpia (Clean Architecture) y Patrones Explicados

Este proyecto utiliza una **Arquitectura Limpia (Clean Architecture)** adaptada con principios de **Diseño Guiado por el Dominio (DDD)**. Hemos migrado de una estructura Feature-Sliced Design (FSD) a esta arquitectura en capas para lograr un desacoplamiento absoluto de la lógica de negocio frente a la infraestructura técnica (HTTP, React, APIs externas).

---

## 🏗️ Las 4 Capas del Sistema (Clean Architecture)

El código está estrictamente dividido en cuatro capas horizontales con una regla inquebrantable: **Las dependencias siempre apuntan hacia adentro (las capas externas conocen a las internas, pero las internas jamás conocen a las externas).**

```
 ┌────────────────────────────────────────────────────────┐
 │ presentation (Visuals, React Components, CSS)          │
 └───────────┬────────────────────────────────────────────┘
             ▼
 ┌────────────────────────────────────────────────────────┐
 │ application (Facades, Use Cases, Query Hooks, State)  │
 └───────────┬────────────────────────────────────────────┘
             ▼
 ┌────────────────────────────────────────────────────────┐
 │ infrastructure (httpClient, Services, Configs, Mocks)  │
 └───────────┬────────────────────────────────────────────┘
             ▼
 ┌────────────────────────────────────────────────────────┐
 │ domain (Entities, Zod Schemas, Adapters, ApiError)     │
 └────────────────────────────────────────────────────────┘
```

### 1. 🛡️ Capa de Dominio (`src/domain`)
La capa más interna y sagrada. Es **código JavaScript puro**, 100% independiente de React, interfaces visuales, o clientes HTTP. Contiene las reglas del negocio del buscador de perfiles.
*   **`schemas/`**: Esquemas de validación Zod (`user.js`) que aseguran la consistencia de los datos en tiempo de ejecución.
*   **`adapters/`**: Traductores e integradores de datos crudos (`userAdapter.js`). Normalizan y transforman las respuestas del exterior a entidades tipadas.
*   **`errors/`**: Errores propios de la aplicación (`ApiError.js`) que encapsulan fallas de negocio o de infraestructura.

### 2. 🔌 Capa de Infraestructura (`src/infrastructure`)
Es la capa encargada de los detalles técnicos del exterior: peticiones HTTP, configuración global del entorno, mocking de servicios y herramientas auxiliares.
*   **`api/`**: Contiene el cliente HTTP base (`httpClient.js`) y servicios especializados (`userService.js`) que se comunican con APIs externas (como GitHub).
*   **`config/`**: Parámetros globales y de entorno (`config.js`).
*   **`logger/`**: Sistema de trazas semántico y visual (`logger.js`).
*   **`mocks/`**: Entorno offline mediante MSW (`handlers.js`, `browser.js`) para emular el servidor de producción.

### 3. ⚙️ Capa de Aplicación (`src/application`)
Funciona como el director de orquesta. No define qué pintar ni cómo conectar la red directamente; en su lugar, organiza la lógica de los casos de uso del sistema.
*   **`queries/`**: Hooks reactivos de TanStack Query (`useUserQuery.js`, `useUserDetailQuery.js`) que manejan el ciclo de vida del estado del servidor.
*   **`facades/`**: Hooks de fachada (`useUserSearchFacade.js`). Este patrón encapsula toda la complejidad del flujo de debouncing, estados de Query, y disparadores, entregando a la UI un objeto limpio.
*   **`hooks/`**: Hooks reactivos transversales e independientes del dominio (`useTheme.js`, `useIntersectionObserver.js`, `useDebouncedSearch.js`).

### 4. 🎨 Capa de Presentación (`src/presentation`)
La capa visual más externa. Es responsable única y exclusivamente de representar el estado visual al usuario final y de capturar sus interacciones.
*   **`components/`**: Elementos de UI comunes y desacoplados (`ErrorBoundary.jsx`, `ThemeToggle.jsx`, `PageHeader.jsx`), junto con la factoría visual creacional (`ResultFactory.jsx`).
*   **`features/`**: Vistas completas de la aplicación (`users/UserSearch.jsx` y `user-detail/UserDetail.jsx`).
*   **`styles/`**: Estilo general y hoja CSS global (`index.css`) bajo Tailwind v4.

---

## 💎 Patrones de Diseño Clave

Para garantizar robustez técnica a nivel de ingeniería avanzada, aplicamos tres patrones de arquitectura clásicos:

### 1. El Patrón Adapter (Gof - Estructural)
*   **Problema**: La API de GitHub devuelve una estructura caótica con nombres variables (`avatar_url`, `html_url`) y datos que podrían venir corruptos o vacíos.
*   **Solución**: El adaptador (`userAdapter.js`) recibe estos datos crudos, los valida estrictamente con Zod a nivel de tiempo de ejecución (fallo inmediato ante inconsistencia de datos), y devuelve un modelo unificado `UserProfile` con nombres de propiedades limpios (`photo`, `username`, `repos`).

### 2. El Patrón Facade (GoF - Estructural)
*   **Problema**: Si `UserSearch.jsx` tuviera que gestionar manualmente el estado de debouncing, llamar a TanStack Query, evaluar si el resultado está vacío, capturar errores de cuotas de API, e inicializar toasts, el código tendría cientos de líneas y sería inmantenible.
*   **Solución**: Creamos `useUserSearchFacade.js`. Este hook es la "Fachada". Pide la comida a la cocina (servicios y hooks internos) y la entrega limpia a la mesa (el componente visual). El componente visual `UserSearch.jsx` es extremadamente simple y legible.

### 3. El Patrón Factory (GoF - Creacional)
*   **Problema**: Dependiendo del tipo de entidad que retorne la búsqueda (un usuario individual o una organización), la UI debe renderizar tarjetas con características, badges e interacciones completamente diferentes.
*   **Solución**: La factoría visual `ResultFactory.jsx` evalúa el campo `.type` estandarizado en la entidad de dominio y decide dinámicamente si crear un `OrganizationCard` (con badge de ORG e interacciones específicas) o un `UserCard` estándar, encapsulando las decisiones de creación.

---

## 🎨 Arquitectura del Diseño Visual: Glassmorphism + Sistema de Temas

En la capa de presentación, la arquitectura de diseño se rige por un sistema **glassmorphism con doble tema** (light/dark), minimalismo funcional y animaciones físicas:

### 1. Sistema Glassmorphism (CSS Variables)
*   **Variables glass globales**: Declaramos en `:root` y `.dark` las variables `--glass-bg` (fondo semi-transparente), `--glass-border` (borde sutil), `--glass-shadow` (sombra suave) y `--glass-blur` (20px de desenfoque).
*   **Clases utilitarias glass**: `.glass`, `.glass-card`, `.glass-card-hover`, `.glass-input`, `.btn-glass`, `.badge`. Cada una aplica el efecto frosted glass con `backdrop-filter: blur(20px)`, bordes de 1px y sombras.
*   **Integración con Tailwind CSS v4**: Mediante `@theme`, mapeamos las variables CSS a utilidades de Tailwind (`bg-bg`, `text-text`, `border-border`, `text-accent`, `bg-surface`), posibilitando un cambio de tema instantáneo sin clases condicionales en el JSX.

### 2. Doble Tema (Light / Dark)
*   **Light "Holographic Terminal"**: Fondo cálido `#F0EDE8`, superficies blancas, acentos teal `#0D9488`, bordes `#E5E2DC`, texto oscuro `#1A1A2E`.
*   **Dark "Cyberpunk"**: Fondo profundo `#0A0A0F`, acentos neón cyan `#00F0FF`, bordes `#1E1E2A`, texto claro `#E8E8F0`.
*   El toggle de tema (`ThemeToggle`) alterna la clase `.dark` en `<html>`, y todas las variables CSS se actualizan instantáneamente.

### 3. Micro-Interacciones y Física de Resortes (Spring Physics)
*   **Comportamiento Orgánico**: Se emplea el modelo físico de resortes en `motion/react` (`stiffness` y `damping`) para evitar animaciones lineales.
*   **Variantes y Propagación**: Los componentes padre definen el ciclo de estados (`initial`, `animate`, `hover`). Motion propaga estas directrices a sub-componentes para coordinar animaciones.
*   **Orquestación en Cascada (Staggered Animation)**: La cuadrícula de resultados y el Bento Grid en `UserDetail` implementan variantes con `staggerChildren` y `delayChildren`.

### 4. Principios de Minimalismo Funcional
*   **Sin ruido visual**: Eliminamos scanlines, efectos glitch, círculos decorativos y tramas de fondo pesadas. La interfaz respira con espacio generoso y bordes `rounded-xl`.
*   **UX sin Navbar**: Se eliminó la barra de navegación superior para una experiencia inmersiva que arranca directo en el hero de búsqueda.
*   **Tarjetas de Alta Densidad**: Altura compacta `190px` con padding equilibrado, maximizando legibilidad sin espacios vacíos.
*   **Jerarquía visual limpia**: Tipografía Orbitron para headings, Inter para cuerpo, JetBrains Mono para datos técnicos.
