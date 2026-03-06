/**
 * @file Error Display Component
 * @description Standardized Error state with new Design System.
 */

import PropTypes from "prop-types";
import { motion } from "motion/react";

const ErrorDisplay = ({ message, onRetry }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex flex-col justify-center items-center text-center p-12 gap-6 glass-card-pro border-red-500/20 max-w-2xl mx-auto mt-10"
  >
    <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 text-3xl font-bold">
      !
    </div>
    <div className="space-y-2">
      <h3 className="text-3xl font-black text-app-text">Ops! Algo salió mal</h3>
      <p className="text-red-500 font-medium text-lg">{message}</p>
    </div>
    <button
      onClick={onRetry}
      className="btn-action !bg-red-500 !shadow-red-500/20"
    >
      Intentar de nuevo
    </button>
  </motion.div>
);

ErrorDisplay.propTypes = {
  message: PropTypes.string.isRequired,
  onRetry: PropTypes.func.isRequired,
};

export default ErrorDisplay;
