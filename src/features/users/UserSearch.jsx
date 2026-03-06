/**
 * @file User Search Feature Component
 * @description
 * Main feature component that provides user search functionality with:
 * - Debounced search input
 * - Real-time user fetching from GitHub API
 * - Loading, error, and success state handling
 * - Retry functionality for failed requests
 */

import { useRef } from "react";
import { log } from "@/app/logger";
import { useUserSearchFacade } from "./hooks/useUserSearchFacade";

// UI Components
import PageHeader from "@/components/layout/PageHeader";
import ErrorDisplay from "@/components/layout/ErrorDisplay";
import SkeletonGrid from "./components/SkeletonGrid";
import UserList from "./components/UserList";
import NotFound from "@/components/layout/NotFound";

/**
 * User Search Component (Facade Pattern Refactor)
 *
 * Now this component only cares about WHAT to display,
 * not HOW the data is debounced or fetched.
 */
const UserSearch = () => {
  const renderCount = useRef(1);
  log.render("UserSearch (Facade)", renderCount.current);
  renderCount.current++;

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

  /**
   * Helper function for UI state logic
   */
  const renderContent = () => {
    if (isLoading) return <SkeletonGrid />;

    if (isError) {
      if (error && error.status === 403)
        return <NotFound searchTerm={debouncedSearchTerm} />;
      return <ErrorDisplay message={error?.message} onRetry={handleRetry} />;
    }

    if (isSuccess) return <UserList users={users} />;

    if (isEmpty) return <NotFound searchTerm={debouncedSearchTerm} />;

    return null;
  };

  return (
    <>
      <PageHeader
        isSearching={isLoading}
        searchTerm={searchTerm}
        handleSearch={(e) => setSearchTerm(e.target.value)}
      />
      {renderContent()}
    </>
  );
};

UserSearch.displayName = "UserSearch";

export default UserSearch;
