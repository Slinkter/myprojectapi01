import { useState, useEffect } from "react";

/**
 * Custom hook que detecta si un elemento es visible en el viewport.
 * @param {React.RefObject} elementRef - La referencia al elemento del DOM que se quiere observar.
 * @param {object} options - Opciones para el IntersectionObserver (threshold, root, rootMargin).
 * @param {number} options.threshold - Un número entre 0 y 1 que indica qué porcentaje del elemento debe estar visible para que se active.
 * @returns {boolean} - Devuelve `true` si el elemento está intersectando (visible), de lo contrario `false`.
 */
const useIntersectionObserver = (elementRef, { threshold = 0.1 } = {}) => {
    const [isIntersecting, setIsIntersecting] = useState(false);

    useEffect(() => {
        const card = elementRef.current;
        if (!card) return;
        // Actualiza el estado basado en si el elemento está o no en el viewport
        // Se crea una nueva instancia de IntersectionObserver.
        // Esta API del navegador permite observar de forma asíncrona los cambios
        // en la intersección de un elemento con un elemento ancestro o con el viewport.
        const observer = new IntersectionObserver(
            // El primer argumento es una función de callback que se ejecuta
            // cuando la visibilidad del elemento observado cambia.
            ([entry]) => {
                // El callback recibe una lista de entradas (IntersectionObserverEntry),
                // pero en este caso solo nos interesa la primera (y única).
                // `entry.isIntersecting` es un booleano que es `true` si el elemento
                // está actualmente intersectando el viewport (es decir, está visible).
                // Se actualiza el estado para reflejar si el elemento es visible o no.
                setIsIntersecting(entry.isIntersecting);
            },
            // El segundo argumento es un objeto de configuración.
            {
                // `threshold` define qué porcentaje de visibilidad del elemento
                // debe alcanzarse para que se ejecute el callback.
                // Por ejemplo, un `threshold` de 0.1 significa que el callback
                // se ejecutará cuando al menos el 10% del elemento sea visible.
                threshold,
            }
        );

        observer.observe(card);

        // Limpia el observador cuando el componente se desmonta
        return () => {
            observer.unobserve(card);
        };
    }, [elementRef, threshold]);

    return isIntersecting;
};

export default useIntersectionObserver;
