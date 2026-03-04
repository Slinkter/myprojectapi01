/**
 * @file User Fetching Hook
 * @description
 * Custom hook for managing user data fetching from GitHub API.
 * Abstracts Redux state management and provides a clean interface for components.
 */

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../usersSlice";
import { log } from "@/app/logger";

/**
 * Custom hook for fetching and managing user data
 *
 * @hook
 * @function useUserFetching
 * @param {string} text - Debounced search term. Empty string fetches default user list
 * @returns {Object} User data and request state
 * @returns {Array<Object>} returns.users - Array of user objects from GitHub API
 * @returns {'idle'|'loading'|'succeeded'|'failed'} returns.status - Current request status
 * @returns {Object|null} returns.error - Error object if request fails, null otherwise
 * @returns {string} returns.error.message - Error message
 * @returns {number} [returns.error.status] - HTTP status code if available
 *
 * @description
 * Manages the complete lifecycle of user data fetching:
 * - Dispatches Redux action to fetch users on mount and when search term changes
 * - Provides real-time loading states for UI feedback
 * - Exposes error information for error handling
 * - Returns user data from Redux store (single source of truth)
 *
 * Features:
 * - Automatic data fetching on search term change
 * - Default user list when search is empty
 * - Loading state management
 * - Error handling with status codes
 * - Redux state abstraction
 *
 * @example
 * function UserSearch() {
 *   const [inputValue, setInputValue, debouncedValue] = useDebouncedSearch('', 500);
 *   const { users, status, error } = useUserFetching(debouncedValue);
 *
 *   if (status === 'loading') return <Spinner />;
 *   if (status === 'failed') return <Error message={error.message} />;
 *
 *   return (
 *     <div>
 *       <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
 *       <UserList users={users} />
 *     </div>
 *   );
 * }
 */
export const useUserFetching = (text) => {
  log.effect(`useUserFetching check for text: "${text}"`);
  // Rename 'isLoading' to 'status' for clarity
  // as it contains the actual loading state
  const {
    users = [],
    isLoading: status,
    error,
  } = useSelector((state) => state.users || {});

  const dispatch = useDispatch();

  useEffect(() => {
    log.effect(`Triggering Redux fetchUsers for: "${text}"`);
    // Dispatch the thunk and keep a reference to its promise
    const promise = dispatch(fetchUsers(text));

    // Cleanup function: If the effect runs again (new text) or component unmounts,
    // abort the previous pending request instantly to free up bandwidth.
    return () => {
      log.effect(`Abort triggered for: "${text}"`);
      promise.abort();
    };
  }, [text, dispatch]);

  // Return Redux state directly as the single source of truth
  return { users, status, error };
};
