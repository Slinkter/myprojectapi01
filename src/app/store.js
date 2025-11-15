/**
 * @file Configuración del store global de Redux para la aplicación.
 * @description
 * Este archivo se encarga de crear y configurar el store de Redux, que actúa como
 * el contenedor centralizado para todo el estado de la aplicación. El uso de un store
 * único (Single Source of Truth) facilita la gestión y depuración del estado.
 *
 * Se utiliza `configureStore` de Redux Toolkit, una función que simplifica la
 * configuración del store al incluir buenas prácticas por defecto:
 * - Combina automáticamente los `reducers` de los diferentes "slices" del estado.
 * - Agrega el middleware `redux-thunk` para manejar la lógica asíncrona (como llamadas a APIs).
 * - Habilita la extensión Redux DevTools para inspeccionar el estado y las acciones en el navegador.
 */

// Importa la función `configureStore` de Redux Toolkit.
import { configureStore } from "@reduxjs/toolkit";

// Importa los `reducers` de los diferentes "slices" de estado de la aplicación.
// Un "slice" representa una porción del estado global y la lógica para actualizarlo.
import searchReducer from "../features/search/searchSlice";
import usersReducer from "../features/users/usersSlice";

// Crea y exporta el store de Redux.
/**
 * El campo `reducer` es un objeto que combina todos los reducers de la aplicación.
 * Cada clave en este objeto corresponde a un "slice" del estado global, y su valor
 * es el reducer responsable de gestionar las actualizaciones de esa porción del estado.
 *
 * - `search`: Gestiona el estado relacionado con la funcionalidad de búsqueda (ej. término de búsqueda).
 * - `users`: Gestiona el estado de los usuarios (ej. la lista de usuarios, estado de carga, errores).
 */
export const store = configureStore({
    reducer: {
        search: searchReducer,
        users: usersReducer,
    },
});
