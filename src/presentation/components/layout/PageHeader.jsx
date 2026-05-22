/**
 * @file PageHeader.jsx
 * @description Encabezado ultra-premium con tipografía Syne editorial, gradientes y campo de búsqueda bento-glass.
 */

import PropTypes from "prop-types";
import { motion, AnimatePresence } from "motion/react";
import { Search, XCircle, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const Spinner = ({ className }) => {
  return <Loader2 className={cn("animate-spin", className)} />;
};

Spinner.propTypes = {
  className: PropTypes.string,
};

const PageHeader = ({ searchTerm, handleSearch, isSearching }) => {
  return (
    <header className="flex flex-col w-full items-center gap-y-8 sm:gap-y-12 py-8 sm:py-12 mb-6 sm:mb-10 relative">
      {/* Decore top blur point */}
      <div className="absolute top-0 w-72 h-72 bg-gradient-to-r from-app-accent to-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10 opacity-30 dark:opacity-20" />

      <div className="text-center space-y-4 max-w-2xl mx-auto px-4">
        {/* Subtle Cyber Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-app-accent/20 bg-app-accent/5 backdrop-blur-md text-[10px] sm:text-xs font-bold tracking-widest text-app-accent uppercase select-none mx-auto"
        >
          <Sparkles size={12} className="animate-pulse" />
          Clean Architecture v4
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-app-text"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-app-text via-app-accent to-indigo-500 dark:from-white dark:via-[#00F2FE] dark:to-indigo-400">
            GitHub Explorer
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-app-muted font-medium text-sm sm:text-base max-w-lg mx-auto leading-relaxed"
        >
          Busca perfiles de desarrolladores y organizaciones de forma interactiva con rendimiento y caching avanzado.
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
