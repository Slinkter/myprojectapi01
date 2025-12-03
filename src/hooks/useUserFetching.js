import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../features/users/usersSlice';

/**
 * @hook useUserFetching
 * @description Hook personalizado para gestionar la obtención de datos de usuarios.
 * Abstrae la lógica de despacho de acciones de Redux y la selección de estado,
 * exponiendo únicamente los datos y el estado de la petición.
 *
 * @param {string} debouncedSearchTerm - El término de búsqueda "debounced", que dispara la llamada a la API.
 * @returns {object} - Un objeto con el estado de la petición:
 *   - `users` (Array): La lista de usuarios obtenida.
 *   - `status` (string): El estado actual de la petición ('idle', 'loading', 'succeeded', 'failed').
 *   - `error` (string|null): El mensaje de error si la petición falla.
 */
export const useUserFetching = (debouncedSearchTerm) => {
    const dispatch = useDispatch();

    const { users, isLoading, error } = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(fetchUsers(debouncedSearchTerm));
    }, [debouncedSearchTerm, dispatch]);

    const status = isLoading; // Renombramos para consistencia

    return { users, status, error };
};
