# Proyecto: API - GitHub Users

## Descripción y Propósito

Este proyecto es una aplicación web moderna construida con React y Redux Toolkit, diseñada para buscar y visualizar perfiles de usuarios de GitHub utilizando su API pública. La aplicación demuestra buenas prácticas en el desarrollo frontend, incluyendo:

-   **Arquitectura Limpia (Clean Architecture)**: Separación clara de las preocupaciones, con lógica de negocio encapsulada en hooks reutilizables.
-   **Gestión de Estado Robusta**: Uso de Redux Toolkit para manejar el estado global de la aplicación, incluyendo estados de carga y errores de forma predecible.
-   **Optimización de Rendimiento**: Implementación de lazy loading de componentes y debounce en las búsquedas para una experiencia de usuario fluida.
-   **Diseño Responsivo y Tematización**: Soporte para temas claro/oscuro y una interfaz de usuario adaptable a diferentes tamaños de pantalla, construida con Tailwind CSS y Material Tailwind.
-   **Experiencia de Usuario (UX) Detallada**: Animaciones sutiles, estados de carga con esqueletos y manejo amigable de errores y resultados no encontrados.

El propósito principal es servir como una demostración de un desarrollo frontend de alta calidad, enfocado en la mantenibilidad, escalabilidad y rendimiento.

## Tecnologías Utilizadas

*   **Frontend**: React (con Vite para un entorno de desarrollo rápido)
*   **Gestión de Estado**: Redux Toolkit
*   **Estilos**: Tailwind CSS, Material Tailwind (librería de componentes UI de React basada en Tailwind CSS)
*   **Iconografía**: Heroicons
*   **Utilidades**: `prop-types` para validación de tipos
*   **Herramientas de Desarrollo**: ESLint (para calidad de código)

## Arquitectura del Sistema

El proyecto sigue una arquitectura modular y basada en características (Feature-Based Architecture), con una fuerte adherencia a los principios de Clean Architecture y la separación de preocupaciones.

### Principios Aplicados

*   **DRY (Don't Repeat Yourself)**: La lógica reutilizable se extrae en hooks personalizados.
*   **SOLID**: Especialmente el Principio de Responsabilidad Única (SRP), donde los componentes se enfocan en la UI y la lógica de negocio se delega a los hooks o Redux Slices.
*   **KISS (Keep It Simple, Stupid)**: Se prefieren soluciones directas y fáciles de entender.

### Estructura de Carpetas

La organización de carpetas está diseñada para la modularidad y la escalabilidad:

```
src/
├── app/                  # Configuración global de la aplicación (ej. store de Redux)
│   └── store.js
├── assets/               # Recursos estáticos (imágenes, iconos, etc.)
│   ├── Icons.jsx
│   └── react.svg
├── components/           # Componentes UI reutilizables
│   ├── layout/           # Componentes de diseño de página (ej. PageHeader, ErrorDisplay)
│   │   ├── ErrorDisplay.jsx
│   │   ├── NotFound.jsx
│   │   ├── PageHeader.jsx
│   │   ├── SkeletonGrid.jsx
│   │   └── UserList.jsx
│   ├── SkeletonCard.jsx  # Tarjeta esqueleto para estados de carga
│   └── UserCard.jsx      # Tarjeta individual de usuario
├── features/             # Módulos/Características específicas (cada uno con su propia lógica de Redux)
│   └── users/
│       └── usersSlice.js  # Slice de Redux para la gestión de usuarios y fetching de API
├── hooks/                # Hooks personalizados para encapsular lógica reutilizable
│   ├── useDebouncedSearch.js  # Lógica de debounce para inputs
│   ├── useIntersectionObserver.js # Lógica para detectar visibilidad de elementos
│   ├── useTheme.js            # Lógica para gestión de temas claro/oscuro
│   └── useUserFetching.js     # Lógica para obtención de datos de usuarios de la API
├── App.jsx               # Componente principal de la aplicación (orquestador de UI)
├── index.css             # Estilos globales y de Tailwind
└── main.jsx              # Punto de entrada de la aplicación (montaje de React y Redux Provider)
```

### Flujo de Datos y Estado (Redux Toolkit)

1.  **Redux Store (`app/store.js`)**: Configura el store central de Redux, que ahora solo contiene el `usersSlice`.
2.  **Slice (`features/users/usersSlice.js`)**: Gestiona el array de `users`, su `status` (estado de la petición) y `error`. Contiene el `createAsyncThunk` `fetchUsers` para interactuar con la API de GitHub, aceptando un término de búsqueda.
3.  **Hooks Personalizados (`hooks/`)**:
    *   `useDebouncedSearch`: Maneja el estado local del input de búsqueda y produce un `debouncedSearchTerm` que se actualiza solo después de una pausa en la escritura.
    *   `useUserFetching`: Utiliza `useDispatch` y `useSelector` para interactuar con `usersSlice`. Despacha `fetchUsers` con el `debouncedSearchTerm`. **En la carga inicial, cuando `debouncedSearchTerm` está vacío, esto obtiene una lista de usuarios por defecto.** Selecciona los datos (`users`, `status`, `error`) del store, exponiéndolos al componente que lo usa.
4.  **Componente `App.jsx`**: Es el orquestador principal de la UI.
    *   Utiliza `useTheme` para la tematización.
    *   Utiliza `useDebouncedSearch` para obtener el término de búsqueda actual y su versión "debounced".
    *   Utiliza `useUserFetching` para obtener el estado y los datos de los usuarios.
    *   Renderiza condicionalmente `SkeletonGrid`, `ErrorDisplay`, `UserList` o `NotFound` basándose en el `status` y los datos de `useUserFetching`.
    *   **Manejo Específico de Errores (403 Forbidden)**: En caso de que la API de GitHub responda con un error 403 (Forbidden), lo que ocurre con búsquedas no válidas o por exceso de peticiones, la aplicación ahora muestra un componente `<NotFound />` en lugar de un error genérico. Esto mejora la experiencia del usuario al proporcionar un mensaje más contextualizado ("Usuario no encontrado") para este tipo de escenarios.
    *   Pasa `searchTerm` y el handler de búsqueda al `PageHeader`.

### Decisiones de Diseño Clave

*   **Separación Lógica/UI**: `App.jsx` ha sido refactorizado para ser puramente presentacional. Toda la lógica de obtención de datos y de "debounce" ha sido extraída a `useUserFetching` y `useDebouncedSearch`, respectivamente. Esto facilita la reutilización de la lógica en otros contextos o proyectos.
*   **Lazy Loading**: Uso de `React.lazy` y `Suspense` para la carga perezosa de `UserCard`, con un `fallback` adecuado (`SkeletonCard`) para mejorar la UX y el rendimiento.
*   **Optimización de Rendimiento**: `useIntersectionObserver` se emplea en `UserCard` para la carga perezosa de imágenes, y `useDebouncedSearch` reduce las llamadas a la API.
*   **Tematización**: El hook `useTheme` implementa un sistema robusto de temas claro/oscuro con persistencia en `localStorage` y detección de preferencias del sistema.

## Cómo Instalar y Levantar el Proyecto

Para poner en marcha este proyecto en tu máquina local, sigue los siguientes pasos:

### Prerrequisitos

Asegúrate de tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior) y `pnpm` (administrador de paquetes recomendado).

### Instalación

1.  **Clona el repositorio:**
    ```bash
    git clone [URL_DEL_REPOSITORIO]
    cd [nombre_del_directorio_del_proyecto]
    ```
2.  **Instala las dependencias:**
    ```bash
    pnpm install
    ```

### Ejecución en Modo Desarrollo

Para ejecutar la aplicación en modo desarrollo con Vite:

```bash
pnpm dev
```

La aplicación estará disponible en `http://localhost:5173` (o el puerto que Vite asigne).

### Construcción para Producción

Para generar una versión optimizada para producción:

```bash
pnpm build
```

Los archivos estáticos generados se encontrarán en la carpeta `dist/`.

### Previsualización de la Versión de Producción

Para previsualizar la compilación de producción localmente:

```bash
pnpm preview
```

## Pruebas

*(Actualmente no hay pruebas unitarias ni de integración configuradas. Este sería un buen punto para futuras mejoras.)*

## TODOs y Roadmap de Mejoras

*   **Implementar Pruebas Unitarias/Integración**: Añadir pruebas exhaustivas para componentes, hooks y Redux slices.
*   **Gestión de APIs**: Podría abstraerse la lógica de llamada a la API a una capa de servicio dedicada fuera del slice de Redux para mayor flexibilidad.
*   **Paginación/Infinite Scroll**: Implementar paginación o carga infinita para manejar grandes volúmenes de resultados de búsqueda de forma más eficiente.
*   **Internacionalización (i18n)**: Soporte para múltiples idiomas.
*   **Accesibilidad (a11y)**: Realizar una auditoría de accesibilidad completa y aplicar mejoras.

## Explicaciones Pedagógicas y Fragmentos de Código

*(Estos se detallarán en el `tutorial_completo.md` y en el Documento Técnico de Software.)*