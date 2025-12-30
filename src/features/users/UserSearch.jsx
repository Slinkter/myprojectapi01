/**
 * @file Feature component for user search functionality.
 * @description
 * This component encapsulates the entire user search feature, including
 * the search bar, debouncing, data fetching, and rendering of results
 * (loading, error, and success states).
 */
import { useDispatch } from "react-redux";

// Custom hooks for state management and logic
import { useDebouncedSearch } from "../../hooks/useDebouncedSearch.js";
import { useUserFetching } from "../../hooks/useUserFetching.js";
import { fetchUsers } from "./usersSlice.js";

// UI Components
import PageHeader from "../../components/layout/PageHeader";
import ErrorDisplay from "../../components/layout/ErrorDisplay";
import SkeletonGrid from "../../components/layout/SkeletonGrid";
import UserList from "../../components/layout/UserList";
import NotFound from "../../components/layout/NotFound";

const UserSearch = () => {
    // Hook for handling search logic with "debounce"
    const [searchTerm, setSearchTerm, debouncedSearchTerm] = useDebouncedSearch(
        "",
        300
    );
    // Hook that manages fetching and the state of user data
    const { users, status, error } = useUserFetching(debouncedSearchTerm);
    const dispatch = useDispatch();

    // Function to retry fetching users in case of an error
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
     * Renders the main content based on the current fetching status.
     * @returns {JSX.Element} The component to render.
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
            return (
                <ErrorDisplay message={error?.message || 'An unknown error occurred'} onRetry={handleRetry} />
            );
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
                searchTerm={searchTerm}
                handleSearch={(e) => setSearchTerm(e.target.value)}
                isSearching={status === "loading"}
            />
            {renderContent()}
        </>
    );
};

UserSearch.displayName = "UserSearch";

export default UserSearch;
