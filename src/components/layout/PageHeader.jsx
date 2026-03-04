/**
 * @file Page Header Component
 * @description Premium Header - Search input with System Design alignment
 */

import PropTypes from "prop-types";
import { useRef } from "react";
import { MdCancel } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";
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
    <header className="flex flex-col w-full max-w-screen-2xl my-12 items-center px-4">
      <div className="w-full max-w-3xl mb-10 text-center">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-light-text dark:text-dark-text mb-4">
          GitHub <span className="text-brand-500">Explorer</span>
        </h1>
        <p className="text-light-muted dark:text-dark-muted font-medium text-lg leading-relaxed max-w-xl mx-auto">
          Busca perfiles técnicos y descubre repositorios en la red social de
          desarrolladores más importante del mundo.
        </p>
      </div>

      <div className="w-full max-w-xl mx-auto relative group">
        {/* Glow Effect */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-brand-500 to-brand-300 opacity-20 blur-xl group-focus-within:opacity-40 transition-opacity duration-500" />

        <div className="relative">
          <input
            key="search-input"
            className="w-full px-6 py-4 rounded-2xl text-light-text dark:text-dark-text border border-light-border dark:border-dark-border bg-light-surface/80 dark:bg-dark-surface/80 backdrop-blur-md shadow-premium dark:shadow-dark-premium placeholder:text-light-muted dark:placeholder:text-dark-muted focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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

          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
            {isSearching ? (
              <Spinner className="h-6 w-6 text-brand-500" />
            ) : (
              searchTerm && (
                <button
                  onClick={() => handleSearch({ target: { value: "" } })}
                  aria-label="Clear search"
                  className="cursor-pointer p-1 text-light-muted dark:text-dark-muted hover:text-red-500 dark:hover:text-red-400 focus:outline-none transition-colors"
                >
                  <MdCancel className="h-6 w-6" />
                </button>
              )
            )}
          </div>
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
