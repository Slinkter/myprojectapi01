/**
 * @file Page Header Component
 * @description
 * Header component with application title and search input.
 * Provides real-time search functionality with visual feedback.
 */

import PropTypes from "prop-types";
import { Typography, Input, Spinner } from "@material-tailwind/react";
import { MdCancel } from "react-icons/md";

/**
 * Page Header Component
 *
 * @component
 * @description
 * Application header containing the title and search input field.
 * Displays loading state and provides clear button for search input.
 *
 * Features:
 * - Centered responsive layout
 * - Search input with controlled value
 * - Loading spinner during search
 * - Clear button when search has value
 * - Dark mode support
 * - Focus ring styling
 *
 * @param {Object} props - Component props
 * @param {string} props.searchTerm - Current search input value
 * @param {Function} props.handleSearch - Callback for search input changes
 * @param {boolean} props.isSearching - Whether a search is in progress
 *
 * @returns {JSX.Element} Header with title and search input
 *
 * @example
 * <PageHeader
 *   searchTerm={searchTerm}
 *   handleSearch={(e) => setSearchTerm(e.target.value)}
 *   isSearching={status === 'loading'}
 * />
 */
const PageHeader = ({ searchTerm, handleSearch, isSearching }) => (
  <header className="flex flex-col w-full max-w-screen-2xl my-8 items-center px-4">
    <div className="w-full max-w-3xl mb-4 text-center text-secondary-500 dark:text-secondary-300">
      <Typography variant="h1" color="inherit">
        API - Github Users
      </Typography>
    </div>

    <div className="w-full max-w-md mx-auto">
      <Input
        key="search-input"
        className="text-gray-900 dark:text-gray-50 !border !border-gray-500 bg-white dark:bg-gray-800 shadow-sm shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 dark:focus:!border-white dark:focus:!border-t-white dark:focus:ring-white/10"
        labelProps={{
          className: "hidden",
        }}
        label={isSearching ? "Cargando datos..." : "Buscar usuario..."}
        type="text"
        color="black"
        placeholder={isSearching ? "Cargando datos..." : "Buscar usuario..."}
        value={searchTerm}
        onChange={handleSearch}
        icon={
          isSearching ? (
            <Spinner className="h-5 w-5" />
          ) : searchTerm ? (
            <MdCancel
              className="h-5 w-5 cursor-pointer text-gray-500 hover:text-gray-900 dark:hover:text-gray-50"
              onClick={() => handleSearch({ target: { value: "" } })}
            />
          ) : null
        }
      />
    </div>
  </header>
);

/**
 * PropTypes validation
 */
PageHeader.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
  isSearching: PropTypes.bool.isRequired,
};

export default PageHeader;
