/**
 * @file useUserDetailFacade.js
 * @description Fachada para encapsular la obtención de parámetros de ruta (useParams)
 * y la carga de datos del perfil del desarrollador (useUserDetailQuery).
 */

import { useParams } from "react-router-dom";
import { useUserDetailQuery } from "@/entities/user";

/**
 * 🎓 CONCEPTO JUNIOR: Enrutamiento Dinámico y Captura de Parámetros
 * useParams() es un Hook de React Router que lee variables dinámicas inyectadas en la URL de la SPA 
 * (ej. si la ruta es '/user/:login' y la URL es '/user/mojombo', useParams devuelve { login: 'mojombo' }).
 * La Fachada captura este parámetro y de forma automática dispara la consulta de red cacheada.
 */

/**
 * Hook de Fachada para la vista detallada del perfil.
 * 
 * @function useUserDetailFacade
 * @returns {Object} API unificada de la fachada para el Bento Grid.
 * @returns {string} return.login - Username o handle extraído de la URL.
 * @returns {import('@/entities/user').UserProfile|undefined} return.user - Perfil adaptado de usuario u organización.
 * @returns {boolean} return.isLoading - Indica si la petición HTTP está en curso.
 * @returns {boolean} return.isError - Indica si ocurrió un error durante la carga.
 * @returns {Error|null} return.error - Objeto de error detallado.
 * @returns {boolean} return.isSuccess - Indica si los datos del perfil se cargaron correctamente.
 */
export const useUserDetailFacade = () => {
  const { login } = useParams();

  const {
    data: user,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useUserDetailQuery(login);

  return {
    login,
    user,
    isLoading,
    isError,
    error,
    isSuccess,
  };
};
