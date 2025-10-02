# Documentación del Proyecto: API Github Users

## 1. Descripción General

**¿Cuál es el propósito de este proyecto?**
Es una aplicación web simple construida con React que consume la API pública de GitHub para obtener y mostrar una lista de usuarios. El objetivo es demostrar cómo interactuar con una API externa, gestionar estados de carga y error, y renderizar datos dinámicamente en una interfaz de usuario moderna y responsiva.

**¿Cómo funciona?**
Al cargar la aplicación, se realiza una petición a la URL `https://api.github.com/users`. Mientras se esperan los datos, se muestra un indicador de carga. Si la petición es exitosa, los datos de los usuarios se muestran en una cuadrícula de tarjetas. Si ocurre un error, se muestra un mensaje descriptivo.

## 2. Tecnologías y Librerías Utilizadas

A continuación se listan las dependencias principales del proyecto, extraídas del archivo `package.json`.

### Dependencias de Producción (`dependencies`):

-   **`react`**: Biblioteca principal para construir la interfaz de usuario declarativa y basada en componentes.
-   **`react-dom`**: Proporciona los métodos específicos del DOM para renderizar los componentes de React.
-   **`@material-tailwind/react`**: Librería de componentes de UI que sigue los principios de Material Design, utilizada para elementos como `Typography`, `Spinner` y las tarjetas de usuario.

### Dependencias de Desarrollo (`devDependencies`):

-   **`vite`**: Herramienta de frontend que proporciona un servidor de desarrollo rápido y empaqueta el código para producción.
-   **`tailwindcss`, `postcss`, `autoprefixer`**: Utilidades para implementar Tailwind CSS, un framework CSS que permite estilizar la aplicación directamente en el HTML mediante clases.
-   **`eslint` y plugins asociados**: Herramientas para el análisis estático del código, asegurando calidad y consistencia en el estilo de codificación.
-   **`gh-pages`**: Paquete para facilitar el despliegue de la aplicación en GitHub Pages.

## 3. Scripts Disponibles

Primero, instala las dependencias con `pnpm install`.

Luego, en el archivo `package.json`, puedes ejecutar los siguientes scripts con `pnpm`:

-   `pnpm dev`: Inicia el servidor de desarrollo con Vite.
-   `pnpm build`: Compila y empaqueta la aplicación para producción en la carpeta `dist/`.
-   `pnpm lint`: Ejecuta ESLint para analizar el código en busca de errores.
-   `pnpm preview`: Inicia un servidor local para previsualizar la build de producción.
-   `pnpm predeploy`: Script que se ejecuta automáticamente antes de `deploy`, encargado de construir el proyecto.
-   `pnpm deploy`: Despliega el contenido de la carpeta `dist/` a la rama `gh-pages` del repositorio.

## 4. Lógica Principal y Componentes Clave

El núcleo de la aplicación reside en el componente `App.jsx`.

### Componente `App.jsx`

Este es el componente principal que orquesta la lógica de la aplicación.

-   **Estado (`useState`)**:

    -   `isLoading`: Un booleano que controla la visibilidad del componente `Spinner` mientras se obtienen los datos.
    -   `isError`: Almacena el objeto de error si la petición a la API falla, para mostrar un mensaje al usuario.
    -   `user`: Un array que almacena la lista de usuarios obtenida de la API.

-   **Efectos (`useEffect`)**:

    -   Se utiliza un `useEffect` para invocar la función `getUsers` una sola vez, justo después de que el componente se monte por primera vez en el DOM. Esto se logra pasando un array de dependencias `[getUsers]`.

-   **Funciones y Optimizaciones (Hooks de Rendimiento)**:
    -   **`getUsers` (`useCallback`)**: La función que realiza la petición `fetch` está envuelta en `useCallback`. Esto memoriza la función para que no se vuelva a crear en cada renderizado del componente. Es una buena práctica, especialmente cuando la función se pasa como dependencia a `useEffect`.
    -   **`userCards` (`useMemo`)**: La lista de componentes `<UserCard />` se genera y memoriza con `useMemo`. Esto asegura que el mapeo del array `user` para crear los componentes solo se ejecute de nuevo si el estado `user` cambia, previniendo re-renderizados innecesarios de la lista completa.

### Componente `UserCard.jsx`

Es un componente de presentación que recibe las propiedades (`props`) de un único usuario y las renderiza en una tarjeta visual. Es reutilizable y se encarga únicamente de la apariencia de cada usuario en la lista.

## 5. Algoritmos y Soluciones Específicas

-   **Manejo de Asincronía con `async/await`**: La función `getUsers` utiliza `async/await` para gestionar la petición a la API de forma clara y legible. El bloque `try...catch...finally` proporciona un manejo de errores robusto:

    -   **`try`**: Intenta realizar la petición `fetch`. Si la respuesta no es `ok` (ej. status 404 o 500), lanza un error manualmente para ser capturado por el bloque `catch`.
    -   **`catch`**: Captura cualquier error de red o el error lanzado manualmente y lo almacena en el estado `isError`.
    -   **`finally`**: Se ejecuta siempre al final, ya sea que la petición haya tenido éxito o no. Su propósito aquí es desactivar el estado de carga (`setIsLoading(false)`), asegurando que el `Spinner` desaparezca.

-   **Renderizado Condicional**: La aplicación muestra diferentes interfaces según el estado actual:
    1. Si `isLoading` es `true`, muestra el componente `Spinner`.
    2. Si `isError` tiene un valor, muestra el mensaje de error.
    3. Si ninguna de las condiciones anteriores se cumple, renderiza la lista de usuarios.

## 6. Despliegue en GitHub Pages

Estos son los pasos que se siguieron para desplegar el proyecto en GitHub Pages:

1.  **Instalar `gh-pages`**: Se añadió el paquete como una dependencia de desarrollo.

    ```bash
    pnpm add -D gh-pages
    ```

2.  **Configurar `vite.config.js`**: Se especificó la URL base del repositorio en la configuración de Vite para que las rutas de los archivos funcionen correctamente en GitHub Pages.

    ```javascript
    // vite.config.js
    export default defineConfig({
        // ...
        base: "https://Slinkter.github.io/myprojectapi01",
    });
    ```

3.  **Añadir scripts a `package.json`**: Se agregaron los scripts `predeploy` y `deploy` para automatizar el proceso de construcción y despliegue.

    ```json
    "scripts": {
      // ...
      "predeploy": "pnpm build",
      "deploy": "gh-pages -d dist"
    },
    ```

4.  **Ejecutar el despliegue**: Finalmente, se ejecutó el comando para publicar la aplicación.

    ```bash
    pnpm deploy
    ```

---

!Captura de la aplicación
