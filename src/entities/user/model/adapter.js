/**
 * @file adapter.js
 * @description Implementación del patrón de diseño estructural Adapter para normalizar
 * los perfiles y organizaciones descargados de la API de GitHub al modelo interno de la aplicación.
 */

import { GitHubUserSchema } from "@/entities/user/model/schema";

/**
 * @typedef {Object} UserProfile
 * @property {number} id - Identificador único de la cuenta.
 * @property {string} username - Nombre de usuario único (handle).
 * @property {string} name - Nombre descriptivo o de exhibición del usuario.
 * @property {string} photo - URL de la imagen de perfil.
 * @property {string} profileUrl - Enlace directo al perfil en github.com.
 * @property {string} type - Tipo de cuenta (User o Organization).
 * @property {string} bio - Biografía del perfil.
 * @property {number} repos - Conteo total de repositorios públicos.
 * @property {number} followers - Conteo de seguidores.
 * @property {number} following - Conteo de usuarios seguidos.
 * @property {number} gists - Conteo de gists públicos.
 * @property {string} location - Ubicación geográfica.
 * @property {string} website - Enlace al blog o sitio personal.
 * @property {string} origin - Origen de la procedencia de los datos (ej. "github").
 */

/**
 * 🎓 CONCEPTO JUNIOR: Patrón Adapter (Adaptador)
 * El patrón Adapter convierte una estructura de datos externa (como el JSON de la API de GitHub que usa snake_case) 
 * en una estructura interna limpia en camelCase. Si en el futuro GitHub decide cambiar 'avatar_url' por 'photo_path', 
 * solo modificamos este adaptador y ningún componente de la UI se romperá.
 */

/**
 * Adapta una colección cruda de perfiles descargados de la API.
 * 
 * @function usersCollectionAdapter
 * @param {Array<Object>} [rawUsersList=[]] - Listado crudo recibido del payload de la API.
 * @returns {UserProfile[]} Listado normalizado de perfiles de usuario.
 * 
 * @example
 * ```javascript
 * const users = usersCollectionAdapter(response.data.items);
 * ```
 */
export const usersCollectionAdapter = (rawUsersList = []) => {
  const result = rawUsersList.map(userAdapter);
  return result;
};

/**
 * Adapta y valida un único perfil crudo de GitHub.
 * Valida los tipos mediante Zod y provee valores de contingencia (fallbacks).
 * 
 * @function userAdapter
 * @param {Object} rawUser - Payload de datos del perfil crudo.
 * @returns {UserProfile} Perfil normalizado conforme al esquema del dominio.
 * @throws {z.ZodError} Si la estructura del payload no cumple con las reglas del esquema.
 */
export const userAdapter = (rawUser) => {
  const data = GitHubUserSchema.parse(rawUser);

  return {
    id: data.id,
    username: data.login,
    name: data.name || data.login,
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
};
