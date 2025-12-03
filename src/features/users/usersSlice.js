/**
 * @file Slice  para los usuarios.
 * @description
 * Este archivo gestiona todo lo relacionado con los usuarios:
 * - La lista de usuarios obtenida de la API.
 * - El estado de la carga (si está cargando, si tuvo éxito o si falló).
 * - El mensaje de error en caso de que algo salga mal.
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL = "https://api.github.com";
const SLICE_NAME = "users/fetchUsers";

/** ====================================
 * @function fetchUsers
 * @description Thunk asíncrono para obtener los usuarios de la API de GitHub.
 * Acepta un término de búsqueda opcional para filtrar los resultados.
 * En caso de error, `rejectWithValue` devuelve un objeto con `{ message: string, status?: number }`.
 */

export const fetchUsers = createAsyncThunk(
    SLICE_NAME,
    async (searchTerm = "", { rejectWithValue }) => {
        console.log("se llama a la funcion fetchUsers");
        try {
            // Construye la URL correcta dependiendo de si se proporciona un término de búsqueda.
            const url = searchTerm
                ? `${API_BASE_URL}/search/users?q=${searchTerm}`
                : `${API_BASE_URL}/users`;

            console.log(url);

            console.time("API Call");
            const response = await fetch(url);
            console.timeEnd("API Call");

            if (!response.ok) {
                const errorMessage = `HTTP error! status: ${response.status} - ${response.statusText}`;
                const objError = {
                    message: errorMessage,
                    status: response.status,
                };
                return rejectWithValue(objError);
            }

            const data = await response.json();

            console.log(data);

            return searchTerm ? data.items : data;
        } catch (error) {
            return rejectWithValue({
                message: error.message,
                status: undefined,
            });
        }
    }
);

// Define el estado inicial para este slice
const initialState = {
    isLoading: "idle", // El estado puede ser: 'idle', 'loading', 'succeeded', 'failed'
    error: null, // Almacena el objeto de error si la carga falla: `{ message: string, status?: number }`.
    users: [], // Array para almacenar los datos de los usuarios.
};

const usersSlice = createSlice({
    name: "users",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Caso 1: La petición está en curso (`pending`).
            .addCase(fetchUsers.pending, (state) => {
                state.isLoading = "loading"; // Cambia el estado a 'loading'.
                state.error = null; // Limpia cualquier error anterior.
            })
            // Caso 2: La petición se completó con éxito (`fulfilled`).
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.isLoading = "succeeded"; // Cambia el estado a 'succeeded'.
                state.users = action.payload; // Almacena los usuarios recibidos en el estado.
            })
            // Caso 3: La petición falló (`rejected`).
            .addCase(fetchUsers.rejected, (state, action) => {
                state.isLoading = "failed"; // Cambia el estado a 'failed'.
                state.error = action.payload; // Almacena el mensaje de error en el estado.
            });
    },
});

export default usersSlice.reducer;
