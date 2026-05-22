import React from "react";
import PropTypes from "prop-types";
import { log } from "@/infrastructure/logger/logger";

// UI Components
import ErrorDisplay from "@/presentation/components/layout/ErrorDisplay";
import SkeletonGrid from "@/presentation/features/users/components/SkeletonGrid";
import UserList from "@/presentation/features/users/components/UserList";
import NotFound from "@/presentation/components/layout/NotFound";

/**
 * @file SearchResults.jsx
 * @description
 * Maneja el renderizado condicional de los estados de búsqueda para la función de Usuarios.
 * Aislado de UserSearch para cumplir con el Principio de Responsabilidad Única.
 */

/**
 * Search Results Component
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isLoading - Loading state
 * @param {boolean} props.isError - Error state
 * @param {Object} props.error - Error object from API
 * @param {boolean} props.isSuccess - Success state
 * @param {boolean} props.isEmpty - Empty results state
 * @param {Array} props.users - List of users to display
 * @param {string} props.debouncedSearchTerm - The current search term
 * @param {Function} props.handleRetry - Callback to retry the search
 * @returns {JSX.Element|null}
 */
const SearchResults = ({
  isLoading,
  isError,
  error,
  isSuccess,
  isEmpty,
  users,
  debouncedSearchTerm,
  handleRetry,
}) => {
  // 1. Loading State
  if (isLoading) return <SkeletonGrid />;

  // 2. Error State (with specific handling for 403 Rate Limit via ErrorDisplay)
  if (isError) {
    return (
      <ErrorDisplay 
        message={error?.message || "Algo salió mal al consultar GitHub"} 
        status={error?.status} 
        onRetry={handleRetry} 
      />
    );
  }

  // 3. Success State (Empty vs Data)
  if (isEmpty) return <NotFound searchTerm={debouncedSearchTerm} />;
  if (isSuccess) return <UserList users={users} />;

  return null;
};

SearchResults.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  error: PropTypes.shape({
    status: PropTypes.number,
    message: PropTypes.string,
  }),
  isSuccess: PropTypes.bool.isRequired,
  isEmpty: PropTypes.bool.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  debouncedSearchTerm: PropTypes.string.isRequired,
  handleRetry: PropTypes.func.isRequired,
};

SearchResults.displayName = "SearchResults";

export default SearchResults;
