/**
 * @file NotFound.jsx
 * @description Estado de 'Sin resultados' estandarizado utilizando el nuevo Sistema de Diseño.
 */

import PropTypes from "prop-types";
import { motion } from "motion/react";
import { Search } from "lucide-react";

const NotFound = ({ searchTerm }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="flex flex-col items-center justify-center text-center p-16 border border-app-border bg-app-surface shadow-sm rounded-lg max-w-3xl mx-auto mt-10 gap-5"
  >
    <div className="w-12 h-12 rounded bg-app-bg border border-app-border flex items-center justify-center text-app-muted">
      <Search className="w-5 h-5" />
    </div>
    
    <div className="space-y-2">
      <h3 className="text-xl font-bold text-app-text tracking-tight">
        No Query Matches Found
      </h3>
      <p className="text-sm text-app-muted max-w-md mx-auto leading-relaxed">
        The system returned 0 results for queries matching the identifier <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-app-bg border border-app-border text-app-accent">{searchTerm}</code>. Please check spelling or database constraints.
      </p>
    </div>
  </motion.div>
);

NotFound.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};

export default NotFound;
