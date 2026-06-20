/**
 * @file SearchResults.jsx
 * @description Widget Orquestador para los Resultados de Búsqueda.
 * Centraliza la lógica de "Renderizado Condicional" (Conditional Rendering) aislando a la página 
 * de la responsabilidad de decidir qué componente pintar en cada momento.
 */

import PropTypes from "prop-types";

// UI Components
import { ErrorDisplay, log, useComponentProfiler } from "@/shared";
import SkeletonGrid from "./SkeletonGrid";
import UserList from "./UserList";
import { NotFoundPage as NotFound } from "@/pages/not-found";

/**
 * 🎓 CONCEPTO JUNIOR: Renderizado Condicional con Patrón Guardia (Guard Clauses)
 * Muchos principiantes usan un bloque `return ( isLoading ? <Carga /> : <Lista /> )` gigante, 
 * o peor aún, meten múltiples ternarios anidados.
 * Aquí usamos "Cláusulas de Guarda" (`if (condición) return...`). Esto lee como una lista de verificación de arriba hacia abajo.
 * Es muchísimo más limpio: "Si carga, dibuja esto y TERMINA. Si hay error, dibuja esto y TERMINA...".
 *
 * Componente Orquestador de Resultados de Búsqueda.
 *
 * @component
 * @param {Object} props - Propiedades inyectadas por la página.
 * @param {boolean} props.isLoading - Estado de carga activa.
 * @param {boolean} props.isError - Indica si la petición falló.
 * @param {Object} props.error - Objeto de error técnico (si existe).
 * @param {boolean} props.isSuccess - Indica si la petición fue exitosa.
 * @param {boolean} props.isEmpty - Indica si la respuesta llegó vacía (0 resultados).
 * @param {Array} props.users - El arreglo de perfiles de usuario.
 * @param {string} props.debouncedSearchTerm - El término de búsqueda que produjo este resultado.
 * @param {Function} props.handleRetry - Función para reintentar la búsqueda en caso de error.
 * @returns {JSX.Element|null} El componente apropiado para el estado actual de la red.
 */
const SearchResults = (props) => {
  useComponentProfiler(
    "SearchResults",
    "🧩 [PASO 4B: Widget Component] Montando SearchResults (Orquestador)"
  );

  const {
    isLoading,
    isError,
    error,
    isSuccess,
    isEmpty,
    users,
    debouncedSearchTerm,
    handleRetry,
  } = props;
  
  // 1. Estado de Carga (Prioridad Máxima)
  if (isLoading) return <SkeletonGrid />;

  // 2. Estado de Error (con delegación especial para Límites de Tasa de API - HTTP 403)
  if (isError) {
    return (
      <ErrorDisplay
        message={error?.message || "Algo salió mal al consultar GitHub"}
        status={error?.status}
        onRetry={handleRetry}
      />
    );
  }

  // 3. Estado de Éxito (Derivaciones: Vacío vs Con Datos)
  if (isEmpty) return <NotFound searchTerm={debouncedSearchTerm} />;
  if (isSuccess) return <UserList userList={users} />;

  // 4. Fallback por si ninguno de los estados anteriores se cumple.
  return null;
};

SearchResults.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  error: PropTypes.shape({
    status: PropTypes.number,
    message: PropTypes.string,
  }),
  isSuccess: PropTypes.bool.isRequired,
  isEmpty: PropTypes.bool.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  debouncedSearchTerm: PropTypes.string.isRequired,
  handleRetry: PropTypes.func.isRequired,
};

SearchResults.displayName = "SearchResults";

export default SearchResults;
