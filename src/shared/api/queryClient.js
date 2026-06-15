/**
 * @file queryClient.js
 * @description Configuración e instancia global de TanStack Query.
 * Aquí se definen los parámetros por defecto del cliente de mutaciones y consultas,
 * como la persistencia en caché y la política de reintentos.
 */

import { QueryClient } from "@tanstack/react-query";
import { STALE_TIME, GC_TIME } from "../config/config";

/**
 * Instancia global de QueryClient.
 * Centraliza la configuración de caché y reintentos para toda la aplicación.
 * Previene la saturación de la API de GitHub al evitar refetches agresivos.
 *
 * @type {QueryClient}
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Tiempo que la data se considera fresca. Evita hacer la misma petición en ese lapso.
      staleTime: STALE_TIME,
      
      // Tiempo que los datos inactivos persisten en la memoria (caché)
      gcTime: GC_TIME,
      
      // Limitamos el intento de fallback a 1 vez en caso de fallos (generalmente por Rate Limits de GitHub).
      retry: 1,
      
      // Deshabilitamos el refetch al reenfocar la ventana para ahorrar quota de la API gratuita.
      refetchOnWindowFocus: false,
    },
  },
});
