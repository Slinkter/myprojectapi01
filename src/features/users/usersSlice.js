import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "https://api.github.com/users";
const SLICE_NAME = "users/fetchUsers";

export const fetchUsers = createAsyncThunk(
    SLICE_NAME,
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                const errorMessage = `HTTP error! status: ${response.status} - ${response.statusText}`;
                return rejectWithValue(errorMessage);
            }
            const data = await response.json();
            // Retraso artificial para asegurar que el esqueleto sea visible
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    isLoading: "idle", // idle | loading | succeeded | failed
    error: null,
    users: [],
};

export const usersSlice = createSlice({
    name: "users",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.isLoading = "loading";
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.isLoading = "succeeded";
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.isLoading = "failed";
                state.error = action.payload;
            });
    },
});

export default usersSlice.reducer;
