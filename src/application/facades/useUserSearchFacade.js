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
import { useDebouncedSearch } from "@/application/hooks/useDebouncedSearch.js";
import { useUserQuery } from "@/application/queries/useUserQuery.js";
import { log } from "@/infrastructure/logger/logger";
import { DEBOUNCE_DELAY } from "@/infrastructure/config/config";
import { toast } from "sonner";

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
    isFetching,
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
  const isLoading = status === "pending" || isFetching;
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

