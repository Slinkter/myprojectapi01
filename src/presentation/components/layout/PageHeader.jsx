/**
 * @file PageHeader.jsx
 * @description Encabezado ultra-premium con tipografía Syne editorial, gradientes y campo de búsqueda bento-glass.
 */

import PropTypes from "prop-types";
import { motion, AnimatePresence } from "motion/react";
import { Search, XCircle, Loader2, Code } from "lucide-react";
import { cn } from "@/lib/utils";

const Spinner = ({ className }) => {
  return <Loader2 className={cn("animate-spin", className)} />;
};

Spinner.propTypes = {
  className: PropTypes.string,
};

const PageHeader = ({ searchTerm, handleSearch, isSearching }) => {
  return (
    <header className="flex flex-col w-full items-center gap-y-6 sm:gap-y-8 py-8 sm:py-10 mb-4 sm:mb-6 relative">
      <div className="text-center space-y-4 max-w-2xl mx-auto px-4">
        {/* Technical System Status Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-app-border bg-app-surface shadow-sm select-none mx-auto"
        >
          <Code size={12} className="text-app-accent" />
          <span className="font-mono text-[10px] tracking-tight text-app-muted font-bold">
            CLEAN-ARCH-V4 // STATUS: OPERATIONAL
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          className="text-4xl sm:text-5xl font-extrabold tracking-tight text-app-text font-heading"
        >
          GitHub Explorer
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-app-muted font-medium text-xs sm:text-sm max-w-md mx-auto leading-relaxed"
        >
          Consola de búsqueda de desarrolladores y organizaciones conectada a la API de GitHub mediante adaptadores de dominio y validación de tipos Zod.
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="w-full max-w-xl px-4 sm:px-0 relative group"
      >
        {/* Border Aura behind input */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-app-accent to-indigo-500 opacity-10 blur-xl group-focus-within:opacity-25 transition-all duration-500 pointer-events-none" />
        
        <div className="input-glass-pro">
          {isSearching ? (
            <Spinner className="text-app-accent text-lg" aria-hidden="true" />
          ) : (
            <Search className="text-app-muted group-focus-within:text-app-accent transition-colors text-base" aria-hidden="true" />
          )}

          <input
            type="text"
            className="flex-1 bg-transparent border-none outline-none text-sm sm:text-base text-app-text placeholder:text-app-muted/40 font-medium selection:bg-app-accent selection:text-app-bg"
            placeholder="Escribe el nombre de un usuario de GitHub..."
            value={searchTerm}
            onChange={handleSearch}
            aria-label="Buscar usuarios de GitHub"
            aria-describedby="search-help"
          />
          
          <span id="search-help" className="sr-only">
            Escribe al menos 3 caracteres para buscar
          </span>

          <AnimatePresence>
            {searchTerm && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleSearch({ target: { value: "" } })}
                className="text-app-muted hover:text-app-text transition-colors cursor-pointer"
                aria-label="Limpiar búsqueda"
              >
                <XCircle size={18} aria-hidden="true" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </header>
  );
};

PageHeader.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
  isSearching: PropTypes.bool.isRequired,
};

export default PageHeader;
