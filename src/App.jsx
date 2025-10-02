import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "./hooks/useTheme.js";
import { setSearchTerm } from "./features/search/searchSlice";
import { fetchUsers } from "./features/users/usersSlice";

import PageHeader from "./components/layout/PageHeader";
import ErrorDisplay from "./components/layout/ErrorDisplay";
import SkeletonGrid from "./components/layout/SkeletonGrid";
import UserList from "./components/layout/UserList";
import NotFound from "./components/layout/NotFound";

const App = () => {
    const [theme, toggleTheme] = useTheme();
    const dispatch = useDispatch();

    // Selecciona el estado desde el store de Redux
    const searchTerm = useSelector((state) => state.search.searchTerm);
    const { users, isLoading, error } = useSelector((state) => state.users);

    // Carga los usuarios en el primer renderizado
    useEffect(() => {
        // Solo carga los usuarios si no se han cargado o intentado cargar antes
        if (isLoading === 'idle') {
            dispatch(fetchUsers());
        }
    }, [isLoading, dispatch]);

    // Filtrado de usuarios memorizado basado en el término de búsqueda
    const filteredUsers = useMemo(() => {
        if (!users) return [];
        return users.filter((user) =>
            user.login.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [users, searchTerm]);

    // Manejador para los cambios en el input de búsqueda
    const handleSearch = (e) => {
        dispatch(setSearchTerm(e.target.value));
    };

    // Manejador para reintentar la carga de datos
    const handleRetry = () => {
        dispatch(fetchUsers());
    };

    // Lógica de renderizado basada en el estado de Redux
    const renderContent = () => {
        const isLoadingOrIdle = isLoading === 'loading' || isLoading === 'idle';

        if (isLoadingOrIdle) {
            return <SkeletonGrid />;
        }
        if (error) {
            return <ErrorDisplay message={error} onRetry={handleRetry} />;
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
                isSearching={isLoading === 'loading'}
            />
            {renderContent()}
        </main>
    );
};

export default App;
