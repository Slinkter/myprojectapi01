/**
 * @file User Search Feature Component
 * @description
 * Main feature component that provides user search functionality with:
 * - Debounced search input
 * - Real-time user fetching from GitHub API
 * - Loading, error, and success state handling
 * - Retry functionality for failed requests
 */

import { useRef, useTransition } from "react";
import { log } from "@/app/logger";
import { useUserSearchFacade } from "./hooks/useUserSearchFacade";

// UI Components
import PageHeader from "@/components/layout/PageHeader";
import ErrorDisplay from "@/components/layout/ErrorDisplay";
import SkeletonGrid from "./components/SkeletonGrid";
import UserList from "./components/UserList";
import NotFound from "@/components/layout/NotFound";

/**
 * User Search Component (Concurrent UI Refactor)
 * 
 * @description
 * Implements React Transitions to prioritize input responsiveness 
 * while results are being processed/rendered.
 */
const UserSearch = () => {
  const renderCount = useRef(1);
  log.render("UserSearch (Concurrent)", renderCount.current);
  renderCount.current++;

  // React Transition for heavy search updates
  const [isPending, startTransition] = useTransition();

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
    isEmpty
  } = useUserSearchFacade();

  /**
   * Prioritizes the input update while deferring result render if needed.
   * @param {React.ChangeEvent<HTMLInputElement>} e 
   */
  const handleSearchChange = (e) => {
    const value = e.target.value;
    // The search term state update is wrapped in startTransition 
    // to keep the input feel snappy.
    startTransition(() => {
      setSearchTerm(value);
    });
  };

  /**
   * Helper function for UI state logic
   */
  const renderContent = () => {
    // Show Loading state if API is fetching OR React is transitioning results
    if (isLoading || isPending) return <SkeletonGrid />;
    
    if (isError) {
      if (error && error.status === 403) return <NotFound searchTerm={debouncedSearchTerm} />;
      return <ErrorDisplay message={error?.message} onRetry={handleRetry} />;
    }

    if (isSuccess) return <UserList users={users} />;
    
    if (isEmpty) return <NotFound searchTerm={debouncedSearchTerm} />;

    return null;
  };

  return (
    <>
      <PageHeader
        isSearching={isLoading || isPending}
        searchTerm={searchTerm}
        handleSearch={handleSearchChange}
      />
      {renderContent()}
    </>
  );
};

UserSearch.displayName = "UserSearch";

export default UserSearch;
