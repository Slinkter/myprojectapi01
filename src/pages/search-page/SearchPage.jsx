import { useUserSearchFacade, PageHeader } from "@/features/search-user";
import { SearchResults } from "@/widgets/search-results";
import { ErrorBoundary } from "@/shared";

const SearchPage = () => {
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
      {}
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
