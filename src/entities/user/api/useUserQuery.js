import { useQuery } from "@tanstack/react-query";
import { fetchUsersAPI } from "@/entities/user/api/userService";
import { STALE_TIME, GC_TIME } from "@/shared/config/config";
import { log } from "@/shared";

/**
 * Hook personalizado de TanStack Query para orquestar la búsqueda de usuarios en la API.
 * Gestiona el caché, los tiempos de vida de la data y las condiciones de ejecución.
 *
 * @function useUserQuery
 * @param {string} searchTerm - Término de búsqueda para filtrar usuarios.
 * @returns {import('@tanstack/react-query').UseQueryResult} Objeto resultante de TanStack Query con la data cacheaday los estados de la petición.
 *
 * @example
 * ```typescript
 * // Uso típico dentro del Facade:
 * const { data: users, isLoading, error } = useUserQuery('slinkter');
 * ```
 */
export const useUserQuery = (searchTerm) => {
  return useQuery({
    // La QueryKey permite a React Query identificar de manera única esta petición
    // y cachearla en función de la palabra buscada.
    queryKey: ["users", searchTerm],
    
    // Función extractora que ejecuta el fetch real hacia la API
    queryFn: async () => {
      const timerLabel = `useUserQueryFn:${searchTerm}`;
      log.time(timerLabel);
      log.flow(`📡 [PASO 7: Query Hook] Buscando usuarios para: "${searchTerm}"...`);
      try {
        const result = await fetchUsersAPI(searchTerm);
        log.timeEnd(timerLabel, `QueryFn para "${searchTerm}" resuelta con éxito`);
        return result;
      } catch (err) {
        log.timeEnd(timerLabel, `QueryFn para "${searchTerm}" falló`);
        throw err;
      }
    },
    
    // Regla de optimización: Solo dispara la petición real a la API 
    // si el término está vacío (para traer por defecto) o si tiene al menos 3 caracteres.
    // Esto previene peticiones inútiles con 1 o 2 letras que traerían miles de resultados no relevantes.
    enabled: searchTerm.trim().length === 0 || searchTerm.trim().length >= 3,
    
    // Tiempo en el que los datos se consideran frescos y no provocarán un refetch en background
    staleTime: STALE_TIME,
    
    // Tiempo de vida de los datos en caché antes de ser recolectados por el Garbage Collector
    gcTime: GC_TIME,
  });
};
