/**
 * @file userService.js
 * @description Módulo de la capa de servicios para manejar la comunicación con la API REST de GitHub.
 * Actúa como intermediario: Integra `httpClient`, gestiona errores personalizados, atrapa fallos de validación,
 * y normaliza las respuestas a través de los adaptadores de datos (FSD: capa Entities/Shared).
 */

import {
  usersCollectionAdapter,
  userAdapter,
} from "@/entities/user/model/adapter";
import { API_BASE_URL } from "@/shared/config/config";
import { httpClient } from "@/shared/api/httpClient";
import { ApiError } from "@/shared/api/ApiError";
import { log } from "@/shared";
import { ZodError } from "zod";

/** 
 * @typedef {import('@/entities/user/model/schema').UserProfile} UserProfile 
 */

/**
 * Obtiene y busca colecciones de usuarios en GitHub.
 * Construye la URL dinámicamente: Si hay un término de búsqueda, consulta el endpoint de búsqueda;
 * si está vacío, consulta el endpoint de listado general de usuarios (fallback).
 *
 * @async
 * @function fetchUsersAPI
 * @param {string} [searchTerm=""] - Término utilizado para filtrar usuarios en GitHub.
 * @param {AbortSignal} [signal] - Señal de aborto opcional para cancelar la petición fetch si el usuario cambia de página.
 * @throws {ApiError} Lanza un ApiError si la petición HTTP falla, o si la validación del esquema (Zod) falla (código 422).
 * @returns {Promise<UserProfile[]>} Promesa que resuelve en una colección de perfiles de usuario estandarizados.
 * 
 * @example
 * ```typescript
 * const users = await fetchUsersAPI("slinkter");
 * console.log(users[0].name);
 * ```
 */
export const fetchUsersAPI = async (searchTerm = "", signal) => {
  log.flow(`🔌 [PASO 8: Service] Llamando a la API de GitHub para búsqueda: "${searchTerm}"`);

  // 1. Construcción dinámica de la URL según la presencia de un parámetro de búsqueda.
  const url = searchTerm
    ? `${API_BASE_URL}/search/users?q=${encodeURIComponent(searchTerm)}`
    : `${API_BASE_URL}/users`;

  try {
    const data = await httpClient(url, { signal });
    
    // 2. Normalización estructural cruda:
    // El endpoint de /search/users envuelve los resultados en una propiedad 'items'.
    // El endpoint de /users devuelve un arreglo directo. 
    // Esta lógica nivela esa diferencia antes de enviarlo al adaptador de dominio.
    const rawUsers = searchTerm ? data.items : data;

    // 3. Normalización al Modelo de Dominio e inyección de Type Safety.
    return usersCollectionAdapter(rawUsers);
  } catch (error) {
    console.error("Service: fetchUsersAPI falló su ejecución:", error);

    // Si el error ya es de la red (ApiError), lo lanzamos intacto.
    if (error instanceof ApiError) throw error;
    
    // Si la adaptación falló por reglas de esquema rotas, lo convertimos en un ApiError(422 Unprocessable Entity)
    if (error instanceof ZodError) {
      throw new ApiError(`Error de Validación de Datos: ${error.message}`, 422);
    }

    throw error;
  }
};

/**
 * Obtiene los detalles de perfil individual de un usuario en GitHub.
 *
 * @async
 * @function fetchUserDetailAPI
 * @param {string} login - Nombre de usuario (handle) del objetivo en GitHub.
 * @param {AbortSignal} [signal] - Señal de aborto opcional para cancelación de la petición.
 * @throws {ApiError} Lanza ApiError por fallos de red o si el esquema de validación no coincide.
 * @returns {Promise<UserProfile>} Promesa que resuelve en un único perfil de usuario normalizado.
 * 
 * @example
 * ```typescript
 * const user = await fetchUserDetailAPI("octocat");
 * console.log(user.repos);
 * ```
 */
export const fetchUserDetailAPI = async (login, signal) => {
  log.flow(`🔌 [PASO 8: Service] Llamando a la API de GitHub para detalles: "${login}"`);

  // Requisito estricto: login no puede estar vacío
  const url = `${API_BASE_URL}/users/${login}`;

  try {
    const rawUser = await httpClient(url, { signal });

    // Pasa el objeto crudo por el validador Zod y lo transforma al modelo interno.
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
