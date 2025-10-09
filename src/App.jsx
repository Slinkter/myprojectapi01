/**
 * Este componente actúa como el orquestador principal de la aplicación (componente contenedor).
 * Sus responsabilidades son:
 * 1. Gestionar el estado global a través de Redux, suscribiéndose a los cambios en los `slices` de usuarios y búsqueda.
 * 2. Despachar la acción para cargar los usuarios (`fetchUsers`) cuando el componente se monta por primera vez.
 * 3. Filtrar los usuarios basándose en el término de búsqueda introducido por el usuario.
 * 4. Renderizar condicionalmente la interfaz de usuario según el estado de la aplicación (cargando, error, éxito, no encontrado).
 * 5. Pasar el estado y los manejadores de eventos necesarios a los componentes presentacionales hijos.
 */

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
    // Hook personalizado para gestionar el tema (claro/oscuro).
    const [theme, toggleTheme] = useTheme();
    const dispatch = useDispatch();

    const searchTerm = useSelector((state) => state.search.searchTerm);
    const { users, isLoading, error } = useSelector((state) => state.users);

    // Efecto para cargar los usuarios cuando el componente se monta.
    // Se despacha la acción `fetchUsers` solo si el estado es 'idle',
    // para evitar cargas repetidas si el estado ya es 'loading', 'succeeded' o 'failed'.
    useEffect(() => {
        if (isLoading === "idle") {
            dispatch(fetchUsers());
        }
    }, [isLoading, dispatch]);

    // Filtrado de usuarios memorizado con `useMemo`.
    // Esta función solo se re-ejecutará si `users` o `searchTerm` cambian,
    // optimizando el rendimiento al evitar recálculos innecesarios en cada render.
    const filteredUsers = useMemo(() => {
        if (!users) return [];
        return users.filter((user) =>
            user.login.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [users, searchTerm]);

    // Manejador para actualizar el término de búsqueda en el estado de Redux.
    const handleSearch = (e) => {
        dispatch(setSearchTerm(e.target.value));
    };

    // Manejador para reintentar la carga de datos en caso de error.
    const handleLoadUsers = () => {
        dispatch(fetchUsers());
    };

    /**
     * Función que determina qué componente renderizar basado en el estado actual de la aplicación.
     * @returns {JSX.Element} El componente a renderizar.
     */
    const renderContent = () => {
        const isLoadingOrIdle = isLoading === "loading" || isLoading === "idle";

        // Si está cargando o en estado inicial, muestra el esqueleto.
        if (isLoadingOrIdle) {
            return <SkeletonGrid />;
        }
        // Si hay un error, muestra el componente de error.
        if (error) {
            return <ErrorDisplay message={error} onRetry={handleLoadUsers} />;
        }
        // Si hay usuarios filtrados, muestra la lista de usuarios.
        if (filteredUsers.length > 0) {
            return <UserList users={filteredUsers} />;
        }
        // Si no hay resultados, muestra el componente de "no encontrado".
        return <NotFound searchTerm={searchTerm} />;
    };

    return (
        <main className="main-container">
            {/* El cabecero de la página recibe el estado y los manejadores como props. */}
            <PageHeader
                theme={theme}
                toggleTheme={toggleTheme}
                searchTerm={searchTerm}
                handleSearch={handleSearch}
                isSearching={isLoading === "loading"}
            />
            {/* Renderiza el contenido principal determinado por la lógica de `renderContent`. */}
            {renderContent()}
        </main>
    );
};

export default App;
