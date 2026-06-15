/**
 * @file useUserDetailQuery.js
 * @description Hook personalizado de consulta para obtener detalles de un usuario usando TanStack Query.
 * Implementa estrategias de optimización de rendimiento como evitar el refetch al re-enfocar la ventana
 * y limitación en la cantidad de reintentos en caso de fallos.
 */

import { useQuery } from "@tanstack/react-query";
import { fetchUserDetailAPI } from "@/entities/user/api/userService";
import { log } from "@/shared/logger/logger";
import { STALE_TIME, GC_TIME } from "@/shared/config/config";

/**
 * Hook para la obtención de detalles de usuario.
 * Controla el ciclo de vida de los datos cacheados en TanStack Query.
 * 
 * @function useUserDetailQuery
 * @param {string} login - Nombre de usuario en GitHub (handle).
 * @returns {import('@tanstack/react-query').UseQueryResult} Estados asíncronos y data parseada proporcionada por TanStack Query.
 * 
 * @example
 * ```typescript
 * const { data, isLoading } = useUserDetailQuery("facebook");
 * ```
 */
export const useUserDetailQuery = (login) => {
  return useQuery({
    // La QueryKey incluye el `login` para aislar el caché de diferentes perfiles vistos
    queryKey: ["user-detail", login],
    
    // Inyecta el signal del abort controller para matar la petición si el componente se desmonta rápido
    queryFn: ({ signal }) => {
      log.flow(`📡 [PASO 7: Query Hook] Solicitando detalles para: "${login}"`);
      return fetchUserDetailAPI(login, signal);
    },
    
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    
    // Estrategia contra Rate Limits: Si la API de Github nos bloquea, no queremos reintentar frenéticamente. 
    // Lo limitamos a un único reintento automático.
    retry: 1,
    
    // Al volver a la pestaña de la app, no se fuerza una actualización automática.
    // GitHub API penaliza fuertemente el exceso de peticiones.
    refetchOnWindowFocus: false,
    
    // Condición de carrera: El hook no hará nada si `login` es nulo, indefinido o string vacío.
    enabled: !!login,
  });
};
