/**
 * @file Not Found Component
 * @description
 * Empty state component displayed when no search results are found.
 */

import PropTypes from "prop-types";

/**
 * Not Found Component
 *
 * @component
 * @description
 * Displays a message when no users match the search criteria.
 * Shows the search term that produced no results.
 *
 * @param {Object} props - Component props
 * @param {string} props.searchTerm - The search term that produced no results
 *
 * @returns {JSX.Element} No results message
 *
 * @example
 * <NotFound searchTerm="nonexistentuser123" />
 */
const NotFound = ({ searchTerm }) => (
  <div className="animate-not-foundName flex items-center justify-center text-center p-8 mt-10">
    <h3 className="text-3xl font-heading text-slate-900 dark:text-dark-text">
      No se encontraron usuarios con &quot;{searchTerm}&quot;.
    </h3>
  </div>
);

/**
 * PropTypes validation
 */
NotFound.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};

export default NotFound;
