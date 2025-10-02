import { useState, useMemo, useTransition } from "react";
import { useFetch } from "./hooks/useFetch.js";
import { useTheme } from "./hooks/useTheme.js";

import PageHeader from "./components/layout/PageHeader";
import ErrorDisplay from "./components/layout/ErrorDisplay";
import SkeletonGrid from "./components/layout/SkeletonGrid";
import UserList from "./components/layout/UserList";
import NotFound from "./components/layout/NotFound";

const API_URL = "https://api.github.com/users";

const App = () => {
    const [theme, toggleTheme] = useTheme();
    const [searchTerm, setSearchTerm] = useState("");
    const { data: users, isLoading, error, refetch } = useFetch(API_URL);
    const [isPending, startTransition] = useTransition();

    const filteredUsers = useMemo(() => {
        if (!users) return [];
        return users.filter((user) =>
            user.login.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [users, searchTerm]);

    const handleSearch = (e) => {
        startTransition(() => setSearchTerm(e.target.value));
    };

    if (error) {
        return <ErrorDisplay message={error.message} onRetry={refetch} />;
    }

    const renderContent = () => {
        if (isLoading) {
            return <SkeletonGrid />;
        }
        if (filteredUsers.length > 0) {
            return <UserList users={filteredUsers} />;
        }
        return <NotFound searchTerm={searchTerm} />;
    };

    return (
        <main className="main-container">
            <PageHeader
                theme={theme}
                toggleTheme={toggleTheme}
                searchTerm={searchTerm}
                handleSearch={handleSearch}
                isSearching={isPending}
            />
            {renderContent()}
        </main>
    );
};

export default App;