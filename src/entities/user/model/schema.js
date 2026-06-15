/**
 * @file schema.js
 * @description
 * Definiciones de esquemas para validación en tiempo de ejecución (Runtime Validation) e 
 * inferencia de tipos estáticos utilizando la librería Zod.
 */

import { z } from "zod";

/**
 * 🎓 CONCEPTO JUNIOR: Zod Schema Validation
 * En JavaScript nativo, si una API nos responde sin el campo `avatar_url`, la app explotará más adelante
 * cuando intentemos hacer `<img src={user.avatar_url} />`. TypeScript no previene esto porque solo revisa 
 * el código antes de compilarlo, no sabe qué enviará la API real.
 * 
 * Zod resuelve esto siendo un "Guardián de Frontera". Si el JSON que llega de Github no cuadra EXACTAMENTE 
 * con este esquema (por ejemplo, si 'login' viene como número en vez de string), Zod lanza un error ANTES 
 * de que la data corrupta entre a nuestros componentes visuales.
 * 
 * Esquema Zod para los datos crudos de GitHub.
 * Valida la estructura exactamente como se espera que venga del servidor externo.
 */
export const GitHubUserSchema = z.object({
  id: z.number(),
  login: z.string(),
  avatar_url: z.string().url(), // .url() no solo revisa que sea un texto, sino que tenga formato HTTP/S válido.
  html_url: z.string().url(),
  type: z.string().default("User"),
  name: z.string().nullable().optional(), // nullable() acepta null, optional() acepta undefined.
  bio: z.string().nullable().optional(),
  public_repos: z.number().optional().default(0), // Si no viene, le pone 0 en vez de dejarlo indefinido.
  followers: z.number().optional().default(0),
  following: z.number().optional().default(0),
  public_gists: z.number().optional().default(0),
  location: z.string().nullable().optional(),
  blog: z.string().nullable().optional(),
});

/**
 * @typedef {z.infer<typeof GitHubUserSchema>} RawGitHubUser
 */

/**
 * Modelo de Usuario Estándar (Dominio Interno)
 * Este es el contrato final que los componentes de UI (React) esperan recibir.
 * 
 * @typedef {Object} UserProfile
 * @property {number} id - Identificador único de base de datos.
 * @property {string} username - Nombre de usuario (alias/handle).
 * @property {string} name - Nombre real (o alias si no proporcionó nombre).
 * @property {string} photo - URL a la imagen de perfil.
 * @property {string} profileUrl - Enlace hacia el perfil en github.com.
 * @property {string} type - 'User' para personas normales, 'Organization' para empresas.
 * @property {string} bio - Biografía del usuario.
 * @property {number} repos - Cantidad de repositorios públicos.
 * @property {number} followers - Cantidad de seguidores.
 * @property {number} following - Cantidad de usuarios seguidos.
 * @property {number} gists - Cantidad de gists públicos.
 * @property {string} location - Ciudad o país.
 * @property {string} website - Enlace web o blog personal.
 * @property {string} origin - Fuente de los datos (en este caso siempre es "github").
 */
