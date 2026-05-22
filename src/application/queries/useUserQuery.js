/**
 * @file useUserQuery.js
 * @description
 * Obtención de datos de alto rendimiento con React Query.
 * Se integra con la capa de Servicios y Adaptadores existente.
 */

import { useQuery } from "@tanstack/react-query";
import { fetchUsersAPI } from "@/infrastructure/api/userService";
import { log } from "@/infrastructure/logger/logger";
import { STALE_TIME, GC_TIME } from "@/infrastructure/config/config";

export const useUserQuery = (searchTerm) => {
  return useQuery({
    queryKey: ["users", searchTerm],
    queryFn: ({ signal }) => {
      log.flow(`useUserQuery searching for: "${searchTerm}"`);
      return fetchUsersAPI(searchTerm, signal);
    },
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
