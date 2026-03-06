/**
 * @file User Query Hook (TanStack Query)
 * @description
 * High-performance data fetching with React Query.
 * Integrates with the existing Service Layer and Adapters.
 */

import { useQuery } from "@tanstack/react-query";
import { fetchUsersAPI } from "@/services/userService";
import { log } from "@/app/logger";

export const useUserQuery = (searchTerm) => {
  return useQuery({
    queryKey: ["users", searchTerm],
    queryFn: ({ signal }) => {
      log.flow(`useUserQuery searching for: "${searchTerm}"`);
      return fetchUsersAPI(searchTerm, signal);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes (Cache)
    gcTime: 1000 * 60 * 10, // 10 minutes (Garbage Collection)
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
