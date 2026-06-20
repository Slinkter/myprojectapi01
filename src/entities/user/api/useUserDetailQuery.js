import { useQuery } from "@tanstack/react-query";
import { fetchUserDetailAPI } from "@/entities/user/api/userService";
import { STALE_TIME, GC_TIME } from "@/shared/config/config";

export const useUserDetailQuery = (login) => {
  return useQuery({
    queryKey: ["user-detail", login],

    queryFn: async ({ signal }) => {
      return fetchUserDetailAPI(login, signal);
    },

    staleTime: STALE_TIME,
    gcTime: GC_TIME,

    retry: 1,

    refetchOnWindowFocus: false,

    enabled: !!login,
  });
};
