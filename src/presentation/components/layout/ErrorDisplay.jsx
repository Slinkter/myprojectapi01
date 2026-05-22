import PropTypes from "prop-types";
import { motion } from "motion/react";
import { AlertTriangle, Clock, Key, RefreshCw } from "lucide-react";

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
      <div className="md:col-span-2 p-7 glass-card flex flex-col justify-between gap-5">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent-soft flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-accent" aria-hidden="true" />
            </div>
            <span className="badge text-accent text-[9px]">
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

          <div className="font-mono text-[11px] text-left p-4 rounded-xl glass space-y-1.5 text-text-mute select-text leading-normal">
            <div className="flex justify-between pb-1 mb-1 font-medium text-text">
              <span>DIAGNÓSTICO</span>
              <span className="text-[10px]">● PAUSADO</span>
            </div>
            <div className="grid grid-cols-[90px_1fr] gap-x-2">
              <span className="opacity-60">ERROR</span>
              <span>RATE_LIMIT_403</span>
            </div>
            <div className="grid grid-cols-[90px_1fr] gap-x-2">
              <span className="opacity-60">LÍMITE</span>
              <span>60/hora</span>
            </div>
            <div className="grid grid-cols-[90px_1fr] gap-x-2">
              <span className="opacity-60">ACCIÓN</span>
              <span className="text-accent">ESPERAR O REINTENTAR</span>
            </div>
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onRetry}
          className="btn-glass border-accent/20 text-accent hover:bg-accent/10 hover:border-accent self-start"
          aria-label="Reintentar conexión"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Reintentar
        </motion.button>
      </div>

      <div className="p-7 glass-card flex flex-col justify-between gap-5">
        <div className="space-y-3">
          <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-text-mute">
            <Clock className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <h4 className="text-sm font-heading font-bold text-text mb-1">
              En espera
            </h4>
            <p className="text-xs text-text-mute leading-relaxed">
              Las cuotas se reinician cada <span className="text-accent font-medium">60 minutos</span>.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2 pt-3 border-t border-border">
          <Key className="w-3.5 h-3.5 text-text-mute shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-[11px] text-text-mute leading-relaxed">
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

const ErrorDisplay = ({ message, status, onRetry }) => {
  if (status === 403) {
    return <RateLimitPane message={message} onRetry={onRetry} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col justify-center items-center text-center p-12 gap-6 glass-card max-w-lg mx-auto mt-10"
      role="alert"
      aria-live="assertive"
    >
      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-text-mute">
        <AlertTriangle className="w-6 h-6" />
      </div>

      <div className="space-y-2">
        <span className="badge text-text-mute text-[9px]">
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
        className="btn-glass"
        aria-label="Reintentar"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        Reintentar
      </motion.button>
    </motion.div>
  );
};

ErrorDisplay.propTypes = {
  message: PropTypes.string.isRequired,
  status: PropTypes.number,
  onRetry: PropTypes.func.isRequired,
};

ErrorDisplay.defaultProps = {
  status: null,
};

export default ErrorDisplay;
