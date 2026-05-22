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
    <header className="flex flex-col w-full items-center gap-y-8 py-10 sm:py-16 mb-4 sm:mb-6 relative">
      <div className="text-center space-y-4 max-w-3xl mx-auto px-4">
        {/* Technical Sub-badge resembling Tailwind announcements */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-app-accent/20 bg-app-accent/5 dark:bg-app-accent/10 select-none mx-auto"
        >
          <Code size={11} className="text-app-accent" />
          <span className="font-mono text-[9px] tracking-tight text-app-accent font-bold uppercase">
            Tailwind UI Integration Operational
          </span>
        </motion.div>

        {/* Tailwind-style high-impact Hero Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          className="text-4xl sm:text-6xl font-extrabold tracking-tight text-app-text font-heading leading-tight"
        >
          Rapidly explore <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-app-accent via-sky-500 to-indigo-600 dark:from-app-accent dark:via-sky-400 dark:to-indigo-500">
            GitHub profiles.
          </span>
        </motion.h1>
        
        {/* Sleek Subtitle */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-app-muted font-medium text-xs sm:text-base max-w-xl mx-auto leading-relaxed"
        >
          A high-performance systems engineering interface built with React 18, TanStack Query, and validated using pure domain Zod schemas.
        </motion.p>
      </div>

      {/* Doc-Search input bar mirroring tailwindcss.com command palette */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="w-full max-w-xl px-4 sm:px-0 relative group"
      >
        {/* Glow border aura on focus */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-app-accent to-indigo-500 opacity-5 blur-xl group-focus-within:opacity-20 transition-all duration-500 pointer-events-none" />
        
        <div className="input-glass-pro !rounded-xl !py-3.5 hover:border-app-accent/30 transition-all duration-300">
          {isSearching ? (
            <Spinner className="text-app-accent text-lg" aria-hidden="true" />
          ) : (
            <Search className="text-app-muted group-focus-within:text-app-accent transition-colors text-base" aria-hidden="true" />
          )}

          <input
            type="text"
            className="flex-1 bg-transparent border-none outline-none text-sm sm:text-base text-app-text placeholder:text-app-muted/40 font-medium selection:bg-app-accent selection:text-app-bg"
            placeholder="Search profiles, organizations, or logs..."
            value={searchTerm}
            onChange={handleSearch}
            aria-label="Buscar usuarios de GitHub"
            aria-describedby="search-help"
          />
          
          <span id="search-help" className="sr-only">
            Escribe al menos 3 caracteres para buscar
          </span>

          <AnimatePresence>
            {searchTerm ? (
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
            ) : (
              /* Keyboard shortcut tag matching Tailwind docs Search palette */
              <div className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-app-border bg-app-bg text-[9px] font-mono text-app-muted font-bold select-none shadow-sm shrink-0">
                <span>⌘</span><span>K</span>
              </div>
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
