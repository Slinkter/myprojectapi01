/**
 * Este slice maneja todo el estado relacionado con los usuarios, incluyendo:
 * - El estado de la carga de datos desde la API (idle, loading, succeeded, failed).
 * - Cualquier error que ocurra durante la carga.
 * - La lista de usuarios.
 * Utiliza `createAsyncThunk` para gestionar la llamada asíncrona a la API de GitHub.
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "https://api.github.com/users";
const SLICE_NAME = "users/fetchUsers";

/**
 * @function fetchUsers
 * @description Thunk asíncrono para obtener los usuarios de la API de GitHub.
 * Un thunk es una función que envuelve una expresión para retrasar su evaluación.
 * En Redux, los thunks permiten escribir lógica que puede despachar acciones y tener efectos secundarios, como las llamadas a API.
 * `createAsyncThunk` genera automáticamente los tipos de acción para los estados del ciclo de vida de la promesa (pending, fulfilled, rejected).
 */
export const fetchUsers = createAsyncThunk(
    SLICE_NAME,
    async (_, { reject }) => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                // Si la respuesta no es exitosa, rechaza la promesa con un mensaje de error formateado.
                const errorMessage = `HTTP error! status: ${response.status} - ${response.statusText}`;
                return reject(errorMessage);
            }
            const data = await response.json();
            // Se añade un retraso artificial para asegurar que la animación del esqueleto sea visible
            // y mejorar la experiencia de usuario en conexiones muy rápidas.
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return data; // El valor de retorno en caso de éxito se convierte en el `payload` de la acción `fulfilled`.
        } catch (error) {
            // Si ocurre un error en la red o en el fetch, rechaza la promesa con el mensaje de error.
            return reject(error.message);
        }
    }
);

// Crea el slice de usuarios.
// `extraReducers` permite a un slice responder a acciones que no fueron definidas en su campo `reducers`.
// Es ideal para manejar los estados de un `createAsyncThunk`.
export const usersSlice = createSlice({
    name: "users",
    initialState: {
        isLoading: "idle", // El estado puede ser: 'idle', 'loading', 'succeeded', 'failed'
        error: null, // Almacena el mensaje de error si la carga falla.
        users: [], // Array para almacenar los datos de los usuarios.
    },
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
