/**
 * @file Page Header Component
 * @description Minimalist Header - Focus on clean typography and essential elements.
 */

import PropTypes from "prop-types";
import { motion, AnimatePresence } from "motion/react";
import { MdCancel } from "react-icons/md";
import { FaSpinner, FaSearch } from "react-icons/fa";

const Spinner = ({ className }) => {
  return <FaSpinner className={`animate-spin ${className}`} />;
};

Spinner.propTypes = {
  className: PropTypes.string,
};

const PageHeader = ({ searchTerm, handleSearch, isSearching }) => {
  return (
    <header className="flex flex-col w-full items-center gap-y-10 py-4 mb-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-app-text">
          GitHub Explorer
        </h1>
        <p className="text-app-muted font-normal text-base sm:text-lg max-w-lg mx-auto">
          Encuentra desarrolladores y explora sus perfiles de GitHub de forma
          sencilla.
        </p>
      </div>

      <div className="w-full max-w-xl relative group">
        <div className="relative border border-app-border rounded-lg flex items-center px-4 py-3 gap-3 bg-app-surface shadow-sm focus-within:ring-2 focus-within:ring-app-accent/20 focus-within:border-app-accent/40 transition-all duration-300">
          {isSearching ? (
            <Spinner className="text-app-accent text-lg" />
          ) : (
            <FaSearch className="text-app-muted group-focus-within:text-app-accent transition-colors text-base" />
          )}

          <input
            type="text"
            className="flex-1 bg-transparent border-none outline-none text-base text-app-text placeholder:text-app-muted/50"
            placeholder="Buscar usuario o perfil..."
            value={searchTerm}
            onChange={handleSearch}
          />

          <AnimatePresence>
            {searchTerm && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => handleSearch({ target: { value: "" } })}
                className="text-app-muted hover:text-app-text transition-colors cursor-pointer"
              >
                <MdCancel size={20} />
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
