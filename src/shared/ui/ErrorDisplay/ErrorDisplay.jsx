/**
 * @file ErrorDisplay.jsx
 * @description Renderiza mensajes de diagnóstico o fallos de red dentro de la aplicación.
 * Posee un submódulo súper especializado (`RateLimitPane`) para mostrar detalles técnicos cuando 
 * la API de GitHub nos bloquea por exceso de tráfico (Código HTTP 403).
 */

import PropTypes from "prop-types";
import { motion } from "motion/react";
import { AlertTriangle, Clock, Key, RefreshCw } from "lucide-react";
import { cn } from "@/shared/lib/utils/utils";
import { TAILWIND_STYLE_TOKENS } from "@/shared";

/**
 * 🎓 CONCEPTO JUNIOR: Sub-Componentes Privados vs Públicos
 * `RateLimitPane` es un componente de React válido, pero no tiene `export` al inicio de la línea.
 * Esto significa que solo `ErrorDisplay` (quien sí es exportado) sabe de su existencia y puede usarlo.
 * Es un excelente patrón para dividir UIs complejas sin ensuciar la carpeta de módulos compartidos de la app.
 *
 * Sub-componente `RateLimitPane`. 
 * Muestra información relacionada a los límites de API, diagnósticos del sistema y directrices de espera.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.message - Mensaje técnico devuelto por la API.
 * @param {Function} props.onRetry - Función disparadora (Event Handler) para reintentar la búsqueda.
 * @returns {JSX.Element} Panel interactivo de error de límite de velocidad.
 */
const RateLimitPane = ({ message, onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-3xl mx-auto mt-10"
      role="alert"
      aria-live="assertive"
    >
      {/* 
        🎓 CONCEPTO JUNIOR: Utility Functions para Clases
        `cn` toma nuestra constante de diseño 'tailwind-card' (definida en el archivo theme.js) y la fusiona
        sin conflictos con las otras clases adicionales requeridas solo para esta vista (`md:col-span-2...`).
      */}
      <div className={cn(TAILWIND_STYLE_TOKENS.card, "md:col-span-2 p-7 flex flex-col justify-between gap-5")}>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent-soft flex items-center justify-center border border-accent/10">
              <AlertTriangle className="w-5 h-5 text-accent" aria-hidden="true" />
            </div>
            <span className={cn(TAILWIND_STYLE_TOKENS.badge, "text-[9px] font-bold")}>
              STATUS: 403
            </span>
          </div>

          <div>
            <h3 className="text-lg font-heading font-bold text-text mb-1">
              Límite de API alcanzado
            </h3>
            <p className="text-sm text-text-mute leading-relaxed">
              {message || "Se alcanzó el límite de 60 requests/hora de la API de GitHub."}
            </p>
          </div>

          <div className="font-mono text-[11px] text-left p-4 border border-border bg-bg rounded-xl space-y-1.5 text-text-mute select-text leading-normal">
            <div className="flex justify-between pb-1.5 mb-1 font-bold text-text border-b border-border">
              <span>DIAGNÓSTICO</span>
              <span className="text-[10px] text-accent">● PAUSADO</span>
            </div>
            <div className="grid grid-cols-[90px_1fr] gap-x-2">
              <span className="opacity-60">ERROR:</span>
              <span>RATE_LIMIT_403</span>
            </div>
            <div className="grid grid-cols-[90px_1fr] gap-x-2">
              <span className="opacity-60">LÍMITE:</span>
              <span>60/hora</span>
            </div>
            <div className="grid grid-cols-[90px_1fr] gap-x-2">
              <span className="opacity-60">ACCIÓN:</span>
              <span className="text-accent font-semibold">ESPERAR O REINTENTAR</span>
            </div>
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onRetry}
          className={cn(TAILWIND_STYLE_TOKENS.button, "self-start text-xs")}
          aria-label="Reintentar conexión"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reintentar</span>
        </motion.button>
      </div>

      <div className={cn(TAILWIND_STYLE_TOKENS.card, "p-7 flex flex-col justify-between gap-5")}>
        <div className="space-y-3">
          <div className="w-10 h-10 rounded-xl bg-bg border border-border flex items-center justify-center text-text-mute">
            <Clock className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <h4 className="text-sm font-heading font-bold text-text mb-1">
              En espera
            </h4>
            <p className="text-xs text-text-mute leading-relaxed">
              Las cuotas se reinician cada <span className="text-accent font-semibold">60 minutos</span>.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2 pt-3 border-t border-border">
          <Key className="w-3.5 h-3.5 text-text-mute shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-[10px] text-text-mute leading-relaxed font-mono">
            Límites anónimos por IP aplicados por GitHub.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

RateLimitPane.propTypes = {
  message: PropTypes.string,
  onRetry: PropTypes.func.isRequired,
};

RateLimitPane.displayName = "RateLimitPane";

/**
 * 🎓 CONCEPTO JUNIOR: Early Returns (Retornos Tempranos) y Patrón Estrategia
 * Si el servidor devuelve un 403, este componente inmediatamente renderiza `<RateLimitPane />` y **aborta** 
 * el resto del flujo. Si es otro error (ej: 404 No Encontrado, 500 Falla del Servidor), el `if` se salta 
 * y React procesa el HTML "por defecto" (el modal pequeño general).
 * 
 * Componente principal `ErrorDisplay`.
 * Delega la UI a paneles de error hiperespecializados dependiendo del `status` HTTP en la red.
 *
 * @component
 * @param {Object} props - Propiedades inyectadas por el componente que falló.
 * @param {string} props.message - Texto descriptivo del error a renderizar.
 * @param {number} [props.status] - Opcional. Código de Estado HTTP (ej: 403, 404, 500).
 * @param {Function} props.onRetry - Función (Callback) que React ejecutará al darle click al botón reintentar.
 * @returns {JSX.Element} Panel de notificación de error amigable al usuario.
 */
const ErrorDisplay = ({ message, status, onRetry }) => {
  if (status === 403) {
    return <RateLimitPane message={message} onRetry={onRetry} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        TAILWIND_STYLE_TOKENS.card,
        "flex flex-col justify-center items-center text-center p-12 gap-6 max-w-lg mx-auto mt-10",
      )}
      role="alert"
      aria-live="assertive"
    >
      <div className="w-12 h-12 rounded-xl border border-border bg-bg flex items-center justify-center text-text-mute">
        <AlertTriangle className="w-6 h-6" />
      </div>

      <div className="space-y-2">
        <span className={cn(TAILWIND_STYLE_TOKENS.badge, "text-[9px] font-bold")}>
          STATUS: {status || "ERROR"}
        </span>
        <h3 className="text-lg font-heading font-bold text-text mt-1">
          Error inesperado
        </h3>
        <p className="text-sm text-text-mute leading-relaxed">{message}</p>
      </div>

      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={onRetry}
        className={TAILWIND_STYLE_TOKENS.button}
        aria-label="Reintentar"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        <span>Reintentar</span>
      </motion.button>
    </motion.div>
  );
};

ErrorDisplay.propTypes = {
  message: PropTypes.string.isRequired,
  status: PropTypes.number,
  onRetry: PropTypes.func.isRequired,
};

ErrorDisplay.displayName = "ErrorDisplay";

export default ErrorDisplay;
