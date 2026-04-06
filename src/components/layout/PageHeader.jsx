/**
 * @file Page Header Component
 * @description Minimalist Header - Focus on clean typography and essential elements.
 */

import PropTypes from "prop-types";
import { motion, AnimatePresence } from "motion/react";
import { Search, XCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const Spinner = ({ className }) => {
  return <Loader2 className={cn("animate-spin", className)} />;
};

Spinner.propTypes = {
  className: PropTypes.string,
};

const PageHeader = ({ searchTerm, handleSearch, isSearching }) => {
  return (
    <header className="flex flex-col w-full items-center gap-y-6 sm:gap-y-10 py-4 sm:py-6 mb-4 sm:mb-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-app-text">
          GitHub Explorer
        </h1>
        <p className="text-app-muted font-normal text-base sm:text-lg max-w-lg mx-auto">
          Encuentra desarrolladores y explora sus perfiles de GitHub de forma
          sencilla.
        </p>
      </div>

      <div className="w-full max-w-full sm:max-w-xl px-4 sm:px-6 md:px-8 relative group">
        <div className={cn(
          "relative border border-app-border rounded-lg flex items-center px-4 py-3 gap-3 bg-app-surface shadow-sm transition-all duration-300",
          "focus-within:ring-2 focus-within:ring-app-accent/20 focus-within:border-app-accent/40"
        )}>
          {isSearching ? (
            <Spinner className="text-app-accent text-lg" aria-hidden="true" />
          ) : (
            <Search className="text-app-muted group-focus-within:text-app-accent transition-colors text-base" aria-hidden="true" />
          )}

          <input
            type="text"
            className="flex-1 bg-transparent border-none outline-none text-base text-app-text placeholder:text-app-muted/50"
            placeholder="Buscar usuario o perfil..."
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => handleSearch({ target: { value: "" } })}
                className="text-app-muted hover:text-app-text transition-colors cursor-pointer"
                aria-label="Limpiar búsqueda"
              >
                <XCircle size={20} aria-hidden="true" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

PageHeader.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
  isSearching: PropTypes.bool.isRequired,
};

export default PageHeader;
