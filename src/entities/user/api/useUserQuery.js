import { useQuery } from "@tanstack/react-query";
import { fetchUsersAPI } from "@/entities/user/api/userService";
import { STALE_TIME, GC_TIME } from "@/shared/config/config";

/**
 * Custom TanStack Query hook for searching users.
 *
 * @param {string} searchTerm - Search term to filter users
 * @returns {Object} Query result object containing data, status, error, and actions
 */
export const useUserQuery = (searchTerm) => {
  return useQuery({
    queryKey: ["users", searchTerm],
    queryFn: () => fetchUsersAPI(searchTerm),
    enabled: searchTerm.trim().length === 0 || searchTerm.trim().length >= 3,
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });
};
