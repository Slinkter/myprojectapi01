/**
 * @file useIntersectionObserver.js
 * @description Hook personalizado que detecta cuándo un elemento entra en la porción visible (viewport) de la pantalla.
 * Utiliza la API nativa del navegador `IntersectionObserver` que es muchísimo más eficiente 
 * que rastrear eventos de `scroll`, ya que se ejecuta de forma asíncrona fuera del hilo principal.
 */

import { useState, useEffect } from "react";

/**
 * Hook para detectar la visibilidad de un elemento en el viewport del navegador.
 *
 * @hook
 * @function useIntersectionObserver
 * @param {import('react').RefObject<HTMLElement>} elementRef - Referencia de React al elemento DOM a observar.
 * @param {Object} [options={}] - Opciones de configuración para el Intersection Observer nativo.
 * @param {number} [options.threshold=0.1] - Porcentaje de visibilidad del elemento (0 a 1) requerido para disparar el evento.
 * @returns {boolean} Verdadero si el elemento está visible (interceptando), falso en caso contrario.
 *
 * @example
 * ```typescript
 * function LazyImage() {
 *   const imgRef = useRef(null);
 *   const isVisible = useIntersectionObserver(imgRef, { threshold: 0.5 }); // 50% visible
 *
 *   return (
 *     <div ref={imgRef}>
 *       {isVisible ? <img src="high-res.jpg" /> : <div className="placeholder" />}
 *     </div>
 *   );
 * }
 * ```
 */
const useIntersectionObserver = (elementRef, { threshold = 0.1 } = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const targetElement = elementRef.current;
    if (!targetElement) return;

    // Instanciamos el observador nativo del navegador.
    // Este delega el cálculo de posiciones al navegador, evitando reflows y cuellos de botella 
    // asociados a técnicas antiguas como getBoundingClientRect() en eventos "onScroll".
    const observer = new IntersectionObserver(
      ([entry]) => {
        // El callback recibe un arreglo de IntersectionObserverEntry.
        // Nos interesa el estado 'isIntersecting' que nos dice si cruzó el umbral.
        setIsIntersecting(entry.isIntersecting);
      },
      {
        // El 'threshold' define qué porcentaje del elemento debe ser visible para disparar la función.
        // Ej: 0.1 significa que cuando el 10% del elemento asome en pantalla, se considera visible.
        threshold,
      }
    );

    // Mandamos al observador a vigilar el elemento DOM
    observer.observe(targetElement);

    // Función de limpieza para evitar fugas de memoria (Memory Leaks) cuando el componente se destruye
    return () => {
      observer.unobserve(targetElement);
      observer.disconnect();
    };
  }, [elementRef, threshold]); // Re-ejecuta solo si cambia la referencia o el umbral

  return isIntersecting;
};

export default useIntersectionObserver;
