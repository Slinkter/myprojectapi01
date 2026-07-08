/**
 * @file userService.js
 * @description Capa de servicios para la obtención de datos desde la API REST de GitHub.
 * Integra validaciones Zod y propagación controlada de errores.
 */

import {
  usersCollectionAdapter,
  userAdapter,
} from "../model/adapter";
import { API_BASE_URL } from "@/shared/config/config";
import { apiFetch, ApiError } from "@/shared";
import { ZodError } from "zod";

/**
 * 🎓 CONCEPTO JUNIOR: Abstracción de Servicios y Control de Errores
 * 1. Los componentes visuales no deben realizar solicitudes HTTP directamente; en su lugar, delegan en 
 *    servicios abstractos. Esto facilita el testing y desacopla la UI de las URL del servidor.
 * 2. Si la validación de Zod falla o la red cae, el error se captura y se transforma en un 'ApiError' 
 *    tipado que la UI puede interpretar limpiamente (ej. un error 422 para fallos de datos o 403 para rate-limit).
 */

/**
 * Busca perfiles de usuario u organizaciones en GitHub.
 * Si el término de búsqueda está vacío, retorna el listado de fallback global.
 * 
 * @async
 * @function fetchUsersAPI
 * @param {string} [searchTerm=""] - Nombre o término de búsqueda.
 * @param {AbortSignal} [signal] - Señal para abortar la petición HTTP en curso.
 * @returns {Promise<import('../model/adapter').UserProfile[]>} Promesa con la lista de perfiles adaptados.
 * @throws {ApiError} Si ocurre un error de red o de validación de esquema (código 422).
 * 
 * @example
 * ```javascript
 * const users = await fetchUsersAPI("wycats", controller.signal);
 * ```
 */
export const fetchUsersAPI = async (searchTerm = "", signal) => {
  const url = searchTerm
    ? `${API_BASE_URL}/search/users?q=${encodeURIComponent(searchTerm)}`
    : `${API_BASE_URL}/users`;

  try {
    const data = await apiFetch(url, { signal });
    const rawUsers = searchTerm ? data.items : data;
    return usersCollectionAdapter(rawUsers);
  } catch (error) {
    console.error("Service: fetchUsersAPI falló su ejecución:", error);

    if (error instanceof ApiError) throw error;

    if (error instanceof ZodError) {
      throw new ApiError(`Error de Validación de Datos: ${error.message}`, 422);
    }

    throw error;
  }
};

/**
 * Obtiene los detalles extendidos de un perfil específico de GitHub por su username.
 * 
 * @async
 * @function fetchUserDetailAPI
 * @param {string} login - Nombre de usuario único (handle).
 * @param {AbortSignal} [signal] - Señal para abortar la petición HTTP.
 * @returns {Promise<import('../model/adapter').UserProfile>} Detalles del perfil de usuario adaptado.
 * @throws {ApiError} Si el usuario no existe (404) o si los datos recibidos son inválidos (422).
 * 
 * @example
 * ```javascript
 * const profile = await fetchUserDetailAPI("octocat");
 * ```
 */
export const fetchUserDetailAPI = async (login, signal) => {
  const url = `${API_BASE_URL}/users/${login}`;

  try {
    const rawUser = await apiFetch(url, { signal });

    return userAdapter(rawUser);
  } catch (error) {
    console.error(`Service: fetchUserDetailAPI para "${login}" falló:`, error);

    if (error instanceof ApiError) throw error;
    if (error instanceof ZodError) {
      throw new ApiError(`Error de Validación de Datos: ${error.message}`, 422);
    }

    throw error;
  }
};
