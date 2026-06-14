import React from "react";
import PropTypes from "prop-types";
import { log } from "@/shared/logger/logger";

/**
 * @file ErrorBoundary.jsx
 * @description Standard React Error Boundary component capturing JavaScript syntax or runtime errors
 * thrown anywhere inside its child component hierarchy. Prevent app crashes and renders a fallback UI.
 */

/**
 * ErrorBoundary class component.
 *
 * @class ErrorBoundary
 * @extends React.Component
 */
class ErrorBoundary extends React.Component {
  /**
   * Instantiates the boundary.
   *
   * @param {Object} props - React props.
   */
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  /**
   * Derive fallback state after catching an exception.
   *
   * @static
   * @param {Error} error - Thrown error object.
   * @returns {Object} Fallback state parameters.
   */
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  /**
   * Lifecycle hook to log details of the caught exception.
   *
   * @param {Error} error - The caught exception.
   * @param {React.ErrorInfo} errorInfo - Component stack trace information.
   */
  componentDidCatch(error, errorInfo) {
    log.redux("CRITICAL ERROR CAPTURED BY BOUNDARY", { error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-10 text-center bg-app-surface border border-red-500/20 rounded-xl my-10 max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-red-500 mb-2">
            ¡Ops! Algo salió mal.
          </h2>
          <p className="text-app-muted mb-6">
            Ha ocurrido un error inesperado en la interfaz.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 bg-red-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Recargar aplicación
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

ErrorBoundary.displayName = "ErrorBoundary";

export default ErrorBoundary;
