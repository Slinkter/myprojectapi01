/**
 * @file Page Header Component
 * @description Premium Header - Search input with System Design alignment
 */

import PropTypes from "prop-types";
import { useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MdCancel } from "react-icons/md";
import { FaSpinner, FaSearch } from "react-icons/fa";
import { log } from "@/app/logger";

const Spinner = ({ className }) => (
  <FaSpinner className={`animate-spin ${className}`} />
);

Spinner.propTypes = {
  className: PropTypes.string,
};

const PageHeader = ({ searchTerm, handleSearch, isSearching }) => {
  const renderCount = useRef(1);
  log.render("PageHeader", renderCount.current);
  renderCount.current++;

  log.state("PageHeader State", { searchTerm, isSearching });

  return (
    <header className="flex flex-col w-full max-w-screen-2xl mt-8 mb-16 items-center px-4 relative">
      {/* Decorative background element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-brand-500/5 blur-[120px] -z-10" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl mb-12 text-center"
      >
        <motion.h1
          className="text-5xl sm:text-7xl font-bold tracking-tighter text-light-text dark:text-dark-text mb-6"
          layout
        >
          GitHub{" "}
          <span className="bg-gradient-to-r from-brand-500 to-brand-400 bg-clip-text text-transparent">
            Explorer
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-light-muted dark:text-dark-muted font-medium text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto"
        >
          Busca perfiles técnicos y descubre repositorios en la red social de
          desarrolladores más importante del mundo.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-2xl mx-auto relative group"
      >
        {/* Advanced Glow Effect */}
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-brand-500 via-brand-400 to-brand-600 opacity-20 blur-2xl group-focus-within:opacity-50 transition-all duration-700" />

        <div className="relative">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-light-muted dark:text-dark-muted group-focus-within:text-brand-500 transition-colors">
            <FaSearch className="h-5 w-5" />
          </div>

          <input
            key="search-input"
            className="w-full pl-14 pr-16 py-5 rounded-2xl text-lg text-light-text dark:text-dark-text border border-light-border/50 dark:border-dark-border/50 bg-light-surface/70 dark:bg-dark-surface/70 backdrop-blur-xl shadow-2xl placeholder:text-light-muted dark:placeholder:text-dark-muted focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            type="text"
            placeholder={
              isSearching
                ? "Consultando la red..."
                : "Busca por nombre o usuario..."
            }
            value={searchTerm}
            onChange={handleSearch}
            disabled={isSearching}
            aria-label="Buscar usuario"
          />

          <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-3">
            <AnimatePresence mode="popLayout">
              {isSearching ? (
                <motion.div
                  key="spinner"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Spinner className="h-6 w-6 text-brand-500" />
                </motion.div>
              ) : (
                searchTerm && (
                  <motion.button
                    key="clear"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => handleSearch({ target: { value: "" } })}
                    aria-label="Clear search"
                    className="cursor-pointer p-1.5 rounded-full bg-light-muted/10 dark:bg-dark-muted/10 text-light-muted dark:text-dark-muted hover:text-red-500 hover:bg-red-500/10 transition-all focus:outline-none"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <MdCancel className="h-6 w-6" />
                  </motion.button>
                )
              )}
            </AnimatePresence>
          </div>
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
