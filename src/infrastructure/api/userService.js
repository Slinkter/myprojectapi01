/**
 * @file userService.js
 * @description
 * 📚 EXPLICACIÓN PARA JUNIORS: LA CAPA DE SERVICIO (SERVICES)
 * Este archivo se encarga exclusivamente de comunicarse con el mundo exterior
 * (Internet, en este caso la API de GitHub). 
 * 
 * NO contiene lógica visual, NO sabe qué es React. Simplemente pide datos usando
 * 'fetch' (a través de nuestra utilidad httpClient), captura los errores si se 
 * cae el internet, y por último, pasa los datos sucios por nuestro "Adaptador" 
 * antes de devolverlos a la aplicación.
 */

import { usersCollectionAdapter, userAdapter } from "@/domain/adapters/userAdapter";
import { API_BASE_URL } from "@/infrastructure/config/config";
import { httpClient } from "@/infrastructure/api/httpClient";
import { ApiError } from "@/domain/errors/ApiError";
import { ZodError } from "zod";

/** @typedef {import('@/domain/schemas/user').UserProfile} UserProfile */

/**
 * Busca usuarios en la API de GitHub.
 *
 * @async
 * @function fetchUsersAPI
 * @param {string} [searchTerm=""] - Palabra a buscar. Si está vacía, trae una lista por defecto.
 * @param {AbortSignal} [signal] - Sirve para cancelar la petición si el usuario cambia de página rápido.
 * @returns {Promise<UserProfile[]>} Lista de usuarios ya limpios (pasados por el Adaptador).
 */
export const fetchUsersAPI = async (searchTerm = "", signal) => {
  // 1. Construimos la URL de GitHub
  const url = searchTerm
    ? `${API_BASE_URL}/search/users?q=${encodeURIComponent(searchTerm)}`
    : `${API_BASE_URL}/users`;

  try {
    // 2. Hacemos la petición a internet
    const data = await httpClient(url, { signal });
    // GitHub devuelve los datos diferentes si es búsqueda o lista normal. Lo nivelamos.
    const rawUsers = searchTerm ? data.items : data;

    // 3. LIMPIEZA DE DATOS (EL ADAPTADOR)
    // No devolvemos la basura de GitHub a la app, la limpiamos primero.
    return usersCollectionAdapter(rawUsers);
    
  } catch (error) {
    console.error("Service: Falló la petición de usuarios:", error);

    // 4. MANEJO DE ERRORES CENTRALIZADO
    if (error instanceof ApiError) throw error;
    // Si Zod (nuestro guardia) se queja, lanzamos un error de Validación.
    if (error instanceof ZodError) {
      throw new ApiError(`Error de Validación de Datos: ${error.message}`, 422);
    }
    
    throw error;
  }
};

/**
 * Busca los detalles de un SOLO usuario.
 *
 * @async
 * @function fetchUserDetailAPI
 * @param {string} login - El nombre de usuario en GitHub.
 * @param {AbortSignal} [signal] - Señal de cancelación.
 * @returns {Promise<UserProfile>} Usuario limpio.
 */
export const fetchUserDetailAPI = async (login, signal) => {
  const url = `${API_BASE_URL}/users/${login}`;

  try {
    const rawUser = await httpClient(url, { signal });

    // Pasamos el usuario individual por el Adaptador
    return userAdapter(rawUser);
    
  } catch (error) {
    console.error(`Service: Falló la búsqueda del usuario ${login}:`, error);

    if (error instanceof ApiError) throw error;
    if (error instanceof ZodError) {
      throw new ApiError(`Error de Validación de Datos: ${error.message}`, 422);
    }
    
    throw error;
  }
};


