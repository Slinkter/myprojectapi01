/**
 * @file Page Header Component
 * @description Premium Header - Search input with System Design alignment
 */

import PropTypes from "prop-types";
import { MdCancel } from "react-icons/md";

const Spinner = ({ className }) => (
  <svg
    className={`animate-spin ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

Spinner.propTypes = {
  className: PropTypes.string,
};

const PageHeader = ({ searchTerm, handleSearch, isSearching }) => (
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
          className="w-full px-6 py-4 rounded-2xl text-light-text dark:text-dark-text border border-light-border dark:border-dark-border bg-light-surface/80 dark:bg-dark-surface/80 backdrop-blur-md shadow-premium dark:shadow-dark-premium placeholder:text-light-muted dark:placeholder:text-dark-muted focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all text-base font-medium"
          type="text"
          placeholder={
            isSearching
              ? "Consultando la red..."
              : "Busca por nombre o usuario..."
          }
          value={searchTerm}
          onChange={handleSearch}
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

PageHeader.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
  isSearching: PropTypes.bool.isRequired,
};

export default PageHeader;
