/**
 * @file User Fetching Hook
 * @description
 * Custom hook for managing user data fetching from GitHub API.
 * Abstracts Redux state management and provides a clean interface for components.
 */

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
  fetchUsers, 
  selectAllUsers, 
  selectUsersStatus, 
  selectUsersError 
} from "../usersSlice.js";
import { log } from "@/app/logger";

/**
 * Custom hook for fetching and managing user data
 *
 * @hook
 * @function useUserFetching
 * @param {string} text - Debounced search term. Empty string fetches default user list
 * @returns {Object} User data and request state
 * 
 * @description
 * Uses memoized selectors to retrieve state from Redux and orchestrates
 * the fetchUsers thunk lifecycle with abort signals.
 */
export const useUserFetching = (text) => {
  log.effect(`useUserFetching check for text: "${text}"`);
  
  const dispatch = useDispatch();

  // Use memoized selectors for high performance
  const users = useSelector(selectAllUsers);
  const status = useSelector(selectUsersStatus);
  const error = useSelector(selectUsersError);

  useEffect(() => {
    log.effect(`Triggering Redux fetchUsers for: "${text}"`);
    const promise = dispatch(fetchUsers(text));

    return () => {
      log.effect(`Abort triggered for: "${text}"`);
      promise.abort();
    };
  }, [text, dispatch]);

  return { users, status, error };
};
