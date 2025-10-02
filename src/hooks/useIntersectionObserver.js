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
        const element = elementRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                // Actualiza el estado basado en si el elemento está o no en el viewport
                setIsIntersecting(entry.isIntersecting);
            },
            { threshold }
        );

        observer.observe(element);

        // Limpia el observador cuando el componente se desmonta
        return () => {
            observer.unobserve(element);
        };
    }, [elementRef, threshold]);

    return isIntersecting;
};

export default useIntersectionObserver;
