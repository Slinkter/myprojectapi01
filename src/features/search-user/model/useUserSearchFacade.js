/**
 * @file useUserSearchFacade.js
 * @description Fachada (Facade Pattern) para centralizar y simplificar la lógica de
 * búsqueda de usuarios en la interfaz, abstrayendo los hooks de enrutamiento y caché.
 */

import { useEffect } from "react";
import { useDebouncedSearch } from "@/shared";
import { useUserSearchQuery as useUserQuery } from "@/entities/user";
import { toast } from "sonner";

/**
 * 🎓 CONCEPTO JUNIOR: Patrón Facade (Fachada)
 * Un Facade simplifica el uso de subsistemas complejos (como el manejo de debounce, el cliente de caché 
 * de TanStack Query y los toasters de notificación) envolviéndolos en un Hook limpio de pocas líneas. 
 * El componente visual solo consume booleanos sencillos (como 'isLoading' o 'isError') sin conocer la complejidad interna.
 */

/**
 * Hook de Fachada para controlar el estado y las interacciones de búsqueda de usuarios.
 * 
 * @function useUserSearchFacade
 * @returns {Object} API simplificada de la fachada para el componente de UI.
 * @returns {string} return.searchTerm - Término de búsqueda escrito actualmente.
 * @returns {Function} return.setSearchTerm - Setea o actualiza el término de búsqueda escrito.
 * @returns {string} return.debouncedSearchTerm - Término de búsqueda tras aplicar el debounce.
 * @returns {import('@/entities/user').UserProfile[]} return.users - Listado de perfiles de usuario encontrados.
 * @returns {Error|null} return.error - Error propagado si la consulta falla.
 * @returns {Function} return.handleRetry - Fuerza la re-ejecución de la consulta HTTP de búsqueda.
 * @returns {boolean} return.isLoading - Indica si hay una consulta de búsqueda en curso en la red.
 * @returns {boolean} return.isError - Indica si la última consulta falló.
 * @returns {boolean} return.isSuccess - Indica si la última consulta fue exitosa y arrojó perfiles.
 * @returns {boolean} return.isEmpty - Indica si la búsqueda se completó exitosamente con 0 resultados.
 */
export const useUserSearchFacade = () => {
  const [searchTerm, setSearchTerm, debouncedSearchTerm] =
    useDebouncedSearch("");

  const {
    data: users = [],
    status,
    error,
    refetch,
    isLoading: isQueryLoading,
  } = useUserQuery(debouncedSearchTerm);

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

  const handleRetry = () => {
    refetch();
  };

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
