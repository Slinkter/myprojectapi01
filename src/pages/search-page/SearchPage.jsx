/**
 * @file SearchPage.jsx
 * @description Componente Página que representa la pantalla de búsqueda principal.
 * Coordina las features (Buscador) y widgets (Resultados) inyectándoles el estado del Facade.
 */

import { useUserSearchFacade, PageHeader } from "@/features/search-user";
import { SearchResults } from "@/widgets/search-results";
import { ErrorBoundary, log, useComponentProfiler } from "@/shared";

/**
 * 🎓 CONCEPTO JUNIOR: Smart Components (Componentes Inteligentes o Contenedores)
 * `SearchPage` es un "Smart Component". No sabe cómo dibujar un botón bonito ni cómo animar una tarjeta.
 * Su único trabajo es llamar al Facade (`useUserSearchFacade`) para obtener los "datos e inteligencia" 
 * y luego pasárselos como "props" a los "Dumb Components" (`PageHeader` y `SearchResults`) para que ellos lo dibujen.
 * Esto mantiene el código extremadamente ordenado y fácil de testear.
 *
 * Componente principal de la vista de Búsqueda.
 *
 * @component
 * @returns {JSX.Element} Vista completa de la página de búsqueda.
 */
const SearchPage = () => {
  useComponentProfiler(
    "SearchPage",
    "🖥️ [PASO 3A: SearchPage] Montando la página de búsqueda principal"
  );
  
  // 1. Obtenemos todo el estado y la lógica de negocio del Facade.
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

  // 2. Orquestamos la vista inyectando las props.
  return (
    <>
      {/* Componente tonto que dibuja la caja de texto y dispara el evento handleSearch */}
      <PageHeader
        isSearching={isLoading}
        searchTerm={searchTerm}
        handleSearch={(e) => setSearchTerm(e.target.value)}
      />

      <ErrorBoundary>
        {/* Componente inteligente de UI que decide qué pintar según el estado (Error, Esqueleto o Lista) */}
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
