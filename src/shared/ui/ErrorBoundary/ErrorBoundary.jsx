

import React from "react";
import PropTypes from "prop-types";



class ErrorBoundary extends React.Component {
  
  constructor(props) {
    super(props);
    

    this.state = { hasError: false, error: null };
  }

  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  
  componentDidCatch(error, errorInfo) {
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
