/**
 * @file User Search Facade Hook
 * @description
 * Implements the Facade Pattern to simplify the UserSearch component.
 * Orchestrates multiple hooks and provides a clean API.
 */

import { useDispatch } from "react-redux";
import { useDebouncedSearch } from "@/hooks/useDebouncedSearch.js";
import { useUserFetching } from "./useUserFetching.js";
import { fetchUsers } from "../usersSlice.js";
import { log } from "@/app/logger";

/**
 * Custom hook that acts as a Facade for the User Search feature.
 * 
 * @returns {Object} Clean API for the UserSearch component
 */
export const useUserSearchFacade = () => {
  // 1. Logic for Debounce
  const [searchTerm, setSearchTerm, debouncedSearchTerm] = useDebouncedSearch("");

  // 2. Logic for Data Fetching
  const { users, status, error } = useUserFetching(debouncedSearchTerm);

  const dispatch = useDispatch();

  /**
   * Encapsulated Retry Logic
   */
  const handleRetry = () => {
    log.redux("Facade: Triggering Retry Strategy");
    const currentTerm = debouncedSearchTerm;
    if (searchTerm === currentTerm) {
      dispatch(fetchUsers(currentTerm));
    } else {
      setSearchTerm(currentTerm);
    }
  };

  // Exposed API: The component doesn't care HOW this works internally
  return {
    searchTerm,
    setSearchTerm,
    debouncedSearchTerm,
    users,
    status,
    error,
    handleRetry,
    isLoading: status === "loading" || status === "idle",
    isError: status === "failed",
    isSuccess: status === "succeeded" && users?.length > 0,
    isEmpty: status === "succeeded" && users?.length === 0
  };
};
