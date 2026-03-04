/**
 * @file Users Redux Slice
 * @description
 * Redux Toolkit slice that manages the users feature state.
 * Handles user data fetching, loading states, and error management.
 *
 * State Structure:
 * - isLoading: 'idle' | 'loading' | 'succeeded' | 'failed'
 * - error: null | { message: string, status?: number }
 * - users: Array of user objects from GitHub API
 *
 * Features:
 * - Async thunk for fetching users from GitHub API
 * - Automatic loading state management
 * - Error handling with status codes
 * - Support for search and default user list
 */

import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { fetchUsersAPI } from "@/services/userService";
import { log } from "@/app/logger";

/**
 * Slice name constant for the async thunk
 * @constant {string}
 */
const SLICE_NAME = "users/fetchUsers";

/**
 * Async thunk for fetching users from GitHub API
 *
 * @async
 * @function fetchUsers
 * @param {string} [searchTerm=""] - Search term to filter users. Empty string fetches default user list
 * @param {Object} thunkAPI - Redux Toolkit thunk API
 * @param {Function} thunkAPI.rejectWithValue - Function to return custom error payload
 * @returns {Promise<Array<Object>>} Array of user objects from GitHub API
 * @throws {Object} Error object with message and optional status code
 */
export const fetchUsers = createAsyncThunk(
  SLICE_NAME,
  async (searchTerm = "", { rejectWithValue, signal }) => {
    try {
      log.flow("fetch");
      const users = await fetchUsersAPI(searchTerm, signal);
      return users;
    } catch (error) {
      if (error.name === "AbortError") {
        throw error;
      }
      if (error.name === "ApiError" || error.status) {
        return rejectWithValue({
          message: error.message,
          status: error.status,
        });
      }
      return rejectWithValue({ message: error.message || "Unknown Error" });
    }
  },
);

/**
 * Initial state for the users slice
 *
 * @typedef {Object} UsersState
 * @property {'idle'|'loading'|'succeeded'|'failed'} isLoading - Current loading status
 * @property {null|{message: string, status?: number}} error - Error object if request fails
 * @property {Array<Object>} users - Array of user objects from GitHub API
 */
const initialState = {
  isLoading: "idle",
  error: null,
  users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        log.redux("fetchUsers.pending");
        state.isLoading = "loading";
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        log.redux("fetchUsers.fulfilled", { count: action.payload?.length });
        state.isLoading = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        log.redux("fetchUsers.rejected", action.payload);
        state.isLoading = "failed";
        state.error = action.payload;
      });
  },
});

// --- SELECTORS (Senior Architecture Pattern) ---

/**
 * Base selector to get the users state
 * @param {Object} state - Global state
 * @returns {UsersState}
 */
const selectUsersBaseState = (state) => state.users;

/**
 * Memoized selector to get the list of users
 * @type {import('@reduxjs/toolkit').Selector}
 */
export const selectAllUsers = createSelector(
  [selectUsersBaseState],
  (usersState) => usersState.users
);

/**
 * Memoized selector to get the current loading status
 */
export const selectUsersStatus = createSelector(
  [selectUsersBaseState],
  (usersState) => usersState.isLoading
);

/**
 * Memoized selector to get the current error
 */
export const selectUsersError = createSelector(
  [selectUsersBaseState],
  (usersState) => usersState.error
);

/**
 * Derived selector to check if the state is loading
 */
export const selectIsUsersLoading = createSelector(
  [selectUsersStatus],
  (status) => status === "loading"
);

/**
 * Derived selector to check if the search returned no results
 */
export const selectIsUsersEmpty = createSelector(
  [selectAllUsers, selectUsersStatus],
  (users, status) => status === "succeeded" && users.length === 0
);

export default usersSlice.reducer;
