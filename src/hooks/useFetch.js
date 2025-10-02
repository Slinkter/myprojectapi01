// src/hooks/useFetch.js

import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook para realizar peticiones de datos a una API.
 * Gestiona los estados de carga, error y los datos obtenidos.
 * @param {string} url - La URL de la API a la que se realizará la petición.
 * @returns {{data: any, isLoading: boolean, error: Error | null, refetch: function}} - Un objeto con los datos, el estado de carga, el error y una función para reintentar.
 */
export const useFetch = (url) => {
    // Estado para almacenar los datos obtenidos de la API
    const [data, setData] = useState(null);
    // Estado para indicar si la petición está en curso
    const [isLoading, setIsLoading] = useState(true);
    // Estado para almacenar cualquier error que ocurra durante la petición
    const [error, setError] = useState(null);

    // Función memorizada para realizar la petición a la API
    const fetchData = useCallback(async () => {
        setIsLoading(true); // Activa el estado de carga
        setError(null); // Limpia cualquier error previo
        try {
            const response = await fetch(url); // Realiza la petición
            if (!response.ok) {
                // Si la respuesta no es exitosa (ej. 404, 500)
                throw new Error(
                    `HTTP error! status: ${response.status} - ${response.statusText}`
                ); // Lanza un error
            }
            const result = await response.json(); // Parsea la respuesta JSON
            setData(result); // Almacena los datos
        } catch (err) {
            setError(err); // Almacena el error
        } finally {
            setIsLoading(false); // Desactiva el estado de carga, siempre
        }
    }, [url]); // La función se recrea solo si la URL cambia

    // `useEffect` para ejecutar la petición cuando el componente que usa el hook se monta
    useEffect(() => {
        fetchData(); // Llama a la función para obtener los datos
    }, [fetchData]); // Se ejecuta cuando `fetchData` cambia (que solo ocurre si `url` cambia)

    // Retorna los estados y datos para que el componente los utilice
    return { data, isLoading, error, refetch: fetchData };
};
