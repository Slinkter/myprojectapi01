# Tutorial Completo: Creación de un Visor de Perfiles de GitHub con React

Este tutorial te guiará a través de la estructura y el código del proyecto, explicando cómo las diferentes partes (React, Redux, Hooks, Tailwind CSS) trabajan juntas para crear una aplicación funcional. Este documento refleja el estado actual y corregido del código.

## 1. Introducción y Tecnologías

Esta aplicación permite buscar y visualizar perfiles de la **GitHub API**. Utiliza un stack moderno de frontend:

-   **React**: Para construir la interfaz de usuario.
-   **Vite**: Como herramienta de construcción y servidor de desarrollo.
-   **Redux Toolkit**: Para una gestión de estado predecible.
-   **Tailwind CSS**: Estilizado utility-first usando la paleta estándar (Green, Gray, Blue, etc.).
-   **Material Tailwind**: Para componentes de UI pre-construidos totalmente integrados.

## 2. Configuración del Proyecto

Para ejecutar este proyecto localmente, sigue estos pasos:

1.  **Clona el repositorio:**

    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd <NOMBRE_DEL_PROYECTO>
    ```

2.  **Instala las dependencias:** Se recomienda usar `pnpm`.

    ```bash
    pnpm install
    ```

3.  **Ejecuta el servidor de desarrollo:**
    ```bash
    pnpm dev
    ```
    La aplicación estará disponible en `http://localhost:5173`.

## 3. Arquitectura General

La arquitectura actual se centra en el componente `App.jsx`, que actúa como el orquestador principal de la aplicación.

-   **`App.jsx`**: Gestiona el estado de la UI, las interacciones del usuario y el flujo de datos.
-   **`src/hooks`**: Contiene hooks personalizados que encapsulan lógicas reutilizables (búsqueda con debounce, gestión del tema, etc.), que son consumidos principalmente por `App.jsx`.
-   **`src/features/users/usersSlice.js`**: Define el estado global de los usuarios, las acciones y la lógica para interactuar con la API externa.
-   **`src/components`**: Almacena componentes de UI, en su mayoría "presentacionales" y reutilizables.

---

## 4. Guía de Implementación Paso a Paso

### Paso 1: El Corazón del Estado - `usersSlice.js`

Todo comienza con la definición de nuestro estado global. Usando `createSlice` de Redux Toolkit, definimos el estado inicial, los reducers y las acciones asíncronas (thunks).

-   **`initialState`**: Mantiene la lista de `users`, el `status` de la petición (cargando, éxito, fallo), `error`, información de `paginación`, y el `searchQuery`.
-   **`createAsyncThunk ('fetchUsers')`**: Gestiona la llamada a la **GitHub API** (`https://api.github.com/`). Se encarga de la lógica asíncrona y despacha acciones `pending`, `fulfilled`, o `rejected` automáticamente.
-   **`extraReducers`**: Escucha las acciones despachadas por el thunk y actualiza el estado correspondientemente. Por ejemplo, cuando `fetchUsers.fulfilled` se dispara, añade los nuevos usuarios a la lista.

```javascript
// src/features/users/usersSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ... (código del slice) ...

export const { setSearchQuery, resetUsers } = usersSlice.actions;
export default usersSlice.reducer;
```

### Paso 2: Abstracción de Lógica con Hooks Personalizados

Los hooks personalizados nos ayudan a mantener `App.jsx` más limpio.

-   **`useDebouncedSearch.js`**: Devuelve un valor de búsqueda "debounced". Esto es crucial para evitar hacer una petición a la API en cada pulsación de tecla, esperando a que el usuario termine de escribir.
-   **`useTheme.js`**: Gestiona el estado del tema (claro/oscuro) a través de un Context de React. Proporciona el tema actual y una función para cambiarlo.
-   **`useUserFetching.js`**: Actúa como un puente entre los componentes y el store de Redux. Usa los hooks `useSelector` y `useDispatch` para obtener los datos de los usuarios y despachar acciones, proveyendo una interfaz simple al componente que lo usa.

### Paso 3: El Orquestador - `App.jsx`

Este es el componente principal que une todo.

1.  **Invoca los Hooks**: Llama a `useTheme`, `useDebouncedSearch`, y `useUserFetching` para obtener el estado y las funciones que necesita.
2.  **Maneja la Lógica de Renderizado**: Usa una función `renderContent()` para decidir qué mostrar en pantalla basándose en el `status` de la petición (un esqueleto de carga, un mensaje de error o la lista de usuarios).
3.  **Pasa Datos a los Hijos**: Proporciona el término de búsqueda y los manejadores de eventos a los componentes hijos como `PageHeader`.

```javascript
// src/App.jsx
const App = () => {
    // 1. Obtiene estado y lógica de los hooks
    const [theme, toggleTheme] = useTheme();
    const [searchTerm, setSearchTerm, debouncedSearchTerm] = useDebouncedSearch("", 300);
    const { users, status, error } = useUserFetching(debouncedSearchTerm);

    // 2. Define cómo renderizar basado en el estado
    const renderContent = () => {
        if (status === "loading") return <SkeletonGrid />;
        if (status === "failed") return <ErrorDisplay ... />;
        if (status === "succeeded") {
            return users.length > 0 ? <UserList users={users} /> : <NotFound ... />;
        }
        return null;
    };

    // 3. Compone la UI
    return (
        <main className="app">
            <ThemeToogleButton theme={theme} toggleTheme={toggleTheme} />
            <PageHeader searchTerm={searchTerm} handleSearch={...} />
            {renderContent()}
        </main>
    );
};
```

### Paso 4: Componentes de UI

-   **`PageHeader.jsx`**: Un componente simple que muestra el título y la barra de búsqueda. Recibe el valor de la búsqueda y la función para manejar los cambios como props desde `App.jsx`.
-   **`UserList.jsx`**: Un componente presentacional que recibe la lista de `users` y la renderiza. Utiliza `React.lazy` y `Suspense` para cargar `UserCard` de forma perezosa, mejorando el rendimiento inicial.
-   **`UserCard.jsx`**: Muestra la información de un solo usuario. Utiliza `React.memo` para evitar re-renderizados innecesarios y `useIntersectionObserver` para aplicar una animación de entrada cuando la tarjeta aparece en pantalla.

---

## 5. Conclusión del Tutorial

Este tutorial ha cubierto la arquitectura y el flujo de trabajo de la aplicación en su estado actual. Hemos visto cómo Redux Toolkit gestiona el estado, cómo los hooks personalizados encapsulan la lógica, y cómo `App.jsx` centraliza y orquesta la UI.

A partir de aquí, un buen siguiente paso sería la refactorización hacia una arquitectura más desacoplada, moviendo la lógica de obtención de datos de `App.jsx` a un componente contenedor más específico, y añadiendo pruebas unitarias para asegurar la fiabilidad del código.
