/**
 * @file Not Found Component
 * @description Standardized Empty state with new Design System.
 */

import PropTypes from "prop-types";
import { motion } from "motion/react";

const NotFound = ({ searchTerm }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center text-center p-16 glass-card-pro max-w-3xl mx-auto mt-10 gap-4"
  >
    <div className="text-6xl">🔍</div>
    <h3 className="text-3xl font-black text-app-text leading-tight">
      Sin resultados para <br />
      <span className="text-app-accent italic">&quot;{searchTerm}&quot;</span>
    </h3>
    <p className="text-app-muted font-medium text-lg">
      Intenta con otros términos o revisa la ortografía del usuario.
    </p>
  </motion.div>
);

NotFound.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};

export default NotFound;
