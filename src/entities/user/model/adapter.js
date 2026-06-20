/**
 * @file adapter.js
 * @description Módulo adaptador de datos que implementa el Patrón Adapter (GoF).
 * Normaliza las respuestas crudas de la API externa (GitHub) hacia modelos de dominio interno estándar,
 * aplicando estricta validación de esquemas en tiempo de ejecución mediante Zod.
 */

import { GitHubUserSchema } from "@/entities/user/model/schema";
import { log } from "@/shared";

/**
 * Representa el perfil normalizado de un usuario.
 * @typedef {import('@/entities/user/model/schema').UserProfile} UserProfile
 */

/**
 * Transforma los datos crudos de la API de usuarios de GitHub en un modelo de dominio normalizado.
 * Realiza validación en tiempo de ejecución utilizando los esquemas de Zod para prevenir 
 * que datos malformados de la API rompan la aplicación.
 *
 * @complexity
 * - Tiempo: O(1) - Mapeo de propiedades y parseo de esquema en tiempo constante.
 * - Espacio: O(1) - Espacio de memoria auxiliar constante.
 * 
 * @function userAdapter
 * @param {Object} rawUser - Representación de objeto sin confianza proveniente de la API de GitHub.
 * @throws {import('zod').ZodError} Lanza un error si el objeto 'rawUser' viola las reglas del esquema de Zod (ej. faltan propiedades requeridas).
 * @returns {UserProfile} Objeto de perfil de usuario estandarizado y validado.
 * 
 * @example
 * ```typescript
 * try {
 *   const apiResponse = await fetchGitHubUser('octocat');
 *   const validUser = userAdapter(apiResponse);
 *   console.log(validUser.name);
 * } catch (error) {
 *   console.error("Los datos de la API cambiaron o son inválidos", error);
 * }
 * ```
 */
export const userAdapter = (rawUser) => {
  const timerLabel = `userAdapter_Zod:${rawUser?.login || "unknown"}`;
  log.time(timerLabel);
  log.flow(`🧪 [PASO 9: Adapter] Validando y normalizando datos de GitHub con Zod...`);

  // 1. Validación en tiempo de ejecución con Zod.
  // Si rawUser no cumple la estructura, GitHubUserSchema lanzará un ZodError,
  // evitando que datos corruptos lleguen a la capa de UI.
  const data = GitHubUserSchema.parse(rawUser);

  // 2. Normalización de datos (Traducción de contrato API -> Dominio Interno)
  const result = {
    id: data.id,
    username: data.login,
    name: data.name || data.login, // Fallback al username si no hay nombre real
    photo: data.avatar_url,
    profileUrl: data.html_url,
    type: data.type,
    bio: data.bio || "",
    repos: data.public_repos,
    followers: data.followers,
    following: data.following,
    gists: data.public_gists,
    location: data.location || "",
    website: data.blog || "",
    origin: "github",
  };

  log.timeEnd(timerLabel, "Validación y normalización Zod completada");
  return result;
};

/**
 * Transforma una colección completa de objetos crudos de usuarios de GitHub.
 * Mapea los elementos individuales secuencialmente a través del `userAdapter`.
 * 
 * @complexity
 * - Tiempo: O(N) - Tiempo lineal proporcional al tamaño de la colección.
 * - Espacio: O(N) - Espacio de memoria lineal utilizado para almacenar la nueva colección mapeada.
 * 
 * @function usersCollectionAdapter
 * @param {Array<Object>} [rawUsersList=[]] - Arreglo que contiene elementos de usuario sin parsear.
 * @returns {Array<UserProfile>} Colección de perfiles de usuario normalizados.
 * 
 * @example
 * ```typescript
 * const validUsers = usersCollectionAdapter(apiResponseArray);
 * ```
 */
export const usersCollectionAdapter = (rawUsersList = []) => {
  return rawUsersList.map(userAdapter);
};
