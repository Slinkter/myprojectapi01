/**
 * @file User Search Feature Component
 * @description
 * Main feature component that provides user search functionality with:
 * - Debounced search input
 * - Real-time user fetching from GitHub API
 * - Loading, error, and success state handling
 * - Retry functionality for failed requests
 */

import { log } from "@/app/logger";
import { useUserSearchFacade } from "@/features/users/hooks/useUserSearchFacade";

// UI Components
import PageHeader from "@/components/layout/PageHeader";
import ErrorDisplay from "@/components/layout/ErrorDisplay";
import SkeletonGrid from "@/features/users/components/SkeletonGrid";
import UserList from "@/features/users/components/UserList";
import NotFound from "@/components/layout/NotFound";

/**
 * Search Results Component
 * Handles the conditional rendering of search states.
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

  // 2. Error State (with specific handling for 403 Rate Limit)
  if (isError) {
    return error?.status === 403 ? (
      <NotFound searchTerm={debouncedSearchTerm} />
    ) : (
      <ErrorDisplay message={error?.message} onRetry={handleRetry} />
    );
  }

  // 3. Success State (Empty vs Data)
  if (isEmpty) return <NotFound searchTerm={debouncedSearchTerm} />;
  if (isSuccess) return <UserList users={users} />;

  return null;
};

/**
 * User Search Component (Facade Pattern Refactor)
 *
 * Now this component only cares about WHAT to display,
 * not HOW the data is debounced or fetched.
 */
const UserSearch = () => {
  // Everything extracted from the Facade
  const {
    searchTerm,
    setSearchTerm,
    debouncedSearchTerm,
    users,
    status,
    error,
    handleRetry,
    isLoading,
    isError,
    isSuccess,
    isEmpty,
  } = useUserSearchFacade();

  log.state("Facade Output", { usersCount: users?.length, status });
  if (isLoading) log.flow("loading");
  if (isSuccess) log.flow("success");

  return (
    <>
      <PageHeader
        isSearching={isLoading}
        searchTerm={searchTerm}
        handleSearch={(e) => setSearchTerm(e.target.value)}
      />
      <SearchResults
        isLoading={isLoading}
        isError={isError}
        error={error}
        isSuccess={isSuccess}
        isEmpty={isEmpty}
        users={users}
        debouncedSearchTerm={debouncedSearchTerm}
        handleRetry={handleRetry}
      />
    </>
  );
};

UserSearch.displayName = "UserSearch";

export default UserSearch;
