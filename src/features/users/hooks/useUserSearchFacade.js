/**
 * @file User Search Facade Hook (TanStack Query Refactor)
 * @description
 * Implements the Facade Pattern to simplify the UserSearch component.
 * Orchestrates TanStack Query and debouncing logic.
 */

import { useDebouncedSearch } from "@/hooks/useDebouncedSearch.js";
import { useUserQuery } from "@/features/users/hooks/useUserQuery.js";
import { log } from "@/app/logger";
import { DEBOUNCE_DELAY } from "@/app/config";

/**
 * Custom hook that acts as a Facade for the User Search feature.
 *
 * @returns {Object} Clean API for the UserSearch component
 */
export const useUserSearchFacade = () => {
  // 1. Logic for Debounce - Using centralized config
  const [searchTerm, setSearchTerm, debouncedSearchTerm] = useDebouncedSearch(
    "",
    DEBOUNCE_DELAY,
  );

  // 2. Logic for Data Fetching (React Query)
  const {
    data: users = [],
    status,
    error,
    refetch,
    isFetching,
  } = useUserQuery(debouncedSearchTerm);

  /**
   * Encapsulated Retry Logic
   */
  const handleRetry = () => {
    log.flow("Facade: Triggering Retry via React Query");
    refetch();
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
    isLoading: status === "pending" || isFetching,
    isError: status === "error",
    isSuccess: status === "success" && users?.length > 0,
    isEmpty: status === "success" && users?.length === 0,
  };
};
