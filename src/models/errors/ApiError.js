/**
 * Clase de error personalizada para errores relacionados con la API
 *
 * @class ApiError
 * @extends Error
 * @description
 * Provee información estructurada del error, incluyendo códigos de estado HTTP.
 * Se utiliza para diferenciar errores de API de los errores genéricos de JavaScript.
 *
 * @property {string} message - Mensaje de error
 * @property {number} status - Código de estado HTTP
 * @property {string} name - Nombre del error (siempre "ApiError")
 *
 * @example
 * throw new ApiError('No encontrado', 404);
 */
export class ApiError extends Error {
  /**
   * Creates an ApiError instance
   *
   * @param {string} message - Error message
   * @param {number} status - HTTP status code
   */
  constructor(message, status = 500) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}
