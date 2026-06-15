/**
 * @file useUserSearchFacade.js
 * @description Facade hook que orquesta el flujo de búsqueda de usuarios.
 * Combina la recuperación de estado de consultas (TanStack Query), temporizadores de debounce, y 
 * disparadores de notificaciones de error para desacoplar completamente la UI de la lógica de negocio.
 */

import { useEffect } from "react";
import { useDebouncedSearch } from "@/shared";
import { useUserSearchQuery as useUserQuery } from "@/entities/user";
import { log } from "@/shared/logger/logger";
import { DEBOUNCE_DELAY } from "@/shared/config/config";
import { toast } from "sonner";

/**
 * @typedef {import('@/entities/user/model/schema').UserProfile} UserProfile
 */

/**
 * @typedef {Object} UserSearchFacadeResult
 * @property {string} searchTerm - Estado del término de búsqueda ingresado por el usuario.
 * @property {function(string): void} setSearchTerm - Setter para actualizar el término de búsqueda.
 * @property {string} debouncedSearchTerm - Término de búsqueda con retraso (debounce) utilizado para optimizar llamadas a la API.
 * @property {UserProfile[]} users - Colección de perfiles de usuario que coinciden con la búsqueda.
 * @property {Error|null} error - Detalles de fallos de conexión o de la API.
 * @property {function(): void} handleRetry - Ejecuta un reintento manual de la consulta.
 * @property {boolean} isLoading - Verdadero cuando la petición de la consulta está activa.
 * @property {boolean} isError - Verdadero cuando la petición encontró un error.
 * @property {boolean} isSuccess - Verdadero cuando las coincidencias se cargaron con éxito.
 * @property {boolean} isEmpty - Verdadero cuando la búsqueda no arrojó resultados.
 */

/**
 * Facade hook que expone los estados y acciones para la búsqueda de usuarios en GitHub.
 * Separa de manera estricta los componentes de presentación (UI) de la gestión de estado y red.
 *
 * @hook
 * @function useUserSearchFacade
 * @returns {UserSearchFacadeResult} Estados y acciones orquestados listos para ser consumidos por la vista.
 * 
 * @example
 * ```typescript
 * const { searchTerm, setSearchTerm, users, isLoading, isError } = useUserSearchFacade();
 * 
 * return (
 *   <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
 *   {isLoading && <Loader />}
 *   {users.map(u => <UserCard key={u.id} user={u} />)}
 * );
 * ```
 */
export const useUserSearchFacade = () => {
  log.flow("⚡ [PASO 6: Facade] Orquestando estado y lógica de búsqueda de usuarios...");

  // 1. Manejo del input del usuario con Debounce para no inundar la API en cada tipeo.
  const [searchTerm, setSearchTerm, debouncedSearchTerm] = useDebouncedSearch(
    "",
    DEBOUNCE_DELAY,
  );

  // 2. Suscripción a los datos cacheados y manejados por TanStack Query.
  const {
    data: users = [],
    status,
    error,
    refetch,
    isLoading: isQueryLoading,
  } = useUserQuery(debouncedSearchTerm);

  // 3. Monitorización de errores de consulta para mostrar feedback visual (Toasts).
  // Se extrae esta lógica del componente visual para mantenerlo agnóstico de los Side Effects.
  useEffect(() => {
    if (error) {
      if (error.status === 422) {
        toast.error("Error de Validación", {
          description: "Los datos de la API no tienen el formato esperado.",
        });
      } else if (error.status === 403) {
        toast.error("Límite excedido", {
          description:
            "Has hecho demasiadas peticiones a GitHub. Intenta luego.",
        });
      }
    }
  }, [error]);

  /**
   * Dispara un reintento manual de la última petición fallida.
   */
  const handleRetry = () => {
    log.flow("Retrying search query fetch...");
    refetch();
  };

  // 4. Estados derivados pre-computados para facilitar el renderizado condicional en la UI.
  const isLoading = isQueryLoading;
  const isError = status === "error";
  const isSuccess = status === "success" && users?.length > 0;
  const isEmpty = status === "success" && users?.length === 0;

  return {
    searchTerm,
    setSearchTerm,
    debouncedSearchTerm,
    users,
    error,
    handleRetry,
    isLoading,
    isError,
    isSuccess,
    isEmpty,
  };
};
