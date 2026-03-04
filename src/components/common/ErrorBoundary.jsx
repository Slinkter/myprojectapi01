import React from "react";
import PropTypes from "prop-types";
import { log } from "@/app/logger";

/**
 * ErrorBoundary Component
 * Captures JavaScript errors anywhere in their child component tree.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    log.redux("CRITICAL ERROR CAPTURED BY BOUNDARY", { error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="p-10 text-center bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-3xl my-10">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
            ¡Ops! Algo salió mal.
          </h2>
          <p className="text-red-500/80 dark:text-red-400/60 mb-6">
            Ha ocurrido un error inesperado en la interfaz.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors"
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

export default ErrorBoundary;
