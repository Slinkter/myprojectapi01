/**
 * @file useUserSearchFacade.js
 * @description Facade hook orchestrating the search user flow.
 * Combines query state retrieval, debouncing timers, and error notification triggers.
 */

import { useEffect } from "react";
import { useDebouncedSearch } from "@/shared";
import { useUserSearchQuery as useUserQuery } from "@/entities/user";
import { log } from "@/shared/logger/logger";
import { DEBOUNCE_DELAY } from "@/shared/config/config";
import { toast } from "sonner";

/**
 * @typedef {import('@/entities/user/model/schema').UserProfile} UserProfile
 */

/**
 * @typedef {Object} UserSearchFacadeResult
 * @property {string} searchTerm - User input search term state.
 * @property {function(string): void} setSearchTerm - Search input setter.
 * @property {string} debouncedSearchTerm - Debounced search term used for API queries.
 * @property {UserProfile[]} users - Collection of matching user profiles.
 * @property {Error|null} error - Connection or API failure details.
 * @property {function(): void} handleRetry - Retries query execution.
 * @property {boolean} isLoading - True when query fetching is active.
 * @property {boolean} isError - True when request encountered an error.
 * @property {boolean} isSuccess - True when matches are loaded successfully.
 * @property {boolean} isEmpty - True when search returned zero results.
 */

/**
 * Facade hook exposing states and actions for GitHub user search actions.
 * Separates presentation components from state management.
 *
 * @hook
 * @function useUserSearchFacade
 * @returns {UserSearchFacadeResult} Orchestrated states and actions.
 */
export const useUserSearchFacade = () => {
  const [searchTerm, setSearchTerm, debouncedSearchTerm] = useDebouncedSearch(
    "",
    DEBOUNCE_DELAY,
  );

  const {
    data: users = [],
    status,
    error,
    refetch,
    isLoading: isQueryLoading,
  } = useUserQuery(debouncedSearchTerm);

  // Monitor query errors and push toast messages to notification stack
  useEffect(() => {
    if (error) {
      if (error.status === 422) {
        toast.error("Error de Validación", {
          description: "Los datos de la API no tienen el formato esperado.",
        });
      } else if (error.status === 403) {
        toast.error("Límite excedido", {
          description:
            "Has hecho demasiadas peticiones a GitHub. Intenta luego.",
        });
      }
    }
  }, [error]);

  const handleRetry = () => {
    log.flow("Retrying search query fetch...");
    refetch();
  };

  const isLoading = isQueryLoading;
  const isError = status === "error";
  const isSuccess = status === "success" && users?.length > 0;
  const isEmpty = status === "success" && users?.length === 0;

  return {
    searchTerm,
    setSearchTerm,
    debouncedSearchTerm,
    users,
    error,
    handleRetry,
    isLoading,
    isError,
    isSuccess,
    isEmpty,
  };
};
