/**
 * @file ApiError.js
 * @description Custom error class representing API communication failures.
 * Adds HTTP status codes and custom names for precise error classification.
 */

/**
 * Custom API Error class extending native Error.
 *
 * @class ApiError
 * @extends Error
 *
 * @property {string} message - Human-readable error description.
 * @property {number} status - HTTP status code.
 * @property {string} name - Error name identifier (always "ApiError").
 *
 * @example
 * throw new ApiError("Resource not found", 404);
 */
export class ApiError extends Error {
  /**
   * Instantiates an ApiError.
   *
   * @param {string} message - Error description.
   * @param {number} [status=500] - HTTP status code.
   */
  constructor(message, status = 500) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}
