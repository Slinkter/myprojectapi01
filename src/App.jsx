/**
 * @file Componente principal de la aplicación (App).
 * @author Luis Jesus CC
 * @description
 * Este componente es el núcleo visual de la aplicación. Su única responsabilidad
 * es componer la interfaz de usuario a partir de los datos y el estado que le
 * proporcionan los hooks personalizados. No contiene lógica de negocio, la cual ha
 * sido abstraída para máxima reutilización y separación de conceptos.
 */
import { MoonIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { IconButton } from "@material-tailwind/react";
import { useDispatch } from "react-redux";

// Hooks personalizados para la gestión de estado y lógica.
import { useTheme } from "./hooks/useTheme.js";
import { useDebouncedSearch } from "./hooks/useDebouncedSearch.js";
import { useUserFetching } from "./hooks/useUserFetching.js";
import { fetchUsers } from "./features/users/usersSlice.js";

// Componentes de la interfaz de usuario.
import PageHeader from "./components/layout/PageHeader";
import ErrorDisplay from "./components/layout/ErrorDisplay";
import SkeletonGrid from "./components/layout/SkeletonGrid";
import UserList from "./components/layout/UserList";
import NotFound from "./components/layout/NotFound";
import PropTypes from "prop-types";

/**
 * Componente para alternar entre el tema claro y oscuro.
 * @param {{ toggleTheme: () => void, theme: string }} props - Propiedades del componente.
 */
const ThemeToogleButton = ({ toggleTheme, theme }) => {
  return (
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
  );
};

const App = () => {
  // Hook para gestionar el tema (claro/oscuro).
  const [theme, toggleTheme] = useTheme();

  // Hook para gestionar la lógica de búsqueda con "debounce" (espera a que el usuario deje de escribir).
  const [searchTerm, setSearchTerm, debouncedSearchTerm] = useDebouncedSearch(
    "",
    300
  );
  // Hook que gestiona la obtención y el estado de los datos de los usuarios.
  const { users, status, error } = useUserFetching(debouncedSearchTerm);
  const dispatch = useDispatch();

  // Función para reintentar la carga de usuarios en caso de error.
  const handleRetry = () => {
    const currentTerm = debouncedSearchTerm;
    // Forzamos una nueva llamada a la API para reactivar el `useEffect` en el hook `useUserFetching`.
    if (searchTerm === currentTerm) {
      dispatch(fetchUsers(currentTerm));
    } else {
      setSearchTerm(currentTerm);
    }
  };

  /**
   * Este es un ejemplo de render function.
   * @returns {JSX.Element} El componente a renderizar.
   */
  const renderContent = () => {
    const isLoading = status === "loading" || status === "idle";

    if (isLoading) {
      return <SkeletonGrid />;
    }

    if (status === "failed") {
      // Si el error es 403, significa que la API de GitHub denegó el acceso (ej. límite de peticiones).
      if (error && error.status === 403) {
        return <NotFound searchTerm={debouncedSearchTerm} />;
      }
      return <ErrorDisplay message={error.message} onRetry={handleRetry} />;
    }

    if (status === "succeeded") {
      if (users && users.length > 0) {
        return <UserList users={users} />;
      }
      // Si la petición tuvo éxito pero no hay usuarios, muestra el componente NotFound.
      return <NotFound searchTerm={debouncedSearchTerm} />;
    }

    return null; // No debería llegar aquí en un flujo normal.
  };

  return (
    <main className="app">
      {/* 
              Invocación de componentes de React usando la sintaxis JSX estándar.
              Los datos se pasan como "props". Esta es la forma recomendada.
            */}
      <ThemeToogleButton toggleTheme={toggleTheme} theme={theme} />
      <PageHeader
        searchTerm={searchTerm}
        handleSearch={(e) => setSearchTerm(e.target.value)}
        isSearching={status === "loading"}
      />

      {/* 
              Llamada a una función de renderizado. Se usa para encapsular lógica
              compleja de renderizado condicional y mantener limpio el JSX principal.
            */}
      {renderContent()}
    </main>
  );
};

ThemeToogleButton.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
};

export default App;

ThemeToogleButton.displayName = "ThemeToogleButton";

App.displayName = "App";
