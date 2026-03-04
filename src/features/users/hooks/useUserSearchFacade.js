import { useDispatch } from "react-redux";
import { useDebouncedSearch } from "@/hooks/useDebouncedSearch.js";
import { useUserFetching } from "./useUserFetching.js";
import { fetchUsers } from "../usersSlice.js";
import { log } from "@/app/logger";

/**
 * @typedef {Object} UserSearchFacadeReturn
 * @property {string} searchTerm - The current raw search input value
 * @property {Function} setSearchTerm - Setter to update the raw search input
 * @property {string} debouncedSearchTerm - The debounced version of the search term
 * @property {Array<Object>} users - The list of user objects retrieved from the API
 * @property {'idle'|'loading'|'succeeded'|'failed'} status - Current status of the data fetching operation
 * @property {null|Object} error - Error information if the fetch operation fails
 * @property {Function} handleRetry - Triggers a manual retry of the current search
 * @property {boolean} isLoading - Derived state: True if data is being fetched
 * @property {boolean} isError - Derived state: True if the fetch operation failed
 * @property {boolean} isSuccess - Derived state: True if data was successfully retrieved
 * @property {boolean} isEmpty - Derived state: True if search returned no results
 */

/**
 * User Search Facade Hook
 * 
 * @description
 * Implements the Facade Pattern to simplify the UserSearch component.
 * Orchestrates multiple hooks and provides a clean API for the feature.
 * 
 * @returns {UserSearchFacadeReturn} The clean facade API
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
