/**
 * Custom hook para realizar peticiones de datos a una API.
 * Gestiona los estados de carga, error y los datos obtenidos.
 * @param {string} url - La URL de la API a la que se realizará la petición.
 * @returns {{data: any, isLoading: boolean, error: Error | null, refetch: function}} - Un objeto con los datos, el estado de carga, el error y una función para reintentar.
 */
import { useState, useEffect, useCallback } from "react";

export const useFetch = (url) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    // Función memorizada para realizar la petición a la API
    const fetchData = useCallback(async () => {
        setIsLoading(true); // Activa el estado de carga
        setError(null); // Limpia cualquier error previo
        try {
            const response = await fetch(url); // Realiza la petición
            if (!response.ok) {
                // Si la respuesta no es exitosa (ej. 404, 500)
                const errorMessage = `HTTP error! status: ${response.status} - ${response.statusText}`;
                throw new Error(errorMessage); // Lanza un error
            }
            const result = await response.json(); // Parsea la respuesta JSON
            setData(result); // Almacena los datos
        } catch (err) {
            setError(err); // Almacena el error
        } finally {
            // Agregamos un pequeño retraso para asegurar que el esqueleto de carga sea visible
            // por un tiempo mínimo, mejorando la percepción de la transición.
            setTimeout(() => {
                setIsLoading(false); // Desactiva el estado de carga después del retraso
            }, 1500); // 1 segundo de retraso
        }
    }, [url]); // La función se recrea solo si la URL cambia

    // `useEffect` para ejecutar la petición cuando el componente que usa el hook se monta
    useEffect(() => {
        fetchData(); // Llama a la función para obtener los datos
    }, [fetchData]); // Se ejecuta cuando `fetchData` cambia (que solo ocurre si `url` cambia)

    // Retorna los estados y datos para que el componente los utilice
    return { data, isLoading, error, refetch: fetchData };
};
