import { useEffect, useRef } from "react";
import { useDebouncedSearch } from "@/shared";
import { useUserSearchQuery as useUserQuery } from "@/entities/user";

import { toast } from "sonner";

export const useUserSearchFacade = () => {
  /*  */
  const [searchTerm, setSearchTerm, debouncedSearchTerm] =
    useDebouncedSearch("");

  const {
    data: users = [],
    status,
    error,
    refetch,
    isLoading: isQueryLoading,
  } = useUserQuery(debouncedSearchTerm);

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
    refetch();
  };

  const isLoading = isQueryLoading;
  const isError = status === "error";
  const isSuccess = status === "success" && users?.length > 0;
  const isEmpty = status === "success" && users?.length === 0;

  const prevStatus = useRef(status);
  useEffect(() => {
    if (prevStatus.current !== status) {
      const label =
        status === "pending"
          ? `TanStack Query: loading`
          : status === "success"
            ? `TanStack Query: success (${users.length} usuarios)`
            : status === "error"
              ? `TanStack Query: error`
              : `TanStack Query: ${status}`;
      console.log(`%c    📡 ${label}`, "color: #a855f7; font-weight: 500;");
      prevStatus.current = status;
    }
  }, [status]);

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
