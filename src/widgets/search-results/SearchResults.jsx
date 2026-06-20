import PropTypes from "prop-types";

import { ErrorDisplay } from "@/shared";
import SkeletonGrid from "./SkeletonGrid";
import UserList from "./UserList";
import { NotFoundPage as NotFound } from "@/pages/not-found";

const SearchResults = (props) => {
  //
  const {
    isLoading,
    isError,
    error,
    isSuccess,
    isEmpty,
    users,
    debouncedSearchTerm,
    handleRetry,
  } = props;
  //
  if (isLoading) return <SkeletonGrid />;

  if (isError) {
    return (
      <ErrorDisplay
        message={error?.message || "Algo salió mal al consultar GitHub"}
        status={error?.status}
        onRetry={handleRetry}
      />
    );
  }

  if (isEmpty) return <NotFound searchTerm={debouncedSearchTerm} />;
  if (isSuccess) return <UserList userList={users} />;

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
