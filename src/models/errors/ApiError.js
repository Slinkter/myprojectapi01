/**
 * Custom error class for API-related errors
 *
 * @class ApiError
 * @extends Error
 * @description
 * Provides structured error information including HTTP status codes.
 * Used to differentiate API errors from generic JavaScript errors.
 *
 * @property {string} message - Error message
 * @property {number} status - HTTP status code
 * @property {string} name - Error name (always "ApiError")
 *
 * @example
 * throw new ApiError('Not Found', 404);
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
