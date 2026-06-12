import { GitHubUserSchema } from "@/entities/user/model/schema";

/**
 * @file userAdapter.js
 * @description
 * 📚 EXPLICACIÓN PARA JUNIORS: EL PATRÓN ADAPTER (ADAPTADOR)
 * Imagina que vas de viaje a otro país y el enchufe de la pared es diferente.
 * Necesitas un "Adaptador" para conectar tu cargador.
 * 
 * Aquí pasa lo mismo: La API de GitHub nos envía un objeto desordenado con
 * propiedades como `avatar_url` o `html_url`. Pero nuestra aplicación prefiere
 * nombres más claros como `photo` o `profileUrl`.
 * 
 * Este archivo es nuestro enchufe. Toma los datos crudos de GitHub, verifica
 * que sean correctos (usando Zod) y los traduce al formato que le gusta a nuestra app.
 */

/** @typedef {import('@/entities/user/model/schema').UserProfile} UserProfile */

/**
 * Convierte un usuario crudo de GitHub en un usuario limpio para la App.
 *
 * @complexity
 * - Time: O(1) - Constant time to validate and map a single user object.
 * - Space: O(1) - Constant auxiliary space used for properties.
 * 
 * @param {Object} rawUser - Los datos crudos (sin procesar) que nos manda la API de GitHub.
 * @returns {UserProfile} El perfil de usuario limpio y estandarizado.
 */
export const userAdapter = (rawUser) => {
  // 1. VALIDACIÓN (SEGURIDAD PRIMERO)
  // Usamos 'Zod' como un guardia de seguridad. Le decimos: "Oye, asegúrate de que
  // 'rawUser' traiga lo que esperamos (un string en login, un número en id, etc)".
  // Si falta algo o viene mal, Zod lanzará un error y detendrá todo.
  const data = GitHubUserSchema.parse(rawUser);

  // 2. TRANSFORMACIÓN (EL ADAPTADOR)
  // Aquí traducimos el idioma de GitHub al idioma de nuestra aplicación.
  return {
    id: data.id,
    username: data.login,       // GitHub lo llama 'login', nosotros 'username'
    name: data.name || data.login,
    photo: data.avatar_url,     // GitHub lo llama 'avatar_url', nosotros 'photo'
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

/**
 * Si GitHub nos manda una lista de 30 usuarios, usamos esta función para
 * pasar los 30 usuarios por el adaptador uno por uno de forma automática.
 * 
 * @complexity
 * - Time: O(N) - Linear time relative to the number of users in the list.
 * - Space: O(N) - Linear space to store the mapped array.
 * 
 * @param {Array<Object>} rawUsersList - Lista de usuarios crudos.
 * @returns {Array<UserProfile>} Lista de usuarios limpios.
 */
export const usersCollectionAdapter = (rawUsersList = []) => {
  return rawUsersList.map(userAdapter);
};

