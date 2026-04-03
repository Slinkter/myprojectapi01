/**
 * @file User Query Hook (TanStack Query)
 * @description
 * High-performance data fetching with React Query.
 * Integrates with the existing Service Layer and Adapters.
 */

import { useQuery } from "@tanstack/react-query";
import { fetchUsersAPI } from "@/services/userService";
import { log } from "@/app/logger";
import { STALE_TIME, GC_TIME } from "@/app/config";

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
