/**
 * @file User Detail Query Hook
 * @description
 * Custom hook for fetching detailed user information using TanStack Query.
 */

import { useQuery } from "@tanstack/react-query";
import { fetchUserDetailAPI } from "@/services/userService";
import { log } from "@/app/logger";
import { STALE_TIME, GC_TIME } from "@/app/config";

/**
 * Hook for fetching user details.
 * 
 * @param {string} login - GitHub username
 * @returns {import('@tanstack/react-query').UseQueryResult}
 */
export const useUserDetailQuery = (login) => {
  return useQuery({
    queryKey: ["user-detail", login],
    queryFn: ({ signal }) => {
      log.flow(`useUserDetailQuery fetching details for: "${login}"`);
      return fetchUserDetailAPI(login, signal);
    },
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: !!login,
  });
};
