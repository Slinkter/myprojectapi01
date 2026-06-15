/**
 * @file useUserDetailFacade.js
 * @description Hook Facade que orquesta la obtención y la gestión de estado para el perfil detallado del usuario.
 * Este patrón aísla los componentes visuales de saber *cómo* se lee la URL o *cómo* interactúa TanStack Query.
 */

import { useParams } from "react-router-dom";
import { useUserDetailQuery } from "@/entities/user";
import { log } from "@/shared";

/**
 * @typedef {import('@/entities/user/model/schema').UserProfile} UserProfile
 */

/**
 * @typedef {Object} UserDetailFacadeResult
 * @property {string} login - Nombre de usuario de GitHub obtenido de los parámetros de la URL.
 * @property {UserProfile|undefined} user - Detalles del usuario normalizados si se cargó exitosamente.
 * @property {boolean} isLoading - Verdadero cuando la petición de datos está cargando por primera vez.
 * @property {boolean} isError - Verdadero cuando la petición encontró un error de red o de API.
 * @property {Error|null} error - Objeto de error con detalles del fallo.
 * @property {boolean} isSuccess - Verdadero cuando los datos se recuperaron con éxito.
 */

/**
 * Hook facade personalizado para separar la lógica del detalle de usuario y el enrutamiento de la presentación visual.
 *
 * @hook
 * @function useUserDetailFacade
 * @returns {UserDetailFacadeResult} Estados y datos orquestados listos para la UI.
 * 
 * @example
 * ```typescript
 * // En el componente DetailPage:
 * const { user, isLoading, isError } = useUserDetailFacade();
 * 
 * if (isLoading) return <Loader />;
 * if (isError) return <ErrorDisplay />;
 * return <UserProfileBento user={user} />;
 * ```
 */
export const useUserDetailFacade = () => {
  log.flow("⚡ [PASO 6: Facade] Orquestando estado y lógica de detalle de usuario...");

  // 1. Extracción de dependencias del entorno de Enrutamiento (React Router)
  const { login } = useParams();

  // 2. Ejecución de la petición asíncrona inyectando la dependencia (login)
  const {
    data: user,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useUserDetailQuery(login);

  // 3. Exposición de un contrato limpio (Interfaz unificada)
  return {
    login,
    user,
    isLoading,
    isError,
    error,
    isSuccess,
  };
};
