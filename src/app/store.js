/**
 * Se crear y configurar el store global de la aplicación.
 * El store es la única fuente de verdad que contiene todo el estado de la aplicación.
 * Se combinan los diferentes `reducers` de la aplicación en un único `reducer` raíz.
 */

import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../features/search/searchSlice";
import usersReducer from "../features/users/usersSlice";

// `configureStore` simplifica la creación del store, aplicando automáticamente
// middlewares como `redux-thunk` (para acciones asíncronas) y habilitando
// las Redux DevTools para una depuración más sencilla.
// El campo `reducer` es un objeto donde cada clave corresponde a una parte del estado global,
// y su valor es el reducer que gestiona esa parte del estado.
// search : El estado relacionado con la búsqueda será gestionado por `searchReducer`.
// users :El estado relacionado con los usuarios (datos, carga, errores) será gestionado por `usersReducer`.
export const store = configureStore({
    reducer: {
        search: searchReducer,
        users: usersReducer,
    },
});
