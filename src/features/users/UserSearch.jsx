/**
 * @file User Search Feature Component
 * @description
 * Main feature component that provides user search functionality with:
 * - Debounced search input
 * - Real-time user fetching from GitHub API
 * - Loading, error, and success state handling
 * - Retry functionality for failed requests
 */

import { useDispatch } from "react-redux";

// Custom hooks for state management and logic
import { useDebouncedSearch } from "@/hooks/useDebouncedSearch.js";
import { useUserFetching } from "./hooks/useUserFetching.js";
import { fetchUsers } from "./usersSlice.js";

// UI Components
import PageHeader from "@/components/layout/PageHeader";
import ErrorDisplay from "@/components/layout/ErrorDisplay";
import SkeletonGrid from "./components/SkeletonGrid";
import UserList from "./components/UserList";
import NotFound from "@/components/layout/NotFound";

/**
 * User Search Component
 *
 * @component
 * @description
 * Main feature component that orchestrates the user search experience.
 * Combines debounced search input with data fetching and conditional rendering
 * based on loading states, errors, and results.
 *
 * Features:
 * - 300ms debounced search to reduce API calls
 * - Automatic data fetching on search term change
 * - Loading skeleton during data fetch
 * - Error handling with retry functionality
 * - Empty state for no results
 * - Special handling for 403 errors (rate limiting)
 *
 * State Flow:
 * 1. User types in search input
 * 2. Input value updates immediately (controlled input)
 * 3. After 300ms of no typing, debounced value updates
 * 4. Debounced value triggers API call via useUserFetching
 * 5. Component renders appropriate UI based on status
 *
 * @returns {JSX.Element} User search interface with results
 *
 * @example
 *  Rendered in App.jsx
 * <Route path="/" element={<UserSearch />} />
 */
const UserSearch = () => {
  // Hook for handling search logic with debounce (300ms delay)
  const [searchTerm, setSearchTerm, debouncedSearchTerm] =
    useDebouncedSearch("");

  // Hook that manages fetching and the state of user data
  const { users, status, error } = useUserFetching(debouncedSearchTerm);

  const dispatch = useDispatch();

  /**
   * Retries fetching users in case of an error
   *
   * @function handleRetry
   * @description
   * Forces a new API call to retry the failed request.
   * If search term hasn't changed, dispatches fetchUsers directly.
   * Otherwise, updates search term to trigger useEffect in useUserFetching.
   */
  const handleRetry = () => {
    const currentTerm = debouncedSearchTerm;
    // Force a new API call to re-trigger the useEffect in useUserFetching
    if (searchTerm === currentTerm) {
      dispatch(fetchUsers(currentTerm));
    } else {
      setSearchTerm(currentTerm);
    }
  };

  /**
   * Renders appropriate content based on current status
   *
   * @function renderContent
   * @returns {JSX.Element|null} Component to render based on status
   *
   * @description
   * Helper function for conditional rendering that encapsulates
   * if/else logic to keep the main return JSX clean and readable.
   *
   * This is NOT a "Render Props" or "Render Function" design pattern.
   * It's a private helper function for conditional logic.
   *
   * Rendering Logic:
   * - idle/loading: Shows skeleton grid
   * - failed (403): Shows not found (rate limit)
   * - failed (other): Shows error with retry button
   * - succeeded (with results): Shows user list
   * - succeeded (no results): Shows not found
   */
  const renderContent = () => {
    const isLoading = status === "loading" || status === "idle";

    if (isLoading) {
      return <SkeletonGrid />;
    }

    if (status === "failed") {
      if (error && error.status === 403) {
        return <NotFound searchTerm={debouncedSearchTerm} />;
      }
      return <ErrorDisplay message={error?.message} onRetry={handleRetry} />;
    }

    if (status === "succeeded") {
      if (users && users.length > 0) {
        return <UserList users={users} />;
      }
      return <NotFound searchTerm={debouncedSearchTerm} />;
    }

    return null;
  };

  return (
    <>
      <PageHeader
        isSearching={status === "loading"}
        searchTerm={searchTerm}
        handleSearch={(e) => setSearchTerm(e.target.value)}
      />
      {renderContent()}
    </>
  );
};

UserSearch.displayName = "UserSearch";

export default UserSearch;
