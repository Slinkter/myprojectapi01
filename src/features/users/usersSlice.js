/**
 * @file Slice  para los usuarios.
 * @description
 * Este archivo gestiona todo lo relacionado con los usuarios:
 * - La lista de usuarios obtenida de la API.
 * - El estado de la carga (si está cargando, si tuvo éxito o si falló).
 * - El mensaje de error en caso de que algo salga mal.
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsersAPI } from "../../services/userService";

const SLICE_NAME = "users/fetchUsers";

/** ====================================
 * @function fetchUsers
 * @description Thunk asíncrono para obtener los usuarios de la API de GitHub.
 * Utiliza el servicio `fetchUsersAPI` para realizar la llamada a la API.
 * En caso de error, `rejectWithValue` devuelve un objeto con `{ message: string, status?: number }`.
 */
export const fetchUsers = createAsyncThunk(
    SLICE_NAME,
    async (searchTerm = "", { rejectWithValue }) => {
        try {
            const users = await fetchUsersAPI(searchTerm);
            return users;
        } catch (error) {
            // The service layer might throw a stringified JSON object or a generic Error.
            // We try to parse it to maintain the error object structure.
            try {
                return rejectWithValue(JSON.parse(error.message));
            } catch (e) {
                return rejectWithValue({ message: error.message });
            }
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
                console.log("usersSlice - payload:", action.payload);
            })
            // Caso 3: La petición falló (`rejected`).
            .addCase(fetchUsers.rejected, (state, action) => {
                state.isLoading = "failed"; // Cambia el estado a 'failed'.
                state.error = action.payload; // Almacena el mensaje de error en el estado.
                console.log("usersSlice - rejected payload:", action.payload);
            });
    },
});

export default usersSlice.reducer;
