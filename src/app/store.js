/**
 * @file Redux Store Configuration
 * @description
 * Centralized Redux store configuration for the application using Redux Toolkit.
 * This file sets up the global state management system with all reducers and middleware.
 *
 * Features:
 * - Uses configureStore from Redux Toolkit for simplified setup
 * - Automatically includes redux-thunk middleware for async operations
 * - Enables Redux DevTools Extension for debugging
 * - Combines all feature reducers into a single store
 *
 * State Structure:
 * - users: Manages user data, loading states, and errors
 */

import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "@/features/users/usersSlice";

/**
 * Redux store instance
 *
 * @constant
 * @type {import('@reduxjs/toolkit').EnhancedStore}
 * @description
 * The centralized Redux store that holds the complete state tree of the application.
 *
 * Configured with:
 * - Redux Toolkit's configureStore for best practices
 * - Automatic middleware setup (thunk, serialization checks, immutability checks)
 * - Redux DevTools integration
 *
 * Reducers:
 * - users: Handles user-related state (list, pagination, loading, errors)
 *
 * @example
 * // Access in components
 * import { useSelector } from 'react-redux';
 * const users = useSelector(state => state.users.list);
 */
export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});
