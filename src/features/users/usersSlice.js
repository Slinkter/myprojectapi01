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

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
 *
 * @example
 * Fetch default users
 * dispatch(fetchUsers());
 *
 * @example
 * Search for specific users
 * dispatch(fetchUsers('octocat'));
 */
export const fetchUsers = createAsyncThunk(
  SLICE_NAME,
  async (searchTerm = "", { rejectWithValue, signal }) => {
    try {
      log.flow("fetch");
      // Pasamos el signal para abortar la petición vía red (AbortController)
      const users = await fetchUsersAPI(searchTerm, signal);
      return users;
    } catch (error) {
      // AbortError is a standard DOM exception when fetch is cancelled
      if (error.name === "AbortError") {
        throw error; // Let Redux handle the cancellation silently
      }

      // Check if it's our custom ApiError with a status
      if (error.name === "ApiError" || error.status) {
        return rejectWithValue({
          message: error.message,
          status: error.status,
        });
      }
      // Fallback for network errors or other unexpected errors
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

/**
 * Users slice configuration
 *
 * @constant
 * @type {import('@reduxjs/toolkit').Slice}
 * @description
 * Manages user-related state with automatic reducer generation.
 * Handles three states for the fetchUsers async thunk:
 * - pending: Sets loading state and clears errors
 * - fulfilled: Stores fetched users and sets success state
 * - rejected: Stores error information and sets failed state
 */
const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Case 1: Request is pending
      .addCase(fetchUsers.pending, (state) => {
        log.redux("fetchUsers.pending");
        state.isLoading = "loading";
        state.error = null;
      })
      // Case 2: Request succeeded
      .addCase(fetchUsers.fulfilled, (state, action) => {
        log.redux("fetchUsers.fulfilled", { count: action.payload?.length });
        state.isLoading = "succeeded";
        state.users = action.payload;
      })
      // Case 3: Request failed
      .addCase(fetchUsers.rejected, (state, action) => {
        log.redux("fetchUsers.rejected", action.payload);
        state.isLoading = "failed";
        state.error = action.payload;
      });
  },
});

/**
 * Users reducer
 * @type {import('@reduxjs/toolkit').Reducer}
 */
export default usersSlice.reducer;
