# Tutorial Completo: Construyendo la Aplicación "API - GitHub Users" desde Cero

¡Bienvenidos a este tutorial avanzado! Aquí, no solo te mostraré cómo funciona la aplicación "API - GitHub Users", sino que te guiaré paso a paso por su construcción, explicándote las decisiones arquitectónicas, las mejores prácticas y los fundamentos detrás de cada pieza de código.

Este proyecto es una demostración de cómo construir una aplicación React moderna y robusta, siguiendo principios de Clean Architecture, optimizaciones de rendimiento y una excelente experiencia de usuario.

---

## Índice

1.  **Visión General del Proyecto**
2.  **Configuración del Entorno Inicial**
    *   Creando el proyecto con Vite
    *   Instalando dependencias clave (React, Redux Toolkit, Tailwind CSS, Material Tailwind)
3.  **Estructura de Carpetas (Clean Architecture y Feature-Based)**
4.  **Gestión de Estado con Redux Toolkit**
    *   `app/store.js`: Configuración del Store
    *   `features/users/usersSlice.js`: Fetching de datos con `createAsyncThunk`
5.  **Hooks Personalizados: Encapsulando Lógica Reutilizable**
    *   `useTheme.js`: Gestión del tema claro/oscuro
    *   `useIntersectionObserver.js`: Lazy loading de elementos
    *   `useDebouncedSearch.js`: Implementando "debounce" para inputs
    *   `useUserFetching.js`: Lógica de fetching de usuarios integrada con Redux
6.  **Componentes de UI: Construyendo la Interfaz**
    *   `PageHeader.jsx`: Encabezado con buscador
    *   `UserCard.jsx`: Tarjeta individual de usuario (Lazy Loaded)
    *   `UserList.jsx`: Listado de usuarios
    *   `SkeletonCard.jsx` y `SkeletonGrid.jsx`: Estados de carga
    *   `ErrorDisplay.jsx` y `NotFound.jsx`: Manejo de errores y resultados vacíos
7.  **El Componente `App.jsx`: El Orquestador de la UI**
    *   Componiendo hooks y componentes para renderizar la aplicación
8.  **Estilos con Tailwind CSS y Material Tailwind**
9.  **Buenas Prácticas Aplicadas y Por Qué**
10. **Errores Comunes y Cómo Evitarlos**
11. **Optimizaciones Recomendadas (Roadmap)**
12. **Conclusión**

---

## 1. Visión General del Proyecto

Nuestra aplicación será un buscador de perfiles de GitHub. Permitirá a los usuarios buscar por nombre de usuario y verá una lista de resultados, cada uno con un avatar y un enlace al perfil. La aplicación tendrá:

*   Un encabezado con el título y un campo de búsqueda.
*   Gestión de estado con Redux Toolkit.
*   Lógica de búsqueda "debounced" para optimizar llamadas a la API.
*   Indicadores de carga (esqueletos) y manejo de errores.
*   Capacidad de alternar entre tema claro y oscuro.
*   Optimización de rendimiento mediante lazy loading de componentes e imágenes.

---

## 2. Configuración del Entorno Inicial

### Creando el proyecto con Vite

Vite es una herramienta de construcción frontend de nueva generación que ofrece una experiencia de desarrollo extremadamente rápida.

```bash
pnpm create vite my-github-app --template react
cd my-github-app
```

### Instalando dependencias clave

Instalaremos todas las librerías necesarias:

```bash
pnpm add react react-dom @reduxjs/toolkit react-redux prop-types
pnpm add -D tailwindcss postcss autoprefixer @heroicons/react @material-tailwind/react
```

*   `react`, `react-dom`: La base de nuestra aplicación.
*   `@reduxjs/toolkit`, `react-redux`: Para una gestión de estado predecible y eficiente.
*   `prop-types`: Para validación de tipos en componentes (útil en proyectos JavaScript).
*   `tailwindcss`, `postcss`, `autoprefixer`: Para el estilado utility-first.
*   `@heroicons/react`: Iconos vectoriales para la interfaz.
*   `@material-tailwind/react`: Componentes de UI listos para usar, basados en Material Design y Tailwind CSS.

### Configuración de Tailwind CSS

Genera los archivos de configuración de Tailwind:

```bash
npx tailwindcss init -p
```

Configura `tailwind.config.cjs` y `postcss.config.cjs` (los encontrarás en la raíz de tu proyecto) para que Tailwind procese tus archivos de React.

**`tailwind.config.cjs`:**

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

**`postcss.config.cjs`:**

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

**`index.css`:**

Este archivo será el punto de entrada para los estilos de Tailwind. Agrega las directivas de Tailwind en `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Añade aquí tus estilos personalizados si es necesario */
```

### Configuración de Material Tailwind

Asegúrate de envolver tu aplicación con el `ThemeProvider` de Material Tailwind. Edita `src/main.jsx`:

```jsx
// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ThemeProvider } from '@material-tailwind/react'; // Importa ThemeProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider> {/* Envuelve tu App con ThemeProvider */}
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
```

---

## Despliegue en GitHub Pages

Una vez que tu aplicación está lista, puedes desplegarla fácilmente en GitHub Pages para compartirla con el mundo.

### 1. Configurar `homepage` en `package.json`

Primero, necesitas decirle a tu aplicación en qué ruta se servirá. Agrega la propiedad `homepage` a tu `package.json`:

```json
{
  "homepage": "https://<tu-usuario-de-github>.github.io/<el-nombre-de-tu-repositorio>",
  "name": "myprojectapi01",
  "private": true,
  // ... resto del archivo
}
```
*   Reemplaza `<tu-usuario-de-github>` con tu nombre de usuario de GitHub.
*   Reemplaza `<el-nombre-de-tu-repositorio>` con el nombre de tu repositorio en GitHub.

### 2. Configurar la Ruta Base en Vite

Para que Vite sepa que los recursos se servirán desde una subcarpeta, necesitas configurar `base` en tu archivo `vite.config.js`.

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/<el-nombre-de-tu-repositorio>/' // ¡Importante!
})
```
*   Reemplaza `<el-nombre-de-tu-repositorio>` con el nombre de tu repositorio.

### 3. Instalar `gh-pages`

El paquete `gh-pages` facilita el proceso de despliegue. Ya lo tenemos como dependencia de desarrollo. Si no lo tuvieras, lo instalarías así:

```bash
pnpm add -D gh-pages
```

### 4. Añadir Scripts de Despliegue

Añade los scripts `predeploy` y `deploy` a tu `package.json`. Estos scripts ya están configurados en este proyecto:

```json
"scripts": {
  // ... otros scripts
  "predeploy": "pnpm build",
  "deploy": "gh-pages -d dist"
},
```
*   `predeploy`: Este script se ejecuta automáticamente antes del `deploy` y se encarga de construir la versión de producción de tu aplicación.
*   `deploy`: Este script toma la carpeta `dist` (la salida de la construcción) y la publica en la rama `gh-pages` de tu repositorio.

### 5. Desplegar la Aplicación

Ahora, todo lo que necesitas hacer es ejecutar el siguiente comando en tu terminal:

```bash
pnpm run deploy
```

Este comando construirá tu aplicación y la desplegará. Después de unos minutos, tu aplicación estará disponible en la URL que especificaste en la propiedad `homepage`.

### 6. Configurar el Repositorio de GitHub

Finalmente, asegúrate de que tu repositorio de GitHub esté configurado para servir desde la rama `gh-pages`.

1.  Ve a tu repositorio en GitHub.
2.  Haz clic en "Settings" (Configuración).
3.  En el menú de la izquierda, selecciona "Pages".
4.  En la sección "Build and deployment", bajo "Branch", asegúrate de que la rama `gh-pages` y la carpeta `/ (root)` estén seleccionadas.

¡Y eso es todo! Tu aplicación ahora está en vivo.

---

## 3. Estructura de Carpetas (Clean Architecture y Feature-Based)

Una estructura de carpetas bien organizada es crucial para la mantenibilidad y escalabilidad. Adoptamos un enfoque híbrido:

*   **Feature-Based**: Agrupamos archivos relacionados por la característica que implementan (ej. `users`, `search`).
*   **Layered (Clean Architecture)**: Dentro de las características y a nivel global, separamos las responsabilidades en capas lógicas (UI, lógica de negocio/hooks, estado/Redux).

```
src/
├── app/                  # Configuración global de la aplicación (ej. store de Redux)
├── assets/               # Recursos estáticos
├── components/           # Componentes UI reutilizables
│   └── layout/           # Componentes de layout (contenedores)
├── features/             # Módulos/Características específicas (ej. users)
│   └── users/
├── hooks/                # Hooks personalizados (lógica reutilizable)
├── App.jsx               # Componente principal
├── index.css             # Estilos
└── main.jsx              # Punto de entrada
```

---

## 4. Gestión de Estado con Redux Toolkit

Redux Toolkit simplifica la gestión de estado global, permitiéndonos escribir código Redux de forma más concisa y eficiente.

### `app/store.js`: Configuración del Store

Aquí configuramos nuestro store de Redux. Tras la refactorización, solo necesitamos el `usersSlice`.

```jsx
// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/users/usersSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer, // El reducer de usuarios se encarga de todo el estado relacionado con los usuarios
  },
});
```

Envolvemos nuestra aplicación con el `Provider` de `react-redux` en `src/main.jsx` para que el store sea accesible a todos los componentes:

```jsx
// src/main.jsx
// ... (otros imports)
import { Provider } from 'react-redux'; // Importa Provider
import { store } from './app/store'; // Importa tu store

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}> {/* Envuelve tu App con Provider */}
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
```

### `features/users/usersSlice.js`: Fetching de datos con `createAsyncThunk`

Este slice maneja todo el estado relacionado con los usuarios: la lista, el estado de la carga (`loading`, `succeeded`, `failed`) y cualquier error.

```jsx
// src/features/users/usersSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL = "https://api.github.com";

export const fetchUsers = createAsyncThunk(
    "users/fetchUsers",
    async (searchTerm = "", { rejectWithValue }) => {
        try {
            const url = searchTerm
                ? `${API_BASE_URL}/search/users?q=${searchTerm}`
                : `${API_BASE_URL}/users`;
            const response = await fetch(url);
            if (!response.ok) {
                const errorMessage = `HTTP error! status: ${response.status} - ${response.statusText}`;
                return rejectWithValue({ message: errorMessage, status: response.status });
            }
            const data = await response.json();
            return searchTerm ? data.items : data;
        } catch (error) {
            return rejectWithValue({ message: error.message, status: undefined });
        }
    }
);

const initialState = {
    isLoading: "idle",
    error: null, // Almacena el objeto de error si la carga falla: `{ message: string, status?: number }`.
    users: [],
};

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.isLoading = "loading";
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.isLoading = "succeeded";
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.isLoading = "failed";
                state.error = action.payload;
            });
    },
});

export default usersSlice.reducer;
```
*   **Decisión clave**: `fetchUsers` ahora acepta un `searchTerm`. Esto permite que el mismo thunk maneje tanto la carga inicial (sin término) como las búsquedas específicas, apuntando a `/users` o a `/search/users` según corresponda.

---

## 5. Hooks Personalizados: Encapsulando Lógica Reutilizable

Los hooks personalizados son funciones JavaScript que nos permiten reutilizar lógica con estado y efectos entre componentes. Son una pieza fundamental de la arquitectura de este proyecto.

### `useTheme.js`: Gestión del tema claro/oscuro

Este hook gestiona el tema de la aplicación, persistiendo la preferencia en `localStorage` y detectando la preferencia del sistema operativo.

```jsx
// src/hooks/useTheme.js
import { useState, useEffect } from "react";

/**
 * @hook useTheme
 * @description Hook personalizado para gestionar el tema de la aplicación (claro/oscuro).
 * Persiste la preferencia del usuario en localStorage.
 * @returns {[string, function]} - El tema actual y la función para cambiarlo.
 */
export const useTheme = () => {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            return savedTheme;
        }
        const prefersDark = window.matchMedia?.(
            "(prefers-color-scheme: dark)"
        ).matches;
        return prefersDark ? "dark" : "light";
    });

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    useEffect(() => {
        const root = document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    return [theme, toggleTheme];
};
```

### `useIntersectionObserver.js`: Lazy loading de elementos

Un hook genérico para detectar cuándo un elemento entra en el viewport, ideal para animaciones o carga perezosa de contenido.

```jsx
// src/hooks/useIntersectionObserver.js
import { useState, useEffect } from "react";

/**
 * @hook useIntersectionObserver
 * @description Custom hook que detecta si un elemento es visible en el viewport.
 * @param {React.RefObject} elementRef - La referencia al elemento del DOM que se quiere observar.
 * @param {object} options - Opciones para el IntersectionObserver (threshold, root, rootMargin).
 * @param {number} options.threshold - Un número entre 0 y 1 que indica qué porcentaje del elemento debe estar visible para que se active.
 * @returns {boolean} - Devuelve `true` si el elemento está intersectando (visible), de lo contrario `false`.
 */
const useIntersectionObserver = (elementRef, { threshold = 0.1 } = {}) => {
    const [isIntersecting, setIsIntersecting] = useState(false);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting);
            },
            { threshold }
        );

        observer.observe(element);

        return () => {
            observer.unobserve(element);
        };
    }, [elementRef, threshold]);

    return isIntersecting;
};

export default useIntersectionObserver;
```

### `useDebouncedSearch.js`: Implementando "debounce" para inputs

Este hook es crucial para optimizar el rendimiento en las búsquedas. Retrasa la actualización de un valor hasta que el usuario ha pausado su interacción.

```jsx
// src/hooks/useDebouncedSearch.js
import { useState, useEffect } from 'react';

/**
 * @hook useDebouncedSearch
 * @description Hook personalizado para obtener un valor "debounced" de un input.
 * Es útil para retrasar la ejecución de una operación costosa (como una llamada a API)
 * hasta que el usuario haya dejado de escribir por un período determinado.
 *
 * @param {any} initialValue - El valor inicial.
 * @param {number} delay - El tiempo de espera en milisegundos después de que el usuario deja de escribir.
 * @returns {Array} - Devuelve un array con tres elementos:
 *   - `inputValue` (any): El valor actual del input.
 *   - `setInputValue` (function): La función para actualizar el valor del input.
 *   - `debouncedValue` (any): El valor debounced.
 */
export const useDebouncedSearch = (initialValue, delay) => {
    const [inputValue, setInputValue] = useState(initialValue);
    const [debouncedValue, setDebouncedValue] = useState(initialValue);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(inputValue);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [inputValue, delay]);

    return [inputValue, setInputValue, debouncedValue];
};
```

### `useUserFetching.js`: Lógica de fetching de usuarios integrada con Redux

Este hook es un ejemplo perfecto de cómo encapsular la lógica de interacción con Redux y una API, dejando al componente de UI (`App.jsx`) limpio y enfocado en la presentación.

```jsx
// src/hooks/useUserFetching.js
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../features/users/usersSlice';

/**
 * @hook useUserFetching
 * @description Hook personalizado para gestionar la obtención de datos de usuarios.
 * Abstrae la lógica de despacho de acciones de Redux y la selección de estado,
 * exponiendo únicamente los datos y el estado de la petición.
 *
 * @param {string} debouncedSearchTerm - El término de búsqueda "debounced", que dispara la llamada a la API.
 * @returns {object} - Un objeto con el estado de la petición:
 *   - `users` (Array): La lista de usuarios obtenida.
 *   - `status` (string): El estado actual de la petición ('idle', 'loading', 'succeeded', 'failed').
 *   - `error` (string|null): El mensaje de error si la petición falla.
 */
export const useUserFetching = (debouncedSearchTerm) => {
    const dispatch = useDispatch();

    const {
        users,
        isLoading: status, // Renombramos isLoading a status para mayor claridad
        error
    } = useSelector((state) => state.users);

    useEffect(() => {
        // Dispara la acción asíncrona para obtener los usuarios.
        dispatch(fetchUsers(debouncedSearchTerm));
    }, [debouncedSearchTerm, dispatch]);

    return { users, status, error };
};
```
*   **Decisión clave**: El hook `useUserFetching` ahora toma el `debouncedSearchTerm` como argumento, lo que simplifica enormemente la lógica en `App.jsx`. Hemos renombrado `isLoading` a `status` al desestructurar el `useSelector` para una API más consistente con el nombre usado en `App.jsx`.

---

## 6. Componentes de UI: Construyendo la Interfaz

### `PageHeader.jsx`: Encabezado con buscador

Este componente es responsable de mostrar el título de la aplicación y el campo de búsqueda.

```jsx
// src/components/layout/PageHeader.jsx
import PropTypes from "prop-types";
import { Typography, Input, Spinner } from "@material-tailwind/react";
import { XCircleIcon } from "@heroicons/react/24/solid";

const PageHeader = ({ searchTerm, handleSearch, isSearching }) => (
    <header className="page-header">
        <div className="page-header__top-bar">
            <Typography variant="h1" color="inherit">
                API - Github Users
            </Typography>
        </div>

        <div className="search-form">
            <Input
                className="dark:text-white"
                label={isSearching ? "Cargando datos..." : "Buscar usuario..."}
                type="text"
                color="black"
                value={searchTerm}
                onChange={handleSearch}
                icon={
                    isSearching ? (
                        <Spinner className="h-5 w-5" />
                    ) : searchTerm ? (
                        <XCircleIcon
                            className="h-5 w-5 cursor-pointer text-gray-500 hover:text-gray-700"
                            onClick={() =>
                                handleSearch({ target: { value: "" } })
                            }
                        />
                    ) : null
                }
                disabled={isSearching}
            />
        </div>
    </header>
);

PageHeader.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    handleSearch: PropTypes.func.isRequired,
    isSearching: PropTypes.bool.isRequired,
};

export default PageHeader;
```

### `UserCard.jsx`: Tarjeta individual de usuario (Lazy Loaded)

Muestra la información de un usuario de GitHub. Utiliza `React.memo` para optimizar el re-renderizado y `useIntersectionObserver` para cargar la imagen de forma perezosa.

```jsx
// src/components/UserCard.jsx
import React, { useRef } from "react";
import PropTypes from "prop-types";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import useIntersectionObserver from "./hooks/useIntersectionObserver"; // Importamos el hook

const UserCard = React.memo(({ user }) => {
    const imgRef = useRef(null);
    const isVisible = useIntersectionObserver(imgRef, { threshold: 0.1 }); // Usamos el hook

    return (
        <Card className="user-card">
            <CardHeader shadow={false} floated={false} className="user-card__header">
                {/* Solo carga la imagen si es visible */}
                {isVisible && (
                    <img
                        ref={imgRef}
                        src={user.avatar_url}
                        alt="avatar"
                        className="user-card__avatar"
                        loading="lazy" // Atributo nativo para lazy loading de imágenes
                    />
                )}
            </CardHeader>
            <CardBody className="text-center">
                <Typography variant="h4" color="blue-gray" className="mb-2">
                    {user.login}
                </Typography>
            </CardBody>
            <CardFooter className="pt-0">
                <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                    <Button
                        variant="gradient"
                        className="user-card__button"
                        fullWidth
                    >
                        Ver Perfil
                    </Button>
                </a>
            </CardFooter>
        </Card>
    );
});

UserCard.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        login: PropTypes.string.isRequired,
        avatar_url: PropTypes.string.isRequired,
        html_url: PropTypes.string.isRequired,
    }).isRequired,
};

export default UserCard;
```
*   **Corrección**: He actualizado la ruta del import para `useIntersectionObserver` y ajustado el uso de `isVisible` para la carga condicional de la imagen.

### `UserList.jsx`: Listado de usuarios

Este componente renderiza una lista de `UserCard`s. Utiliza `React.lazy` para la carga perezosa de cada tarjeta y `Suspense` con `SkeletonCard` como fallback.

```jsx
// src/components/layout/UserList.jsx
import { Suspense, lazy } from "react";
import PropTypes from "prop-types";
import SkeletonCard from "../SkeletonCard"; // Importamos SkeletonCard

const UserCard = lazy(() => import("../UserCard"));

const UserList = ({ users }) => (
    <ul className="user-grid">
        {users.map((user, index) => (
            <li
                key={user.id}
                className="user-grid__item"
                style={{
                    animationDelay: `${index * 150}ms`,
                    animationFillMode: "backwards",
                }}
            >
                {/* Usamos SkeletonCard como fallback durante la carga perezosa */}
                <Suspense fallback={<SkeletonCard />}>
                    <UserCard user={user} />
                </Suspense>
            </li>
        ))}
    </ul>
);

UserList.propTypes = {
    users: PropTypes.array.isRequired,
};

export default UserList;
```

### `SkeletonCard.jsx` y `SkeletonGrid.jsx`: Estados de carga

Estos componentes proporcionan un feedback visual al usuario mientras los datos se están cargando.

**`SkeletonCard.jsx`:**

```jsx
// src/components/SkeletonCard.jsx
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
} from "@material-tailwind/react";

const SkeletonCard = () => (
    <Card className="skeleton-card">
        <CardHeader
            shadow={false}
            floated={false}
            className="skeleton-card__header"
        ></CardHeader>
        <CardBody className="text-center">
            <div className="skeleton-card__body-line"></div>
        </CardBody>
        <CardFooter className="pt-0">
            <div className="skeleton-card__footer-line"></div>
        </CardFooter>
    </Card>
);

export default SkeletonCard; // Exportación por defecto
```

**`SkeletonGrid.jsx`:**

```jsx
// src/components/layout/SkeletonGrid.jsx
import SkeletonCard from "../SkeletonCard"; // Importamos con exportación por defecto

const SKELETON_COUNT = 30; // Número de esqueletos a mostrar

const SkeletonGrid = () => (
    <ul className="user-grid">
        {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
            <li
                key={index}
                className="user-grid__item"
                style={{
                    animationDelay: `${index * 150}ms`,
                    animationFillMode: "backwards",
                }}
            >
                <SkeletonCard />
            </li>
        ))}
    </ul>
);

export default SkeletonGrid;
```

### `ErrorDisplay.jsx` y `NotFound.jsx`: Manejo de errores y resultados vacíos

Componentes para informar al usuario sobre problemas o falta de resultados.

**`ErrorDisplay.jsx`:**

```jsx
// src/components/layout/ErrorDisplay.jsx
import { Typography, Button } from "@material-tailwind/react";
import PropTypes from "prop-types";

const ErrorDisplay = ({ message, onRetry }) => (
    <div className="error-display">
        <Typography variant="h3" color="red" className="error-display__message">
            {message}
        </Typography>
        <Button color="blue" onClick={onRetry} className="error-display__button">
            Reintentar
        </Button>
    </div>
);

ErrorDisplay.propTypes = {
    message: PropTypes.string.isRequired,
    onRetry: PropTypes.func.isRequired,
};

export default ErrorDisplay;
```

**`NotFound.jsx`:**

```jsx
// src/components/layout/NotFound.jsx
import { Typography } from "@material-tailwind/react";
import PropTypes from 'prop-types';

const NotFound = ({ searchTerm }) => (
    <div className="not-found">
        <Typography variant="h3" className="not-found__text">
            No se encontraron usuarios con &quot;{searchTerm}&quot;.
        </Typography>
    </div>
);

NotFound.propTypes = {
    searchTerm: PropTypes.string.isRequired,
};

export default NotFound;
```

---

## 7. El Componente `App.jsx`: El Orquestador de la UI

Este es el componente principal que integra todos los hooks y componentes de UI para formar la aplicación completa. Después de la refactorización, es mucho más declarativo y se enfoca en la composición visual.

```jsx
// src/App.jsx
import { MoonIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { IconButton } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { useTheme } from "./hooks/useTheme.js";
import { useDebouncedSearch } from "./hooks/useDebouncedSearch.js";
import { useUserFetching } from "./hooks/useUserFetching.js";
import { fetchUsers } from "./features/users/usersSlice.js";

import PageHeader from "./components/layout/PageHeader";
import ErrorDisplay from "./components/layout/ErrorDisplay";
import SkeletonGrid from "./components/layout/SkeletonGrid";
import UserList from "./components/layout/UserList";
import NotFound from "./components/layout/NotFound";

const App = () => {
    const [theme, toggleTheme] = useTheme();
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm, debouncedSearchTerm] = useDebouncedSearch("", 300);
    const { users, status, error } = useUserFetching(debouncedSearchTerm);

    const handleRetry = () => {
        dispatch(fetchUsers(debouncedSearchTerm));
    };

    /**
     * Determina qué componente renderizar basado en el estado de la petición (loading, succeeded, failed).
     * Si la petición falla con un estado 403, renderiza el componente `NotFound`.
     * Para otros errores, renderiza `ErrorDisplay`.
     * @returns {JSX.Element | null} El componente a renderizar o `null` si no hay contenido.
     */
    const renderContent = () => {
        const isLoading = status === 'loading' || status === 'idle';

        if (isLoading) {
            return <SkeletonGrid />;
        }
        if (status === 'failed') {
            // Check if the error is a 403 Forbidden specifically from the API
            if (error && error.status === 403) {
                return <NotFound searchTerm={debouncedSearchTerm} />;
            }
            return <ErrorDisplay message={error.message} onRetry={handleRetry} />;
        }
        if (status === 'succeeded' && users && users.length > 0) {
            return <UserList users={users} />;
        }
        if (status === 'succeeded' && (!users || users.length === 0)) {
            return <NotFound searchTerm={debouncedSearchTerm} />;
        }

        return null;
    };

    return (
        <main className="app">
            <IconButton
                variant="text"
                className="page-header__theme-toggle"
                aria-label="Toggle theme"
                onClick={toggleTheme}
            >
                {theme === "dark" ? (
                    <SparklesIcon className="page-header__icon" />
                ) : (
                    <MoonIcon className="page-header__icon" />
                )}
            </IconButton>
            <PageHeader
                searchTerm={searchTerm}
                handleSearch={(e) => setSearchTerm(e.target.value)}
                isSearching={status === "loading"}
            />

            {renderContent()}
        </main>
    );
};

export default App;
```

---

## 8. Estilos con Tailwind CSS y Material Tailwind

La aplicación utiliza **Tailwind CSS** para un enfoque utility-first en el estilado, lo que permite construir interfaces complejas rápidamente sin salir del HTML.

**Material Tailwind** se integra perfectamente, proporcionando componentes de React pre-diseñados que ya usan clases de Tailwind, acelerando el desarrollo de la UI y asegurando una estética de Material Design.

Los estilos globales se encuentran en `src/index.css`.

---

## 9. Buenas Prácticas Aplicadas y Por Qué

*   **Separación de Responsabilidades (SRP)**: El principio más visible en la refactorización de `App.jsx`. El componente ahora solo se encarga de la composición de la UI, delegando la lógica de negocio y gestión de estado a los hooks personalizados. Esto hace el código más legible, testeable y mantenible.
*   **Reutilización de Lógica (Hooks Personalizados)**: La lógica para el `debounce`, la gestión del tema y la obtención de datos está encapsulada en hooks. Esto no solo simplifica los componentes, sino que permite que esta lógica se reutilice fácilmente en otras partes de la aplicación o en futuros proyectos.
*   **Gestión de Estado Centralizada (Redux Toolkit)**: Redux Toolkit proporciona un patrón predecible y escalable para gestionar el estado de la aplicación, especialmente para operaciones asíncronas (`createAsyncThunk`).
*   **Optimización de Rendimiento (`React.lazy`, `useIntersectionObserver`, Debounce)**:
    *   `React.lazy` y `Suspense` cargan componentes solo cuando son necesarios, reduciendo el tamaño inicial del bundle.
    *   `useIntersectionObserver` implementa el lazy loading de imágenes, mejorando la velocidad de carga visual.
    *   El "debounce" en la búsqueda reduce drásticamente el número de llamadas a la API, ahorrando recursos del servidor y del cliente.
*   **Feedback Visual al Usuario (Esqueletos, Manejo de Errores)**: Proporcionar `SkeletonGrid` durante la carga y `ErrorDisplay` para fallos mejora significativamente la experiencia del usuario, ya que siempre saben lo que está ocurriendo.
*   **Persistencia de Preferencias (`localStorage` en `useTheme`)**: Guardar la preferencia de tema del usuario mejora la usabilidad y personalización de la aplicación.
*   **Validación de Propiedades (`prop-types`)**: Aunque TypeScript sería la solución ideal, `prop-types` ofrece una capa de verificación de tipos en tiempo de ejecución para proyectos JavaScript, capturando errores tempranamente.

---

## 10. Errores Comunes y Cómo Evitarlos

*   **"Prop Drilling"**: Pasar props a través de muchos niveles de componentes. Se evita usando Redux Toolkit para el estado global y Context API para temas o configuraciones más locales.
*   **Componentes "God Object"**: Componentes que hacen demasiadas cosas (`App.jsx` antes de la refactorización). Se evita extrayendo la lógica a hooks y dividiendo la UI en componentes más pequeños con una única responsabilidad.
*   **Llamadas a API excesivas**: Se evita implementando "debounce" en las entradas de usuario y gestionando los estados de carga para no disparar peticiones redundantes.
*   **Falta de Feedback al Usuario**: Se mitiga con esqueletos de carga y mensajes de error claros.
*   **Renderizados innecesarios**: Se reduce con `React.memo`, `useMemo`, `useCallback` y optimizando los selectores de Redux.

---

## 11. Optimizaciones Recomendadas (Roadmap)

*   **Internacionalización (i18n)**: Adaptar la aplicación para soportar múltiples idiomas.
*   **Paginación/Infinite Scroll**: Implementar un sistema de paginación o scroll infinito para manejar grandes conjuntos de datos de la API de GitHub de manera más eficiente, especialmente si el número de resultados de búsqueda es muy alto.
*   **Gestión de APIs**: Crear una capa de abstracción de API más robusta (ej. un servicio `api.js` o `axios` instances) para centralizar la configuración de headers, manejo de errores comunes y caché.
*   **Tests**: Implementar pruebas unitarias para hooks y slices de Redux, y pruebas de integración para los componentes clave.
*   **Accesibilidad (a11y)**: Realizar una auditoría completa de accesibilidad para asegurar que la aplicación sea usable por personas con diversas capacidades.
*   **Notificaciones**: Integrar un sistema de notificaciones (ej. `react-toastify`) para mostrar mensajes al usuario de forma no intrusiva.

---

## 12. Conclusión

Este proyecto demuestra un enfoque holístico para el desarrollo de aplicaciones React. Al aplicar principios de Clean Architecture, optimizaciones de rendimiento y un diseño de UX cuidadoso, hemos construido una aplicación que no solo es funcional, sino también altamente mantenible, escalable y agradable de usar.

¡Espero que este tutorial te sirva como una base sólida para tus futuros proyectos de desarrollo frontend!
