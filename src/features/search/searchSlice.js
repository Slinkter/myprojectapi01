/**
 * @file Slice de Redux para gestionar el estado de la búsqueda.
 * @description
 * Este archivo define un "slice" de Redux utilizando `createSlice` de Redux Toolkit.
 * Un slice es una colección de la lógica del reducer y las acciones para una única
 * característica en la aplicación. En este caso, gestiona el estado del término de búsqueda.
 */

import { createSlice } from "@reduxjs/toolkit";

// Define el estado inicial para esta porción del store.
const initialState = {
    searchTerm: "", // El término de búsqueda, inicialmente una cadena vacía.
};

// Crea el slice de búsqueda.
export const searchSlice = createSlice({
    name: "search", // Nombre del slice, usado como prefijo para los tipos de acción.
    initialState, // El estado inicial del reducer.
    // `reducers` es un objeto que contiene las funciones que actualizan el estado.
    // Redux Toolkit usa la librería Immer internamente, lo que permite escribir
    // lógica de actualización "mutativa" que se convierte en actualizaciones inmutables.
    reducers: {
        /**
         * Reducer para establecer/actualizar el término de búsqueda.
         * @param {object} state - El estado actual del slice.
         * @param {object} action - La acción despachada. `action.payload` contiene el nuevo término.
         * Actualiza el `searchTerm` en el estado con el valor proporcionado en el payload de la acción.
         */
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        /**
         * Reducer para limpiar el término de búsqueda y restablecerlo a su valor inicial.
         * @param {object} state - El estado actual del slice.
         */
        clearSearchTerm: (state) => {
            state.searchTerm = initialState.searchTerm;
        },
    },
});

// Las acciones generadas automáticamente por `createSlice`.
export const { setSearchTerm, clearSearchTerm } = searchSlice.actions;

//  Este reducer se combinará en el store principal.
export default searchSlice.reducer;
