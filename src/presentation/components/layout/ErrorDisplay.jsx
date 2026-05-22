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
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-10"
      role="alert"
      aria-live="assertive"
    >
      {/* Main Card: Status and Diagnostic Details (Col-span 2) */}
      <motion.div
        className="md:col-span-2 p-8 rounded-lg border border-amber-500/20 bg-app-surface shadow-sm flex flex-col justify-between gap-6"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-amber-500/10 flex items-center justify-center text-amber-500">
              <AlertTriangle className="w-5 h-5" aria-hidden="true" />
            </div>
            <span className="tech-badge border-amber-500/30 text-amber-500! dark:text-amber-400!">
              STATUS: 403 / API_LIMIT_EXCEEDED
            </span>
          </div>

          <h3 className="text-2xl font-bold text-app-text tracking-tight leading-tight mt-2">
            GitHub API Threshold Reached
          </h3>

          <p className="text-app-muted text-sm leading-relaxed">
            {message || "The standard unauthenticated API rate limit of 60 requests per hour has been reached. System requests have been paused to prevent connection dropouts."}
          </p>

          {/* Diagnostic Console Printout */}
          <div className="font-mono text-[11px] text-left bg-app-bg/60 border border-app-border p-4 rounded-lg space-y-1 my-2 text-app-muted select-text leading-normal">
            <div className="flex justify-between border-b border-app-border/40 pb-1 mb-1.5 font-semibold text-app-text">
              <span>SYSTEM DIAGNOSTICS REPORT</span>
              <span className="text-amber-500 animate-pulse">● PAUSED</span>
            </div>
            <div className="grid grid-cols-[100px_1fr] gap-x-2">
              <span className="font-semibold text-app-text/70">[SUBSYSTEM]</span>
              <span>GITHUB_EXPLORER_GATEWAY</span>
            </div>
            <div className="grid grid-cols-[100px_1fr] gap-x-2">
              <span className="font-semibold text-app-text/70">[ERROR_TYPE]</span>
              <span>RATE_LIMIT_FORBIDDEN_403</span>
            </div>
            <div className="grid grid-cols-[100px_1fr] gap-x-2">
              <span className="font-semibold text-app-text/70">[LIMIT_MAX]</span>
              <span>60_REQUESTS_PER_HOUR</span>
            </div>
            <div className="grid grid-cols-[100px_1fr] gap-x-2">
              <span className="font-semibold text-app-text/70">[RECOMMEND]</span>
              <span>WAIT_FOR_RESET_OR_RETRY_LATER</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onRetry}
            className="btn-action-gradient !bg-amber-600 dark:!bg-amber-600 hover:!bg-amber-700 font-semibold rounded-lg flex items-center gap-2 px-5 py-2.5"
            aria-label="Retry connection diagnostics"
          >
            <RefreshCw className="w-4 h-4" />
            Retry Connection
          </motion.button>
        </div>
      </motion.div>

      {/* Secondary Card: Rate Limit Info Panel (Col-span 1) */}
      <motion.div
        className="p-8 rounded-lg border border-app-border bg-app-surface shadow-sm flex flex-col justify-between gap-6"
      >
        <div className="flex flex-col gap-3">
          <div className="w-10 h-10 rounded bg-app-bg border border-app-border flex items-center justify-center text-app-muted">
            <Clock className="w-5 h-5" aria-hidden="true" />
          </div>
          <h4 className="text-lg font-bold text-app-text mt-2">Cooldown Period</h4>
          <p className="text-sm text-app-muted leading-relaxed">
            GitHub automatically resets unauthenticated API quotas every <strong>60 minutes</strong>. The system will restore standard operations immediately once the timer expires.
          </p>
        </div>

        <div className="border-t border-app-border pt-4 flex items-start gap-2.5">
          <Key className="w-4 h-4 text-app-muted shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-[11px] text-app-muted leading-normal">
            IP-based anonymous rate limits are enforced upstream by the GitHub REST API architecture.
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
 * Main ErrorDisplay Component
 */
const ErrorDisplay = ({ message, status, onRetry }) => {
  // If the error is 403 (Rate Limit), show the bento system diagnostics layout
  if (status === 403) {
    return <RateLimitBento message={message} onRetry={onRetry} />;
  }

  // Standard polished error state
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col justify-center items-center text-center p-12 gap-6 border border-red-500/20 bg-app-surface shadow-sm rounded-lg max-w-2xl mx-auto mt-10 relative overflow-hidden"
      role="alert"
      aria-live="assertive"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-red-600" />
      
      <div className="w-14 h-14 rounded bg-red-500/10 flex items-center justify-center text-red-500">
        <AlertTriangle className="w-7 h-7" />
      </div>

      <div className="space-y-3">
        <span className="tech-badge border-red-500/30 text-red-500!">
          STATUS: {status || "500"} / CRITICAL_ERROR
        </span>
        <h3 className="text-xl font-bold text-app-text tracking-tight mt-1">Application Exception Detected</h3>
        <p className="text-app-muted text-sm max-w-md mx-auto leading-relaxed">{message}</p>
      </div>

      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={onRetry}
        className="btn-action hover:!border-red-500/30 hover:!bg-red-500/5 px-6 py-2.5 font-semibold rounded-lg"
        aria-label="Reattempt task execution"
      >
        Reattempt Execution
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
