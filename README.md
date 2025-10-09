# Proyecto: Visor de Usuarios de GitHub con React

## 1. Demo en Vivo

Puedes ver la aplicación funcionando en el siguiente enlace:

[https://slinkter.github.io/myprojectapi01/](https://slinkter.github.io/myprojectapi01/)

![Captura de la aplicación](api01.png "Visor de Usuarios de GitHub")

---

## 2. Descripción General

Esta es una aplicación web de página única (SPA) desarrollada con React que consume la API pública de GitHub para obtener y mostrar una lista de usuarios. La aplicación permite filtrar los usuarios en tiempo real y presenta una interfaz de usuario moderna, reactiva y con un tema claro/oscuro.

El proyecto está diseñado siguiendo las mejores prácticas de la industria, con un enfoque en un código limpio, escalable y mantenible a través de una arquitectura robusta.

---

## 3. Características Principales

-   **Visualización de Usuarios:** Carga y muestra una lista de usuarios desde la API de GitHub.
-   **Búsqueda en Tiempo Real:** Filtra la lista de usuarios de forma instantánea a medida que el usuario escribe.
-   **Tema Claro/Oscuro:** Permite al usuario cambiar entre un tema claro y uno oscuro. La aplicación detecta la preferencia del sistema operativo en la primera visita y guarda la selección en `localStorage`.
-   **Carga Asíncrona Optimizada:** Muestra una animación de "esqueleto" (skeleton) mientras se cargan los datos.
-   **Animaciones Fluidas:** Utiliza animaciones sutiles para la aparición de elementos, como un efecto de cascada al mostrar la lista y efectos de entrada al hacer scroll.
-   **Manejo de Errores:** Presenta un mensaje de error claro y un botón para reintentar la carga en caso de fallo.
-   **Diseño Responsivo:** La interfaz se adapta correctamente a diferentes tamaños de pantalla.

---

## 4. Arquitectura y Estructura del Proyecto

La arquitectura de este proyecto es uno de sus puntos más fuertes y se basa en los siguientes patrones y principios, elegidos cuidadosamente para garantizar un código limpio, escalable y fácil de mantener.

### a. Arquitectura Basada en Componentes

La aplicación sigue una **arquitectura basada en componentes**, que es el pilar fundamental de React.

-   **Alternativas Consideradas:** En el desarrollo web existen otros enfoques arquitectónicos como **MVC (Modelo-Vista-Controlador)**, popular en frameworks de backend como Ruby on Rails, o **MVVM (Modelo-Vista-VistaModelo)**, común en Angular y otros. También existen arquitecturas más monolíticas donde la separación de responsabilidades es menos estricta.
-   **Justificación de la Elección:** Se optó por una arquitectura de componentes porque se alinea perfectamente con la filosofía de React. Permite construir interfaces complejas a partir de piezas pequeñas, aisladas y reutilizables (`UserCard`, `SkeletonCard`, etc.). Esto no solo facilita el desarrollo y las pruebas, sino que también mejora la mantenibilidad a largo plazo, ya que cada componente tiene un propósito único y bien definido.

### b. Patrón Contenedor/Presentacional

Para organizar los componentes, se ha implementado una variación del patrón **Contenedor/Presentacional** (también conocido como "Smart/Dumb Components").

-   **Alternativas Consideradas:** Con la llegada de los Hooks de React, este patrón se ha vuelto más flexible. Una alternativa común hoy en día es crear componentes que mezclan lógica y presentación, utilizando hooks como `useState`, `useEffect` y `useContext` directamente donde se necesitan. Sin embargo, sin una disciplina clara, esto puede llevar a componentes sobrecargados y difíciles de reutilizar.
-   **Justificación de la Elección:** A pesar de la flexibilidad de los hooks, se decidió mantener una separación conceptual clara:
    -   **Componentes Contenedores (Inteligentes):** `App.jsx` actúa como el orquestador. Conoce el estado de la aplicación (a través de Redux), despacha acciones y maneja la lógica de negocio.
    -   **Componentes Presentacionales (Visuales):** La mayoría de los componentes (`UserList`, `UserCard`) son "tontos". Simplemente reciben datos a través de props y los renderizan. No saben de dónde vienen los datos ni cómo se modifican.
        Esta separación hace que los componentes visuales sean extremadamente reutilizables y fáciles de probar de forma aislada, ya que su renderizado es predecible para un conjunto de props determinado.

### c. Gestión de Estado Centralizada con Redux Toolkit

Para el manejo del estado global, se eligió **Redux Toolkit**.

-   **Alternativas Consideradas:** El ecosistema de React ofrece múltiples soluciones para la gestión de estado:
    1.  **React Context API + `useReducer`:** Es la solución nativa de React. Ideal para estados simples o para pasar datos a través de componentes sin "prop drilling", pero puede volverse complejo de escalar y optimizar en aplicaciones grandes.
    2.  **Zustand:** Una solución más simple y menos "boilerplate" que Redux. Utiliza un enfoque basado en hooks y es muy fácil de aprender.
    3.  **MobX:** Utiliza un enfoque de programación reactiva funcional (FRP) que actualiza el estado de forma más automática, pero con una curva de aprendizaje diferente.
    4.  **Recoil:** Una solución experimental de Facebook que introduce el concepto de "átomos" de estado.
-   **Justificación de la Elección:** Se seleccionó **Redux Toolkit** por las siguientes razones:
    -   **Escalabilidad y Predictibilidad:** Es la solución más robusta para aplicaciones que se espera que crezcan. El flujo de datos unidireccional y las transiciones de estado explícitas hacen que la aplicación sea más fácil de depurar.
    -   **Herramientas de Desarrollo:** Las **Redux DevTools** son invaluables para inspeccionar el estado, viajar en el tiempo entre acciones y entender cómo cambia el estado de la aplicación.
    -   **Opiniones y Estándares:** Redux Toolkit es la forma recomendada y moderna de usar Redux. Elimina gran parte del código repetitivo ("boilerplate") del Redux tradicional y establece patrones claros (como los "slices") que guían hacia una estructura de código organizada y mantenible.
    -   **Manejo de Lógica Asíncrona:** Su integración con `createAsyncThunk` proporciona una forma estandarizada y robusta de manejar efectos secundarios, como las llamadas a APIs.

### d. Hooks Personalizados

Se han creado hooks personalizados en `src/hooks` para encapsular y reutilizar lógica:

-   `useTheme.js`: Abstrae la lógica para el manejo del tema.
-   `useIntersectionObserver.js`: Permite aplicar animaciones cuando un elemento entra en el campo de visión.

---

## 5. Tecnologías Utilizadas

-   **React 18:** Para la construcción de la interfaz de usuario.
-   **Vite:** Como herramienta de empaquetado y servidor de desarrollo.
-   **Redux Toolkit:** Para la gestión del estado global de la aplicación.
-   **Tailwind CSS:** Para un desarrollo de estilos rápido y personalizable.
-   **Material Tailwind:** Como librería de componentes base para la UI.
-   **ESLint:** Para mantener un código limpio y consistente, incluyendo el plugin `jsx-a11y` para reforzar la accesibilidad.

---

## 6. Optimizaciones de Rendimiento y UX

1.  **Code Splitting con `React.lazy` y `Suspense`**: El código del componente `UserCard` no se incluye en el paquete inicial. Se descarga automáticamente solo cuando es necesario, reduciendo el tamaño del JavaScript inicial.
2.  **Memoización con `useMemo` y `React.memo`**:
    -   `useMemo` se usa para calcular `filteredUsers`, asegurando que el filtrado solo se re-ejecute si los datos relevantes cambian.
    -   `React.memo` en `UserCard` previene que las tarjetas se vuelvan a renderizar innecesariamente.
3.  **Observación de Intersección para Animaciones**: En lugar de usar eventos de scroll costosos, `IntersectionObserver` es una solución nativa y de alto rendimiento para activar animaciones.
4.  **Gestión de Estado Eficiente**: Redux Toolkit gestiona las actualizaciones de estado de forma optimizada, previniendo re-renderizados innecesarios en componentes no afectados.

---

## 7. Estructura de Archivos y Roles

A continuación se detalla la estructura del proyecto y el propósito de cada archivo o directorio clave:

```
/src
├── app/
│   └── store.js         # Configura el store global de Redux.
├── assets/              # Contiene assets estáticos como SVGs e iconos.
├── components/
│   ├── layout/          # Componentes estructurales (Header, Grids, etc.).
│   ├── SkeletonCard.jsx # Componente de carga (esqueleto).
│   └── UserCard.jsx     # Tarjeta para mostrar un usuario.
├── features/
│   ├── search/
│   │   └── searchSlice.js # Slice de Redux para la lógica de búsqueda.
│   └── users/
│       └── usersSlice.js  # Slice de Redux para la lógica de usuarios (API).
├── hooks/
│   ├── useIntersectionObserver.js # Hook para animaciones en scroll.
│   └── useTheme.js      # Hook para la lógica del tema claro/oscuro.
├── App.jsx              # Componente principal que orquesta la aplicación.
├── main.jsx             # Punto de entrada de la aplicación.
└── index.css            # Estilos globales y de Tailwind.
```

-   **`main.jsx`**: Es el punto de entrada. Renderiza el componente `App` y lo envuelve en el `Provider` de Redux para que toda la aplicación tenga acceso al `store`.
-   **`App.jsx`**: Actúa como el componente "inteligente" o contenedor principal. Gestiona el estado de alto nivel, despacha las acciones para cargar datos y pasa el estado y las funciones a los componentes presentacionales.
-   **`app/store.js`**: Centraliza la configuración del `store` de Redux, combinando los diferentes `reducers` (de usuarios y de búsqueda).
-   **`features/`**: Este directorio sigue la convención de Redux Toolkit de organizar la lógica por "características" o "funcionalidades".
    -   `usersSlice.js`: Define el estado relacionado con los usuarios (`users`, `isLoading`, `error`) y la lógica asíncrona (`fetchUsers`) para comunicarse con la API de GitHub.
    -   `searchSlice.js`: Gestiona el estado simple del campo de búsqueda.
-   **`components/`**: Contiene todos los componentes de React.
    -   `layout/`: Almacena componentes que definen la estructura de la página, como `PageHeader` y `UserList`.
    -   `UserCard.jsx`: Es un componente presentacional "tonto" que solo se encarga de mostrar los datos de un usuario. Utiliza `React.memo` para optimizar el rendimiento.
-   **`hooks/`**: Contiene lógica reutilizable extraída en hooks personalizados.
    -   `useTheme.js`: Encapsula toda la lógica para cambiar el tema y persistirlo, manteniendo los componentes limpios.
    -   `useIntersectionObserver.js`: Proporciona una forma declarativa y eficiente de detectar cuándo un componente es visible en pantalla.

---

## 8. Cómo Ejecutar el Proyecto Localmente

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
