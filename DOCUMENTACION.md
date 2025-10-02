# Documentación del Proyecto: API de Usuarios de GitHub

## 1. Descripción General

Esta es una aplicación web de página única (SPA) desarrollada con React que consume la API pública de GitHub para obtener y mostrar una lista de usuarios. La aplicación permite filtrar los usuarios en tiempo real y presenta una interfaz de usuario moderna, reactiva y con un tema claro/oscuro.

El proyecto está diseñado siguiendo las mejores prácticas de la industria, con un enfoque en un código limpio, escalable y mantenible.

---

## 2. Características Principales

-   **Visualización de Usuarios:** Carga y muestra una lista de usuarios desde la API de GitHub.
-   **Búsqueda en Tiempo Real:** Filtra la lista de usuarios de forma instantánea a medida que el usuario escribe en la barra de búsqueda.
-   **Tema Claro/Oscuro:** Permite al usuario cambiar entre un tema claro y uno oscuro. La aplicación detecta la preferencia del sistema operativo del usuario en la primera visita y guarda la selección en `localStorage`.
-   **Carga Asíncrona Optimizada:** Muestra una animación de "esqueleto" (skeleton) mientras se cargan los datos, asegurando una buena experiencia de usuario incluso en conexiones lentas.
-   **Animaciones Fluidas:** Utiliza animaciones sutiles para la aparición de elementos, como un efecto de cascada al mostrar la lista de usuarios.
-   **Manejo de Errores:** Presenta un mensaje de error claro y un botón para reintentar la carga en caso de que falle la comunicación con la API.
-   **Diseño Responsivo:** La interfaz se adapta correctamente a diferentes tamaños de pantalla.

---

## 3. Arquitectura y Estructura del Proyecto

La arquitectura de este proyecto es uno de sus puntos más fuertes y se basa en los siguientes patrones y principios:

### a. Arquitectura Basada en Componentes

Siguiendo la filosofía de React, la aplicación se construye como un árbol de componentes reutilizables y bien definidos.

### b. Patrón Contenedor/Presentacional

Se ha separado la lógica del aspecto visual:

-   **Componentes Contenedores (Inteligentes):** El componente `App.jsx` actúa como el contenedor principal. Se encarga de orquestar el estado global y la lógica de la aplicación, pero delega el renderizado a otros componentes.
-   **Componentes Presentacionales (Visuales):** La mayoría de los componentes (dentro de `src/components/layout`, `UserCard.jsx`, etc.) son puramente visuales. Reciben datos a través de props y los muestran, sin contener lógica de negocio.

### c. Gestión de Estado Centralizada con Redux Toolkit

Para manejar el estado de la aplicación de una manera predecible y escalable, se utiliza **Redux Toolkit**:

-   **Store Único:** `src/app/store.js` configura un único "store" que sirve como la fuente de verdad para toda la aplicación.
-   **Slices:** El estado se divide en "slices" por funcionalidad:
    -   `usersSlice.js`: Gestiona todo lo relacionado con la API (la lista de usuarios, el estado de carga y los errores). Utiliza `createAsyncThunk` para manejar la llamada asíncrona de forma limpia.
    -   `searchSlice.js`: Gestiona el estado de la UI, como el término de búsqueda del input.

### d. Hooks Personalizados

Se han creado hooks personalizados para encapsular y reutilizar lógica compleja:

-   `useTheme.js`: Abstrae toda la lógica para el manejo del tema (claro/oscuro).
-   `useIntersectionObserver.js`: Permite aplicar animaciones cuando un elemento entra en el campo de visión del usuario.

---

## 4. Tecnologías Utilizadas

-   **React 18:** Para la construcción de la interfaz de usuario.
-   **Vite:** Como herramienta de empaquetado y servidor de desarrollo, ofreciendo una experiencia de desarrollo extremadamente rápida.
-   **Redux Toolkit:** Para la gestión del estado global de la aplicación.
-   **Tailwind CSS:** Para un desarrollo de estilos rápido y personalizable mediante clases de utilidad.
-   **Material Tailwind:** Como librería de componentes base para la UI.
-   **ESLint y Prettier:** Para mantener un código limpio, consistente y libre de errores, incluyendo el plugin `jsx-a11y` para reforzar las buenas prácticas de accesibilidad.

---

## 5. Cómo Ejecutar el Proyecto

1.  **Instalar dependencias:**
    ```bash
    pnpm install
    ```

2.  **Ejecutar el servidor de desarrollo:**
    ```bash
    pnpm dev
    ```

3.  Abrir el navegador en la dirección indicada (generalmente `http://localhost:5173`).
