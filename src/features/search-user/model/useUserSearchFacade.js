/**
 * @file useUserSearchFacade.js
 * @description
 * 📚 EXPLICACIÓN PARA JUNIORS: EL PATRÓN FACADE (FACHADA)
 * Imagina que vas a un restaurante. Tú (el componente visual) le pides comida al
 * mesero (la fachada). A ti no te importa cómo el chef prepara la comida en la
 * cocina (la lógica compleja de debouncing y React Query). Solo te importa
 * recibir la comida lista.
 * 
 * Este Hook hace exactamente eso: oculta toda la lógica compleja de buscar usuarios
 * y le entrega al componente "UserSearch" solo lo que necesita para pintar la pantalla.
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
 * @property {string} searchTerm - El término actual en el input
 * @property {function(string): void} setSearchTerm - Setter para el término de búsqueda
 * @property {string} debouncedSearchTerm - El término debouceado usado por TanStack Query
 * @property {UserProfile[]} users - Colección de usuarios normalizados
 * @property {Error|null} error - Objeto de error si la consulta falló
 * @property {function(): void} handleRetry - Función para reintentar la búsqueda
 * @property {boolean} isLoading - True si está cargando por primera vez
 * @property {boolean} isError - True si hubo un error en la red/API
 * @property {boolean} isSuccess - True si se cargaron datos correctamente
 * @property {boolean} isEmpty - True si la búsqueda terminó sin resultados
 */

/**
 * Hook de fachada que orquesta el estado de búsqueda de usuarios de GitHub.
 *
 * @hook
 * @function useUserSearchFacade
 * @returns {UserSearchFacadeResult} Los datos y disparadores simplificados para el componente visual.
 */
export const useUserSearchFacade = () => {
  // 1. DEBOUNCE: Esperamos a que el usuario deje de escribir antes de buscar.
  // Esto evita hacer 100 peticiones a la API si el usuario teclea rápido.
  const [searchTerm, setSearchTerm, debouncedSearchTerm] = useDebouncedSearch(
    "",
    DEBOUNCE_DELAY,
  );

  // 2. FETCHING: Usamos TanStack Query para pedir los datos a GitHub.
  // Solo buscará cuando 'debouncedSearchTerm' cambie.
  const {
    data: users = [],
    status,
    error,
    refetch,
    isLoading: isQueryLoading,
  } = useUserQuery(debouncedSearchTerm);

  // 3. NOTIFICACIONES: Si algo falla, le avisamos al usuario.
  // Movemos esta lógica aquí para que el componente visual no tenga que lidiar con errores.
  useEffect(() => {
    if (error) {
      if (error.status === 422) {
        toast.error("Error de Validación", {
          description: "Los datos de la API no tienen el formato esperado.",
        });
      } else if (error.status === 403) {
        toast.error("Límite excedido", {
          description: "Has hecho demasiadas peticiones a GitHub. Intenta luego.",
        });
      }
    }
  }, [error]);

  // 4. RETRY: Función para intentar cargar de nuevo si hubo un error.
  const handleRetry = () => {
    log.flow("Reintentando petición...");
    refetch();
  };

  // 5. VARIABLES DE ESTADO SIMPLIFICADAS
  // Aquí traducimos los estados confusos de React Query a variables booleanas
  // fáciles de leer para nuestro componente (true o false).
  const isLoading = isQueryLoading;
  const isError = status === "error";
  const isSuccess = status === "success" && users?.length > 0;
  const isEmpty = status === "success" && users?.length === 0;

  // ¡Esto es la Fachada! Le entregamos al componente un paquete limpio.
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

