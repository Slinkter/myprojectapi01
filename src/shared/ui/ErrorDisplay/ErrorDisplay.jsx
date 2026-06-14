import PropTypes from "prop-types";
import { motion } from "motion/react";
import { AlertTriangle, Clock, Key, RefreshCw } from "lucide-react";
import { cn } from "@/shared/lib/utils/utils";
import { TAILWIND_STYLE_TOKENS } from "@/shared";

/**
 * @file ErrorDisplay.jsx
 * @description Renders diagnostic messages, standard connection errors, or rate-limiting (403) warning panels.
 */

/**
 * RateLimitPane sub-component.
 * Displays information related to GitHub API rate limits, diagnostics, and retry guidelines.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.message - Descriptive error message.
 * @param {Function} props.onRetry - Retry query action callback.
 * @returns {JSX.Element} Rate limit error page element.
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
 * ErrorDisplay component.
 * Displays styled alerts or delegates to specialized RateLimitPane on HTTP 403 blocks.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.message - Descriptive error message.
 * @param {number} [props.status] - Optional HTTP status code from network response.
 * @param {Function} props.onRetry - Action handler to retrigger query executions.
 * @returns {JSX.Element} Error notification viewport.
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
