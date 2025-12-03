/**
 * @file Configuración del store global de Redux para la aplicación.
 * @description
 * El contenedor centralizado para todo el estado de la aplicación.
 * El uso de un store  único facilita la gestión y depuración del estado.
 *
 * Se utiliza `configureStore` de Redux Toolkit, una función que simplifica la
 * configuración del store al incluir buenas prácticas por defecto:
 * - Combina automáticamente los `reducers` de los diferentes "slices" del estado.
 * - Agrega el middleware `redux-thunk` para manejar la lógica asíncrona (como llamadas a APIs).
 * - Habilita la extensión Redux DevTools para inspeccionar el estado y las acciones en el navegador.
 * - `users`: Gestiona el estado de los usuarios (ej. la lista de usuarios, estado de carga, errores).
 */

import { configureStore } from "@reduxjs/toolkit";

// Importa solo el `reducer` del slice de estado de usuarios.
import usersReducer from "../features/users/usersSlice";

export const store = configureStore({
    reducer: {
        users: usersReducer,
    },
});
