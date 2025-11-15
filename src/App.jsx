/**
 * @file Componente principal de la aplicación (App).
 * @author Luis Jesus CC
 * @description
 * Este componente es el "cerebro" de la aplicación. Actúa como el director de orquesta:
 * Sus responsabilidades son:
 * 1. Se conecta al "almacén" central de datos (store de Redux) para saber qué está pasando.
 * 2. Da la orden inicial de cargar los usuarios de GitHub.
 * 3. Escucha lo que el usuario escribe en la barra de búsqueda para filtrar los resultados.
 * 4. Decide qué mostrar en pantalla en cada momento: una animación de carga, un error, la lista de usuarios o un mensaje de "no encontrado".
 * 5. Delega el trabajo de "dibujar" la interfaz a otros componentes más especializados.
 */

import { useEffect, useMemo, useState } from "react";
import { MoonIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { IconButton } from "@material-tailwind/react";
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
    // `useSelector` es como un espía que mira dentro del estado de Redux y nos trae los datos que necesitamos.
    // Aquí, obtenemos el término de búsqueda actual.
    // Usaremos un estado local para el valor del input y un efecto para "debounce" la actualización a Redux.
    const [localSearchTerm, setLocalSearchTerm] = useState("");
    const { searchTerm } = useSelector((state) => state.search);
    // Y aquí, obtenemos todo lo relacionado con los usuarios: la lista, si están cargando o si hubo un error.
    const { users, isLoading, error } = useSelector((state) => state.users);
    // `dispatch` es la función que usamos para enviar "órdenes" o "acciones" a Redux.
    const dispatch = useDispatch();
    // Hook personalizado que encapsula toda la lógica para cambiar el tema (claro/oscuro).
    const [theme, toggleTheme] = useTheme();

    // `useEffect` se ejecuta después de que el componente se dibuja en pantalla.
    // Lo usamos para realizar "efectos secundarios", como llamar a una API.
    useEffect(() => {
        // Solo damos la orden de cargar usuarios (`fetchUsers`) si no se ha hecho antes (estado 'idle'=== reposo).
        // Esto evita que se hagan llamadas a la API innecesarias en cada re-renderizado.
        if (isLoading === "idle") {
            dispatch(fetchUsers());
        }
    }, [isLoading, dispatch]);

    // Efecto para aplicar "debounce" a la búsqueda.
    // Solo actualiza el término de búsqueda en Redux cuando el usuario deja de escribir.
    useEffect(() => {
        const timerId = setTimeout(() => {
            dispatch(setSearchTerm(localSearchTerm));
        }, 300); // Espera 300ms después de la última pulsación de tecla.

        // Función de limpieza: se ejecuta si el usuario vuelve a escribir antes de que pasen los 300ms.
        // Esto cancela el temporizador anterior y evita actualizaciones innecesarias.
        return () => clearTimeout(timerId);
    }, [localSearchTerm, dispatch]);

    // `useMemo`  "Memoriza" el resultado de una operación costosa.
    // En este caso, la lista de usuarios filtrados solo se volverá a calcular si la lista
    // original (`users`) o el término de búsqueda (`searchTerm`) cambian.
    const filteredUsers = useMemo(() => {
        // caso 1 : si no hay lista de usuarios devolver vacio
        if (!users) return [];
        // caso 2 : hay usuarios, filtrar segun searchTerm
        return users.filter((user) =>
            user.login.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [users, searchTerm]);

    // Esta función se activa cada vez que el usuario escribe en el campo de búsqueda.
    // Despacha una acción a Redux para que actualice el `searchTerm` en el estado global.
    const handleSearch = (e) => {
        setLocalSearchTerm(e.target.value);
    };

    // Esta función se pasa al componente de error para que el usuario
    // pueda intentar cargar los datos de nuevo si algo falló.
    const handleLoadUsers = () => {
        dispatch(fetchUsers());
    };

    /**
     * Función que determina qué componente renderizar basado en el estado actual de la aplicación.
     * @returns {JSX.Element} El componente a renderizar.
     */
    const renderContent = () => {
        const isLoadingActive = isLoading === "loading" || isLoading === "idle";

        // Lógica de renderizado condicional:
        // 1. Si los datos están cargando, mostramos una animación de esqueleto.
        if (isLoadingActive) {
            return <SkeletonGrid />;
        }
        // 2. Si hubo un error, mostramos un mensaje y un botón para reintentar.
        if (error) {
            return <ErrorDisplay message={error} onRetry={handleLoadUsers} />;
        }
        // 3. Si la búsqueda tiene resultados, mostramos la lista de usuarios.
        if (filteredUsers.length > 0) {
            return <UserList users={filteredUsers} />;
        }
        // 4. Si no hay resultados para la búsqueda, mostramos un mensaje indicándolo.
        return <NotFound searchTerm={searchTerm} />;
    };

    return (
        <main className="app">
            <IconButton
                variant="text"
                className="page-header__theme-toggle"
                onClick={toggleTheme}
                aria-label="Toggle theme"
            >
                {theme === "dark" ? (
                    <SparklesIcon className="page-header__icon" />
                ) : (
                    <MoonIcon className="page-header__icon" />
                )}
            </IconButton>
            <PageHeader
                searchTerm={localSearchTerm}
                handleSearch={handleSearch}
                isSearching={isLoading === "loading"}
            />

            {/* Renderiza el contenido principal determinado por la lógica de `renderContent`. */}
            {renderContent()}
        </main>
    );
};

export default App;
