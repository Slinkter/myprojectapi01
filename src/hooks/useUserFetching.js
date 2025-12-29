import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../features/users/usersSlice";

/**
 * @hook useUserFetching
 * @description Hook personalizado para gestionar la obtención de datos de usuarios.
 * Este hook ahora inicia la carga de usuarios al montar el componente (con una lista por defecto si 'text' está vacío)
 * y también gestiona la búsqueda en tiempo real. Abstrae la lógica de despacho de acciones de Redux
 * y la selección de estado, exponiendo únicamente los datos y el estado de la petición.
 *
 * @param {string} text - El término de búsqueda "debounced". Si está vacío (""), se obtiene una lista de usuarios por defecto.
 *                      De lo contrario, dispara la búsqueda de la API con el término proporcionado.
 * @returns {object} - Un objeto con el estado de la petición:
 *   - `users` (Array): La lista de usuarios obtenida.
 *   - `status` (string): El estado actual de la petición ('idle', 'loading', 'succeeded', 'failed').
 *   - `error` (object|null): El objeto de error si la petición falla.
 */
export const useUserFetching = (text) => {
    // Renombramos 'isLoading' a 'status' para más claridad,
    // ya que contiene el estado real de la carga.
    const {
        users = [],
        isLoading: status,
        error,
    } = useSelector((state) => state.users || {});
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers(text));
    }, [text, dispatch]);

    console.log("useUserFetching - users:", users);
    console.log("useUserFetching - status (from redux):", status);
    console.log("useUserFetching - error:", error);

    // Devolvemos directamente el estado de Redux, que es la fuente de verdad.
    return { users, status, error };
};
