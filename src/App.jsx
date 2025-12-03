/**
 * @file Componente principal de la aplicación (App).
 * @author Luis Jesus CC
 * @description
 * Este componente es el núcleo visual de la aplicación. Su única responsabilidad
 * es componer la interfaz de usuario a partir de los datos y el estado que le
- * proporcionan los hooks personalizados. No contiene lógica de negocio.
+ * proporcionan los hooks personalizados. No contiene lógica de negocio, la cual ha
+ * sido abstraída para máxima reutilización y separación de conceptos.
 */

import { MoonIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { IconButton } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { useTheme } from "./hooks/useTheme.js";
import { useDebouncedSearch } from "./hooks/useDebouncedSearch.js";
import { useUserFetching } from "./hooks/useUserFetching.js";
import { fetchUsers } from "./features/users/usersSlice.js";


import PageHeader from "./components/layout/PageHeader";
import ErrorDisplay from "./components/layout/ErrorDisplay";
import SkeletonGrid from "./components/layout/SkeletonGrid";
import UserList from "./components/layout/UserList";
import NotFound from "./components/layout/NotFound";

const App = () => {
    // Hook para gestionar el tema (claro/oscuro).
    const [theme, toggleTheme] = useTheme();
    const dispatch = useDispatch();

    // Hook para gestionar la lógica de búsqueda con "debounce".
    const [searchTerm, setSearchTerm, debouncedSearchTerm] = useDebouncedSearch("", 300);

    // Hook que gestiona la obtención de datos de los usuarios.
    const { users, status, error } = useUserFetching(debouncedSearchTerm);


    // Función para reintentar la carga de usuarios en caso de error.
    const handleRetry = () => {
        // Para forzar una nueva llamada a la API, podríamos necesitar una función `refetch` del hook.
        // Por ahora, esta implementación simple puede no ser suficiente si el término no cambia.
        const currentTerm = debouncedSearchTerm;
        // Forzamos un cambio para reactivar el `useEffect` en el hook `useUserFetching`
        if (searchTerm === currentTerm) {
            dispatch(fetchUsers(currentTerm));
        } else {
             setSearchTerm(currentTerm);
        }
    };

    /**
     * Determina qué componente renderizar basado en el estado de la petición (loading, succeeded, failed).
     * Si la petición falla con un estado 403, renderiza el componente `NotFound`.
     * Para otros errores, renderiza `ErrorDisplay`.
     * @returns {JSX.Element | null} El componente a renderizar o `null` si no hay contenido.
     */
    const renderContent = () => {
        const isLoading = status === 'loading' || status === 'idle';

        if (isLoading) {
            return <SkeletonGrid />;
        }
        if (status === 'failed') {
            // Check if the error is a 403 Forbidden specifically from the API
            if (error && error.status === 403) {
                return <NotFound searchTerm={debouncedSearchTerm} />;
            }
            return <ErrorDisplay message={error.message} onRetry={handleRetry} />;
        }
        // Usamos `users` directamente, que ya viene filtrado de la API
        if (status === 'succeeded' && users && users.length > 0) {
            return <UserList users={users} />;
        }
        if (status === 'succeeded' && (!users || users.length === 0)) {
            return <NotFound searchTerm={debouncedSearchTerm} />;
        }

        return null; // No debería llegar aquí en un flujo normal
    };

    return (
        <main className="app">
            <IconButton
                variant="text"
                className="page-header__theme-toggle"
                aria-label="Toggle theme"
                onClick={toggleTheme}
            >
                {theme === "dark" ? (
                    <SparklesIcon className="page-header__icon" />
                ) : (
                    <MoonIcon className="page-header__icon" />
                )}
            </IconButton>
            <PageHeader
                searchTerm={searchTerm}
                handleSearch={(e) => setSearchTerm(e.target.value)}
                isSearching={status === "loading"}
            />

            {renderContent()}
        </main>
    );
};

export default App;
