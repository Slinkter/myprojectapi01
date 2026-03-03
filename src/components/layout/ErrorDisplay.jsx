/**
 * @file Error Display Component
 * @description
 * Error state component that displays error messages with retry functionality.
 */

import PropTypes from "prop-types";

/**
 * Error Display Component
 *
 * @component
 * @description
 * Displays error messages in a centered layout with a retry button.
 * Used when API requests fail or other errors occur.
 *
 * @param {Object} props - Component props
 * @param {string} props.message - Error message to display
 * @param {Function} props.onRetry - Callback function to retry the failed operation
 *
 * @returns {JSX.Element} Error message with retry button
 *
 * @example
 * <ErrorDisplay
 *   message="Failed to fetch users"
 *   onRetry={handleRetry}
 * />
 */
const ErrorDisplay = ({ message, onRetry }) => (
  <div className="min-h-dvh flex flex-col justify-center items-center text-center p-8 gap-4">
    <h3 className="text-center text-3xl text-red-500 font-heading">
      {message}
    </h3>
    <button
      onClick={onRetry}
      className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 outline-none text-white rounded-lg transition-colors duration-200 cursor-pointer"
    >
      Reintentar
    </button>
  </div>
);

/**
 * PropTypes validation
 */
ErrorDisplay.propTypes = {
  message: PropTypes.string.isRequired,
  onRetry: PropTypes.func.isRequired,
};

export default ErrorDisplay;
