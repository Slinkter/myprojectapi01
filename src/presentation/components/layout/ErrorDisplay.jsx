/**
 * @file ErrorDisplay.jsx
 * @description Estado de Error estandarizado y premium utilizando el Sistema de Diseño.
 * Ofrece un diseño tipo Bento Grid con Glassmorphic visual espectacular para errores 403.
 */

import PropTypes from "prop-types";
import { motion } from "motion/react";
import { AlertTriangle, Clock, Key, RefreshCw } from "lucide-react";

/**
 * Componente para renderizar la tarjeta bento del límite de API
 */
const RateLimitBento = ({ message, onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-10"
      role="alert"
      aria-live="assertive"
    >
      {/* Tarjeta Principal: Estado y Alerta (Col-span 2) */}
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
        className="md:col-span-2 p-8 rounded-2xl glass-card-pro border-amber-500/20 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent flex flex-col justify-between gap-8 relative overflow-hidden"
      >
        {/* Glow de fondo */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-500 shadow-lg shadow-amber-500/10 animate-pulse">
              <AlertTriangle className="w-6 h-6" aria-hidden="true" />
            </div>
            <span className="text-xs font-bold tracking-widest text-amber-400 uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              Límite de API Excedido
            </span>
          </div>

          <h3 className="text-3xl font-black text-app-text tracking-tight leading-tight mt-2">
            Hemos tocado el techo de <span className="text-amber-400">GitHub</span>
          </h3>

          <p className="text-app-muted font-medium text-base md:text-lg leading-relaxed">
            {message || "Has realizado demasiadas solicitudes en un corto período de tiempo. La API pública de GitHub tiene un límite estricto para usuarios no autenticados."}
          </p>
        </div>

        <div className="flex items-center gap-4 mt-2">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onRetry}
            className="btn-action !bg-gradient-to-r !from-amber-500 !to-orange-500 !text-white !shadow-amber-500/25 flex items-center gap-2 px-6 py-3 font-semibold rounded-xl hover:shadow-amber-500/40 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            aria-label="Reintentar consulta de usuario"
          >
            <RefreshCw className="w-4 h-4" />
            Reintentar ahora
          </motion.button>
        </div>
      </motion.div>

      {/* Tarjeta Secundaria: Info de Rate Limit (Col-span 1) */}
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
        className="p-8 rounded-2xl glass-card-pro border-orange-500/20 bg-gradient-to-br from-orange-500/10 via-red-500/5 to-transparent flex flex-col justify-between gap-6 relative overflow-hidden"
      >
        <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col gap-3">
          <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-400">
            <Clock className="w-5 h-5" aria-hidden="true" />
          </div>
          <h4 className="text-xl font-extrabold text-app-text mt-2">¿Cuánto debo esperar?</h4>
          <p className="text-sm text-app-muted leading-relaxed">
            GitHub restablece la cuota de peticiones públicas automáticamente **cada 60 minutos**. Puedes tomarte un café y volver en un momento.
          </p>
        </div>

        <div className="border-t border-orange-500/10 pt-4 flex items-center gap-3">
          <Key className="w-5 h-5 text-orange-400 shrink-0" aria-hidden="true" />
          <p className="text-xs text-orange-400/80 font-medium">
            Las peticiones anónimas están limitadas a 60 por hora por dirección IP.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

RateLimitBento.propTypes = {
  message: PropTypes.string,
  onRetry: PropTypes.func.isRequired,
};

/**
 * Componente principal ErrorDisplay
 */
const ErrorDisplay = ({ message, status, onRetry }) => {
  // Si el error es 403 (Rate Limit), mostramos la experiencia bento premium
  if (status === 403) {
    return <RateLimitBento message={message} onRetry={onRetry} />;
  }

  // Si no, mostramos el error estándar pero pulido
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", duration: 0.5 }}
      className="flex flex-col justify-center items-center text-center p-12 gap-6 glass-card-pro border-red-500/20 max-w-2xl mx-auto mt-10 relative overflow-hidden"
      role="alert"
      aria-live="assertive"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500" />
      
      <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 text-3xl font-extrabold shadow-lg shadow-red-500/5 animate-pulse">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <div className="space-y-3">
        <h3 className="text-3xl font-black text-app-text tracking-tight">¡Ops! Algo salió mal</h3>
        <p className="text-red-500/95 font-semibold text-lg max-w-md mx-auto">{message}</p>
      </div>

      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={onRetry}
        className="btn-action !bg-red-500 !shadow-red-500/20 px-6 py-3 font-semibold rounded-xl"
        aria-label="Reintentar cargar datos"
      >
        Intentar de nuevo
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
