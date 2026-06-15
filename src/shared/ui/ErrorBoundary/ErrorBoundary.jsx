/**
 * @file ErrorBoundary.jsx
 * @description Componente estándar de React para capturar errores de JavaScript (Sintaxis o Excepciones de Runtime)
 * que se lancen en cualquier parte de su árbol de componentes hijos.
 * Previene que la aplicación entera colapse con una "pantalla blanca de la muerte" y, en su lugar, renderiza una interfaz de repuesto.
 */

import React from "react";
import PropTypes from "prop-types";
import { log } from "@/shared/logger/logger";

/**
 * 🎓 CONCEPTO JUNIOR: Class Components (Componentes de Clase)
 * En React moderno, casi todo el código se escribe usando Componentes Funcionales (Functions) y Hooks (useState, useEffect).
 * Sin embargo, los **Error Boundaries son la única excepción** en React que todavía requiere obligatoriamente una sintaxis de Clase.
 * Esto se debe a que Hooks como `useEffect` no tienen un equivalente exacto a los ciclos de vida `componentDidCatch` y `getDerivedStateFromError`.
 *
 * @class ErrorBoundary
 * @extends React.Component
 */
class ErrorBoundary extends React.Component {
  /**
   * Inicializa el estado del componente interceptor.
   *
   * @param {Object} props - React props (como { children }).
   */
  constructor(props) {
    super(props);
    // Este estado determinará si dibujamos los `children` (camino feliz) o la UI de error.
    this.state = { hasError: false, error: null };
  }

  /**
   * Ciclo de vida estático. Si un componente hijo explota, React llamará a este método automáticamente
   * antes de volver a dibujar. Lo que retorne esto será el nuevo `this.state`.
   *
   * @static
   * @param {Error} error - Objeto con los detalles de la excepción capturada.
   * @returns {Object} Parámetros de estado para activar la UI de repuesto.
   */
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  /**
   * Ciclo de vida (Side Effect). Se ejecuta después de atrapar un error.
   * Usado para enviar métricas de fallos a sistemas de monitorización (Sentry, Datadog) o registrar en consola.
   *
   * @param {Error} error - La excepción capturada.
   * @param {React.ErrorInfo} errorInfo - Stack trace con la ruta del componente exacto que explotó.
   */
  componentDidCatch(error, errorInfo) {
    log.redux("CRITICAL ERROR CAPTURED BY BOUNDARY", { error, errorInfo });
  }

  render() {
    // Si se activó la bandera hasError, el camino feliz queda bloqueado y mostramos la UI de emergencia.
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

    // 🎓 CONCEPTO JUNIOR: props.children
    // `this.props.children` es una prop reservada especial que representa "lo que sea que pongan dentro de la etiqueta".
    // Ejemplo: <ErrorBoundary> <Mipagina /> </ErrorBoundary>. En este caso children es <Mipagina />.
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

ErrorBoundary.displayName = "ErrorBoundary";

export default ErrorBoundary;
