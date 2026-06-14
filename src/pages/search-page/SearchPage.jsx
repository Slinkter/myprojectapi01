/**
 * @file SearchPage.jsx
 * @description Main dashboard page component serving as the layout shell for the GitHub user search experience.
 */

import { useUserSearchFacade, PageHeader } from "@/features/search-user";
import { SearchResults } from "@/widgets/search-results";
import { ErrorBoundary } from "@/shared";

/**
 * SearchPage page component.
 * Composes PageHeader and SearchResults widget inside an ErrorBoundary.
 * Separates presentation layout from query fetching states via the search-user feature facade.
 *
 * @component
 * @returns {JSX.Element} Search page viewport layout.
 */
const SearchPage = () => {
  // --- LOCAL SCOPE ---
  const {
    searchTerm,
    setSearchTerm,
    debouncedSearchTerm,
    users,
    error,
    handleRetry,
    isLoading,
    isError,
    isSuccess,
    isEmpty,
  } = useUserSearchFacade();

  return (
    <>
      <PageHeader
        isSearching={isLoading}
        searchTerm={searchTerm}
        handleSearch={(e) => setSearchTerm(e.target.value)}
      />

      <ErrorBoundary>
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
      </ErrorBoundary>
    </>
  );
};

SearchPage.displayName = "SearchPage";
export default SearchPage;
