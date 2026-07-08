/**
 * @file schema.js
 * @description Definición de esquemas de validación de datos en runtime para estructurar
 * de forma segura los payloads recibidos de la API externa de GitHub.
 */

import { z } from "zod";

/**
 * 🎓 CONCEPTO JUNIOR: Validación en Tiempo de Ejecución (Runtime Schema Validation)
 * Normalmente TypeScript nos avisa de errores de tipo al programar, pero desaparece en producción. 
 * Si la API de GitHub cambia silenciosamente (ej: cambia un campo de número a texto), la app podría fallar.
 * Zod valida los datos reales del JSON en tiempo de ejecución. Si algo falla, lanza un error controlado 
 * en vez de romper la interfaz de forma imprevista.
 */

/**
 * Esquema de validación y estructura esperada para las cuentas de usuario y organización de GitHub.
 * Utiliza coerciones y valores por defecto para tolerar campos no devueltos en la búsqueda general.
 * 
 * @constant GitHubUserSchema
 * @type {z.ZodObject}
 */
export const GitHubUserSchema = z.object({
  id: z.number(),
  login: z.string(),
  avatar_url: z.string().url(),
  html_url: z.string().url(),
  type: z.string().default("User"),
  name: z.string().nullable().optional(),
  bio: z.string().nullable().optional(),
  public_repos: z.number().optional().default(0),
  followers: z.number().optional().default(0),
  following: z.number().optional().default(0),
  public_gists: z.number().optional().default(0),
  location: z.string().nullable().optional(),
  blog: z.string().nullable().optional(),
});
