/**
 * @file UserSearch.jsx
 * @description
 * 📚 EXPLICACIÓN PARA JUNIORS: CICLO DE VIDA, HOISTING Y SCOPE
 * 
 * SECUENCIA DE EJECUCIÓN (CÓMO REACT ARMA ESTO):
 * 
 * [PASO 1] HOISTING (Elevación) DE IMPORTACIONES:
 * Antes de que cualquier código se ejecute, Javascript "eleva" (hoisting) todas las 
 * declaraciones 'import' al principio del archivo. Esto asegura que tengamos las 
 * dependencias (como la Fachada o los componentes visuales) listas en memoria global.
 */

// --- GLOBAL SCOPE (Alcance Global) ---
// Todo lo definido aquí está disponible para cualquier función de este archivo.
import { useUserSearchFacade, PageHeader } from "@/features/search-user";
import { SearchResults } from "@/widgets/search-results";
import { ErrorBoundary } from "@/shared";

/**
 * [PASO 2] DEFINICIÓN DEL COMPONENTE:
 * Creamos la función 'SearchPage'.
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

// [PASO 5] EXPORTACIÓN:
SearchPage.displayName = "SearchPage";
export default SearchPage;

