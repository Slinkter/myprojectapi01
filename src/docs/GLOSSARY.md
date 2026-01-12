# Glosario Técnico

Diccionario de términos técnicos utilizados en el proyecto **API - GitHub Users**.

## Conceptos de React y Frontend

### SPA (Single Page Application)
Aplicación web que carga una sola página HTML y actualiza el contenido dinámicamente a medida que el usuario interactúa con ella, sin recargar la página completa.

### Hook
Función especial de React que permite "engancharse" a las características de React (como el estado y el ciclo de vida) desde componentes funcionales.
- **`useState`**: Hook para añadir estado local a un componente.
- **`useEffect`**: Hook para manejar efectos secundarios (llamadas a API, suscripciones).
- **`useSelector`**: Hook de Redux para extraer datos del store.
- **`useDispatch`**: Hook de Redux para enviar acciones.

### Custom Hook
Función de JavaScript que utiliza otros hooks de React para encapsular y reutilizar lógica de estado. En este proyecto: `useDebouncedSearch`, `useTheme`.

### Componente Presentacional (Dumb Component)
Componente que se centra únicamente en la interfaz de usuario (cómo se ven las cosas). Recibe datos y callbacks vía `props` y no tiene dependencia directa con el Store global. Ejemplo: `UserCard`.

### Debounce
Técnica de programación que limita la tasa a la que se ejecuta una función. Se usa aquí para retrasar la búsqueda en la API hasta que el usuario deja de escribir, evitando peticiones innecesarias.

### Lazy Loading (Carga Perezosa)
Patrón de diseño que pospone la carga de un objeto hasta el momento en que es necesario. Aquí se usa para cargar imágenes y animaciones de tarjetas solo cuando entran en la pantalla.

## Arquitectura y Estado

### Redux Toolkit (RTK)
Versión oficial y opinada de Redux para simplificar su configuración y uso. Incluye utilidades como `createSlice` y `createAsyncThunk`.

### Slice
Colección de lógica de reductor y acciones de Redux para una característica única de la aplicación (ej. `usersSlice`).

### Thunk
Función que permite realizar lógica asíncrona (como llamadas a API) dentro del flujo de Redux.

## Estilos y UI

### Tailwind CSS
Framework de CSS "utility-first" que proporciona clases de bajo nivel (como `flex`, `pt-4`, `text-center`) para construir diseños personalizados directamente en el markup.

### BEM (Block, Element, Modifier) (Legacy)
Metodología de nomenclatura de CSS utilizada en las partes legacy del proyecto (ej: `user-card__header`). Se recomienda su deprecación en favor de Tailwind.

### Material Tailwind
Librería de componentes de UI basada en Tailwind CSS que proporciona elementos pre-diseñados como Cards y Botones siguiendo las guías de Material Design.
