/**
 * @file queryClient.js
 * @description Configuración e instancia global de TanStack Query.
 */

import { QueryClient } from "@tanstack/react-query";
import { STALE_TIME, GC_TIME } from "../config/config";

/**
 * Instancia global de QueryClient.
 * Centraliza la configuración de caché y reintentos para toda la aplicación.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALE_TIME,
      gcTime: GC_TIME,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
