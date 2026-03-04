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
 * @property {'idle'|'loading'|'succeeded'|'failed'} status - Current status
 * @property {null|Object} error - Error information
 * @property {Function} handleRetry - Triggers a manual retry
 * @property {boolean} isLoading - True if data is being fetched
 * @property {boolean} isError - True if the fetch operation failed
 * @property {boolean} isSuccess - True if data was successfully retrieved
 * @property {boolean} isEmpty - True if search returned no results
 */

/**
 * User Search Facade Hook (Data Flow Synchronization)
 * 
 * @description
 * Orchestrates search term state and fetches user data, 
 * centralizing all state logic for the UI.
 * 
 * @returns {UserSearchFacadeReturn}
 */
export const useUserSearchFacade = () => {
  // 1. Term State with Debouncing
  const [searchTerm, setSearchTerm, debouncedSearchTerm] = useDebouncedSearch("");

  // 2. Data State (Uses the refactored useUserFetching hook)
  const { users, status, error } = useUserFetching(debouncedSearchTerm);

  const dispatch = useDispatch();

  /**
   * Retry Mechanism
   */
  const handleRetry = () => {
    log.redux("Facade: Triggering Retry Strategy");
    dispatch(fetchUsers(debouncedSearchTerm));
  };

  const isLoading = status === "loading";
  const isError = status === "failed";
  const isSuccess = status === "succeeded";
  const isEmpty = isSuccess && users?.length === 0;

  return {
    searchTerm,
    setSearchTerm,
    debouncedSearchTerm,
    users,
    status,
    error,
    handleRetry,
    isLoading,
    isError,
    isSuccess,
    isEmpty
  };
};
