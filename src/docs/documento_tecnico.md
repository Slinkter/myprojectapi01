# Documento Técnico de Software: API - GitHub Users

## 1. Introducción

Este documento técnico detalla la arquitectura, el diseño y la implementación de la aplicación "API - GitHub Users". El objetivo de la aplicación es proporcionar una interfaz de usuario (UI) para buscar y visualizar perfiles de usuarios de GitHub, destacando un enfoque moderno de desarrollo frontend con React, Redux Toolkit y las mejores prácticas de la industria.

## 2. Caso de Uso Principal

El caso de uso principal es la búsqueda de usuarios de GitHub por nombre de usuario y la visualización de una lista de los resultados obtenidos.

### Flujo Principal de Búsqueda de Usuarios

1.  **Inicio de la Aplicación**: El usuario abre la aplicación en su navegador.
2.  **Carga Inicial**: La aplicación carga automáticamente un conjunto inicial de usuarios por defecto. Se muestra un `SkeletonGrid` mientras se obtienen los datos.
3.  **Input de Búsqueda**: El usuario interactúa con el campo de búsqueda (`PageHeader`).
4.  **Debounce de Búsqueda**: A medida que el usuario escribe, el `searchTerm` se actualiza localmente, pero la solicitud a la API se retrasa (debounced) hasta que el usuario deja de escribir por un breve período.
5.  **Solicitud a la API**: Cuando el `debouncedSearchTerm` cambia, se dispara una acción para obtener usuarios de la API de GitHub.
6.  **Estados de Carga**: Durante la solicitud a la API, se muestra un `SkeletonGrid`.
7.  **Visualización de Resultados**:
    *   Si la búsqueda es exitosa y hay resultados, se muestra una `UserList` con `UserCard`s para cada usuario.
    *   Los `UserCard`s se cargan de forma perezosa (`React.lazy` y `useIntersectionObserver`).
    *   Si no se encuentran usuarios para el `searchTerm`, se muestra un `NotFound` (mensaje de "no encontrado").
    *   Si ocurre un error en la API, se muestra un `ErrorDisplay` con un botón para reintentar.
8.  **Alternar Tema**: El usuario puede cambiar entre el tema claro y oscuro mediante un botón en el encabezado. La preferencia se guarda.

## 3. Descripción del Sistema

La aplicación es una Single Page Application (SPA) desarrollada con React. Utiliza Redux Toolkit para la gestión del estado global y consume una API REST pública (GitHub API).

### Diagrama de Componentes (Mermaid)

```mermaid
graph TD
    A[main.jsx] --> B(App.jsx)
    B --> C(PageHeader)
    C -- searchTerm, handleSearch, isSearching --> InputComponent((Input))
    C -- isSearching --> Spinner((Spinner))
    C -- searchTerm --> XCircleIcon((XCircleIcon))
    B --> D(renderContent)
    D -- status="loading" --> E(SkeletonGrid)
    E --> F(SkeletonCard)
    D -- status="failed" --> G(ErrorDisplay)
    D -- status="succeeded" & users > 0 --> H(UserList)
    H --> I(UserCard)
    D -- status="succeeded" & users = 0 --> J(NotFound)
    B --> K(IconButton)
    K --> L(SparklesIcon/MoonIcon)
    B --> M(useTheme)
    B --> N(useDebouncedSearch)
    B --> O(useUserFetching)
    O -- fetches --> P(GitHub API)
    O --> R(Redux Store - users.users, users.status, users.error)
```

### Diagrama de Flujo de Datos (Mermaid)

```mermaid
graph LR
    User -- types --> A[Input de Búsqueda en PageHeader]
    A --> B{setSearchTerm en useDebouncedSearch}
    B -- localSearchTerm --> C[App.jsx]
    C -- debouncedSearchTerm (después de 300ms) --> D{useUserFetching Hook}
    D -- dispatch fetchUsers(debouncedSearchTerm) --> E[Redux Action: users/fetchUsers]
    E -- API Request --> F(GitHub API)
    F -- Response (users data / error) --> G[Redux Reducer: usersSlice]
    G -- updates state --> H{Redux Store (users: [], status: '', error: '')}
    H -- useSelector --> C
    C -- conditional rendering --> I{UI Components: SkeletonGrid, UserList, ErrorDisplay, NotFound}
    I --> User
```

### Diagrama de Rutas

Dado que es una SPA sin un router explícito (como React Router), el enrutamiento es implícito y se gestiona mediante el estado de la aplicación.
*   **`/` (Raíz)**: La aplicación principal, que muestra el campo de búsqueda y la lista de usuarios (o el estado correspondiente).

## 4. Requerimientos Funcionales (RF)

*   **RF01**: La aplicación debe permitir buscar usuarios de GitHub.
*   **RF02**: La búsqueda debe ser "debounced" para evitar llamadas excesivas a la API.
*   **RF03**: La aplicación debe mostrar una lista de usuarios de GitHub que coincidan con el término de búsqueda.
*   **RF04**: Cada usuario en la lista debe mostrar su avatar, nombre de usuario y un enlace a su perfil de GitHub.
*   **RF05**: La aplicación debe mostrar un indicador de carga (`SkeletonGrid`) mientras se obtienen los resultados de la búsqueda.
*   **RF06**: La aplicación debe mostrar un mensaje claro si no se encuentran usuarios para un término de búsqueda dado (`NotFound`).
*   **RF07**: La aplicación debe mostrar un mensaje de error y permitir reintentar la búsqueda si ocurre un fallo en la llamada a la API (`ErrorDisplay`).
*   **RF08**: La aplicación debe permitir alternar entre un tema de interfaz claro y oscuro.
*   **RF09**: La preferencia de tema del usuario debe persistir entre sesiones.

## 5. Requerimientos No Funcionales (RNF)

*   **RNF01 (Rendimiento)**: La carga inicial de la aplicación y la visualización de resultados deben ser rápidas y eficientes.
*   **RNF02 (Responsividad)**: La interfaz de usuario debe ser completamente funcional y visualmente atractiva en diferentes tamaños de pantalla (móvil, tablet, escritorio).
*   **RNF03 (Mantenibilidad)**: El código debe ser modular, legible y fácil de mantener y extender.
*   **RNF04 (Escalabilidad)**: La arquitectura debe permitir la adición de nuevas características sin refactorizaciones importantes.
*   **RNF05 (Reutilización)**: La lógica de negocio y los componentes de UI deben ser diseñados para la máxima reutilización.
*   **RNF06 (Fiabilidad)**: La aplicación debe manejar errores de API y condiciones de red de forma robusta.
*   **RNF07 (Experiencia de Usuario)**: Proporcionar feedback visual claro al usuario durante las operaciones (cargas, errores).

## 6. Procesos Clave del Sistema

*   **Inicialización**: Al cargar `main.jsx`, React monta `App.jsx`. El hook `useUserFetching` dispara una acción inicial para cargar usuarios (si no hay término de búsqueda).
*   **Interacción de Búsqueda**:
    1.  El usuario escribe en el `Input` (`PageHeader`).
    2.  `handleSearch` (desde `App.jsx`, que usa `setSearchTerm` de `useDebouncedSearch`) actualiza el `searchTerm` local.
    3.  `useDebouncedSearch` retiene el `searchTerm` y lo libera como `debouncedSearchTerm` después del delay.
    4.  `useUserFetching` detecta el cambio en `debouncedSearchTerm` y despacha `fetchUsers`.
*   **Gestión de Tema**: El `IconButton` en `App.jsx` llama a `toggleTheme` (del hook `useTheme`), que actualiza el estado del tema, `localStorage` y la clase `dark` en el `<html>`.

## 7. Supuestos

*   La API de GitHub es accesible y responde con el formato esperado.
*   Los usuarios finales utilizarán navegadores web modernos.
*   El tamaño de los datos de usuario devueltos por la API de GitHub es manejable para el renderizado del lado del cliente.

## 8. Riesgos y Mitigaciones

*   **Riesgo**: Latencia alta o fallos en la API de GitHub.
    *   **Mitigación**: Implementación de estados de carga (`SkeletonGrid`) y manejo de errores (`ErrorDisplay`) con capacidad de reintento.
*   **Riesgo**: Problemas de rendimiento con un gran número de usuarios mostrados.
    *   **Mitigación**: `React.lazy` y `useIntersectionObserver` para la carga perezosa de `UserCard`s. Considerar virtualización de listas para volúmenes extremadamente altos.
*   **Riesgo**: Complejidad en el manejo del estado global.
    *   **Mitigación**: Uso de Redux Toolkit para simplificar la lógica de Redux, `createSlice` para encapsular la lógica de una característica, y `createAsyncThunk` para gestionar efectos secundarios.

## 9. Métricas Sugeridas

*   **Performance (Web Vitals)**:
    *   **LCP (Largest Contentful Paint)**: Medir la velocidad de carga de los elementos visuales más grandes.
    *   **FID (First Input Delay)**: Medir la interactividad de la aplicación.
    *   **CLS (Cumulative Layout Shift)**: Medir la estabilidad visual.
*   **UX**:
    *   Tiempo de respuesta de búsqueda.
    *   Tasa de clics en el botón de reintento (indicador de errores de API o red).
*   **Mantenibilidad**:
    *   Complejidad ciclomática del código.
    *   Número de líneas de código por archivo/componente.
    *   Cobertura de pruebas (futuro).

## 10. APIs Utilizadas

*   **GitHub Users API**: `https://api.github.com/users` (para obtener la lista de usuarios y detalles básicos).

## 11. Flujo de Estado

El estado de la aplicación se gestiona principalmente a través de **Redux Toolkit**.

### Estado Global (Redux Store)

*   **`users` slice**:
    *   `users`: `Array<User>` (ej. `[{ id: 1, login: "octocat", ... }]`).
    *   `status`: `enum` (`"idle" | "loading" | "succeeded" | "failed"`).
    *   `error`: `object | null` (ej. `{ message: "Network Error", status: 500 }`).

### Estado Local (Hooks)

*   **`useDebouncedSearch`**: Mantiene un `inputValue` local para el campo de búsqueda que se actualiza inmediatamente, y un `debouncedValue` que se actualiza después de un retraso, siendo este último el que se usa para disparar las peticiones a la API.
*   **`useTheme`**: Mantiene el `theme` actual (`"light"` o `"dark"`) como estado local dentro del hook, persistiendo en `localStorage`.
*   **Componentes UI**: Utilizan `useState` para gestionar estados efímeros o específicos de la UI que no necesitan ser globales (ej. estado de un modal).
