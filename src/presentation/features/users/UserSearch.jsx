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
import { useUserSearchFacade } from "@/application/facades/useUserSearchFacade";

import PageHeader from "@/presentation/components/layout/PageHeader";
import SearchResults from "@/presentation/features/users/components/SearchResults";

/**
 * [PASO 2] DEFINICIÓN DEL COMPONENTE:
 * Creamos la función 'UserSearch'. En React, un componente es solo una función
 * de Javascript que retorna HTML (JSX).
 */
const UserSearch = () => {
  // --- LOCAL SCOPE (Alcance Local del Componente) ---
  // Las variables que creamos aquí adentro SOLO existen mientras el componente
  // se está dibujando en la pantalla. Si el componente se desmonta, se borran.

  // [PASO 3] EJECUCIÓN DE HOOKS:
  // React entra al componente y lo primero que hace es ejecutar sus Hooks.
  // Aquí llamamos a nuestra Fachada. React pausa un milisegundo y conecta nuestro
  // componente con la lógica de estado de TanStack Query y el Debounce.
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

  // [PASO 4] RENDERIZADO (RETORNAR JSX):
  // Una vez que tenemos los datos en el "Scope Local", React lee este 'return'.
  // Analiza las etiquetas (<PageHeader />, <SearchResults />) y "arma" las piezas
  // inyectándoles nuestras variables locales como propiedades (props).
  // Finalmente, React toma este bloque armado y lo inyecta en el DOM del navegador.
  return (
    <>
      <PageHeader
        isSearching={isLoading}
        searchTerm={searchTerm}
        handleSearch={(e) => setSearchTerm(e.target.value)}
      />
      
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
    </>
  );
};

// [PASO 5] EXPORTACIÓN:
// Hacemos que esta función esté disponible para que 'App.jsx' la pueda importar.
UserSearch.displayName = "UserSearch";
export default UserSearch;

