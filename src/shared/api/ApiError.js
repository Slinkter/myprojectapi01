/**
 * @file ApiError.js
 * @description Clase de error personalizada que extiende del objeto `Error` nativo de JavaScript.
 * Es crucial para diferenciar un "Fallo de nuestra aplicación" de un "Fallo de la API".
 */

/**
 * 🎓 CONCEPTO JUNIOR: Herencia de Clases en JavaScript
 * En JavaScript, usamos `class X extends Y` para crear una clase hija. 
 * Nuestra clase hija hereda todas las habilidades de la clase padre (`Error`), pero le podemos añadir "superpoderes" nuevos.
 * ¿Por qué no usamos simplemente `throw new Error()`?
 * Porque el Error genérico no tiene una propiedad `status` (como 404 o 500). Al crear una clase personalizada, 
 * podemos pasar ese número y leerlo luego en el frontend para mostrar un mensaje distinto ("No encontrado" vs "Servidor caído").
 *
 * @class ApiError
 * @extends {Error}
 * 
 * @property {string} message - Descripción en texto del error (Heredado de la clase base Error).
 * @property {number} status - Código de estado HTTP que nos devolvió el servidor (Ej: 404, 500).
 * @property {string} name - Nombre identificador único. Esto permite verificar el tipo de error usando `error instanceof ApiError`.
 *
 * @example
 * ```typescript
 * // En lugar de esto:
 * // throw new Error("Fallo");
 * 
 * // Hacemos esto:
 * throw new ApiError("El usuario de Github no existe", 404);
 * 
 * // Y luego en el try/catch lo identificamos:
 * if (error instanceof ApiError) {
 *   if (error.status === 404) showNotFoundPage();
 * }
 * ```
 */
export class ApiError extends Error {
  /**
   * Construye una nueva instancia de ApiError.
   *
   * @param {string} message - El mensaje descriptivo del error que verá el desarrollador en la consola.
   * @param {number} [status=500] - El código HTTP del error. Por defecto es 500 (Internal Server Error) si no se provee ninguno.
   */
  constructor(message, status = 500) {
    // 🎓 CONCEPTO JUNIOR: super()
    // Cuando heredas de otra clase, estás OBLIGADO a llamar a super() antes de usar `this`.
    // super() manda a llamar al constructor de la clase Padre (Error en este caso), pasándole el mensaje
    // para que inicialice el error correctamente y capture la traza (StackTrace).
    super(message);
    
    // Ahora sí, guardamos nuestras variables personalizadas en la instancia actual (`this`).
    this.status = status;
    this.name = "ApiError";
  }
}
