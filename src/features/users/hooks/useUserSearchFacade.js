/**
 * @file User Search Facade Hook (TanStack Query Refactor)
 * @description
 * Implements the Facade Pattern to simplify the UserSearch component.
 * Orchestrates TanStack Query and debouncing logic.
 */

import { useEffect } from "react";
import { useDebouncedSearch } from "@/hooks/useDebouncedSearch.js";
import { useUserQuery } from "@/features/users/hooks/useUserQuery.js";
import { log } from "@/app/logger";
import { DEBOUNCE_DELAY } from "@/app/config";
import { toast } from "sonner";

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
   * Side Effect: Error Notification
   * Moved from service layer to Application Layer (Facade)
   */
  useEffect(() => {
    if (error) {
      if (error.status === 422) {
        toast.error("Validation Error", {
          description: "The data received from the API is invalid or malformed.",
        });
      } else if (error.status === 403) {
        toast.error("Rate Limit Exceeded", {
          description: "GitHub API rate limit reached. Please try again later.",
        });
      }
    }
  }, [error]);

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

