# Proyecto: Visor de Usuarios de GitHub con React

## 1. Demo en Vivo

Puedes ver la aplicación funcionando en el siguiente enlace:

**Visor de Usuarios de GitHub en GitHub Pages**

---

## 2. Descripción General

Este proyecto es una aplicación web moderna construida con React que consume la API pública de GitHub para mostrar una lista de usuarios. Su propósito es servir como demostración de buenas prácticas en el desarrollo front-end, incluyendo:

-   Abstracción de lógica en hooks personalizados.
-   Manejo avanzado de estado con características concurrentes de React.
-   Optimización de rendimiento (lazy loading, memoización, animaciones eficientes).
-   Diseño responsivo y una experiencia de usuario fluida.

## 3. Características Principales

-   **Búsqueda y Filtrado en Tiempo Real**: Filtra la lista de usuarios de forma instantánea mientras el usuario escribe.
-   **Tema Claro/Oscuro**: Permite al usuario cambiar entre un tema claro y uno oscuro, persistiendo la preferencia.
-   **Carga Perezosa (Lazy Loading)**: Tanto los componentes de React como las imágenes se cargan de forma perezosa para optimizar el tiempo de carga inicial.
-   **UI Concurrente**: La búsqueda no bloquea la interfaz gracias a `useTransition`, manteniendo la aplicación siempre responsiva.
-   **Animaciones al Hacer Scroll**: Las tarjetas de usuario aparecen con una animación suave a medida que entran en el área visible de la pantalla.
-   **Manejo de Estados**: Muestra esqueletos de carga (skeletons) mientras se obtienen los datos y un mensaje claro en caso de error en la API.

## 4. Tecnologías y Librerías

-   **React (v18+)**: Utilizando características modernas como hooks, Suspense y transiciones.
-   **Vite**: Herramienta de construcción y servidor de desarrollo ultrarrápido.
-   **Tailwind CSS**: Framework CSS "utility-first" para un estilizado rápido y consistente.
-   **@material-tailwind/react**: Biblioteca de componentes de UI para elementos como tarjetas, botones e inputs.

## 5. Estructura del Proyecto y Lógica Clave

La arquitectura se centra en la reutilización de lógica a través de hooks personalizados y la clara separación de responsabilidades.

### Hooks Personalizados (`src/hooks/`)

La lógica compleja se ha extraído en tres hooks reutilizables:

-   **`useFetch.js`**: Abstrae por completo la lógica de peticiones a la API. Devuelve el estado de carga (`isLoading`), los datos (`data`), el error (`error`) y una función para reintentar (`refetch`). Utiliza `useCallback` para optimizar la función de fetching.
-   **`useTheme.js`**: Gestiona el estado del tema (claro/oscuro). Lee y escribe en `localStorage` para persistir la preferencia del usuario y aplica la clase `dark` al elemento `<html>` para que Tailwind CSS funcione.
-   **`useIntersectionObserver.js`**: Un hook muy potente que utiliza la API `IntersectionObserver` del navegador para detectar eficientemente si un componente es visible en la pantalla. Es la base para las animaciones de aparición al hacer scroll.

### Componentes Principales (`src/components/`)

-   **`App.jsx`**: Es el componente orquestador.

    -   Utiliza `useFetch` para obtener los datos de los usuarios.
    -   Implementa `useTransition` para que la actualización del filtro de búsqueda no bloquee la interfaz, proporcionando una experiencia de usuario fluida.
    -   Gestiona el renderizado condicional: muestra los `SkeletonCard` si `isLoading` es `true`, un mensaje de error si `error` existe, o la lista de usuarios.
    -   Usa `React.lazy` y `Suspense` para la carga perezosa del componente `UserCard`.

-   **`UserCard.jsx`**: Componente de presentación para una única tarjeta de usuario.

    -   Utiliza `useIntersectionObserver` para aplicar clases de animación (`opacity` y `scale`) solo cuando la tarjeta es visible.
    -   Añade `loading="lazy"` al `<img>` para que el navegador posponga la carga de imágenes que no están en pantalla.
    -   Está envuelto en `React.memo` para evitar re-renderizados innecesarios si sus `props` no cambian.

-   **`SkeletonCard.jsx`**: Un componente simple que muestra una versión "esquelética" de la tarjeta con una animación de pulso (`animate-pulse` de Tailwind), sirviendo como un placeholder de carga.

## 6. Optimizaciones de Rendimiento y UX

Este proyecto implementa varias técnicas clave para garantizar una experiencia rápida y agradable:

1.  **Code Splitting con `React.lazy` y `Suspense`**: El código del componente `UserCard` no se incluye en el paquete inicial. Se descarga automáticamente solo cuando es necesario renderizarlo, reduciendo el tamaño del JavaScript inicial.

2.  **Pre-carga de Componentes**: En `App.jsx`, se utiliza `useEffect(() => { import('./components/UserCard') }, [])` para indicarle al navegador que comience a descargar el código de `UserCard` en segundo plano, en paralelo a la petición de la API. Así, cuando los datos lleguen, el componente ya estará disponible.

3.  **Transiciones con `useTransition`**: Al envolver la actualización del estado de búsqueda en `startTransition`, le decimos a React que esta actualización no es urgente. Esto permite que la UI (especialmente el input de texto) permanezca interactiva incluso si el filtrado de una lista grande es costoso.

4.  **Memoización con `useMemo` y `React.memo`**:

    -   `useMemo` se usa para calcular `filteredUsers`, asegurando que el filtrado solo se ejecute si la lista de usuarios o el término de búsqueda cambian.
    -   `React.memo` en `UserCard` previene que las tarjetas individuales se vuelvan a renderizar si no hay cambios en sus datos.

5.  **Observación de Intersección para Animaciones**: En lugar de usar eventos de scroll costosos, `IntersectionObserver` es una solución nativa y de alto rendimiento para detectar la visibilidad de elementos, ideal para animaciones y carga perezosa.

## 7. Cómo Ejecutar el Proyecto Localmente

1.  Clona el repositorio:

    ```bash
    git clone https://github.com/Slinkter/myprojectapi01.git
    cd myprojectapi01
    ```

2.  Instala las dependencias (se recomienda `pnpm`):

    ```bash
    pnpm install
    ```

3.  Inicia el servidor de desarrollo:

    ```bash
    pnpm dev
    ```

4.  Abre http://localhost:5173 en tu navegador.

### Scripts Disponibles

-   `pnpm dev`: Inicia el servidor de desarrollo.
-   `pnpm build`: Compila la aplicación para producción.
-   `pnpm preview`: Previsualiza la build de producción.
-   `pnpm deploy`: Despliega la aplicación en GitHub Pages.

---

!Captura de la aplicación
