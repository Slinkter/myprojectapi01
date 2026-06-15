/**
 * @file useMsw.js
 * @description Hook especializado para arrancar Mock Service Worker (MSW).
 * MSW sirve para interceptar las peticiones API y devolver datos de mentira en desarrollo,
 * ahorrándonos consumo del límite de Github API.
 */

import { useState, useEffect } from "react";

/**
 * 🎓 CONCEPTO JUNIOR: "Dynamic Imports" (Importaciones Dinámicas) y "Bundle Splitting"
 * Fíjate que el estado se llama `isReady`. ¿Por qué la app debe esperar para renderizar?
 * Porque MSW intercepta la red. Si React hace una petición antes de que MSW encienda, la petición escaparía hacia internet.
 * Además, verás un `await import()`. Normalmente los `import` van arriba del todo (estáticos), pero al usar
 * un `import()` con paréntesis (dinámico) logramos que el código de MSW NUNCA viaje en el paquete
 * final de producción de los usuarios reales, haciendo que la web cargue muchísimo más rápido en producción.
 *
 * @hook
 * @function useMsw
 * @returns {boolean} isReady - Será falso mientras el worker carga. Cambia a verdadero cuando ya es seguro hacer peticiones.
 * 
 * @example
 * ```typescript
 * // En src/app/main.jsx
 * const isMswReady = useMsw();
 * 
 * // No pinto <App /> hasta que isMswReady sea true.
 * if (!isMswReady) return <Loading />
 * return <App />
 * ```
 */
export const useMsw = () => {
  // 1. Verificamos si Vite (nuestro empaquetador) nos dice que estamos en Modo Desarrollo.
  const isDev = import.meta.env.MODE === "development";
  
  // Si estamos en Producción (!isDev es true), el entorno ya está listo porque no instalaremos MSW.
  // Si estamos en Dev, isReady empieza en false porque MSW tiene que arrancar.
  const [isReady, setIsReady] = useState(!isDev);

  useEffect(() => {
    if (isDev) {
      // 🎓 CONCEPTO JUNIOR: Efectos Asíncronos (Async useEffect)
      // useEffect NO permite devolver una Promesa directamente. (Ej: `useEffect(async () => {})` está prohibido en React).
      // Para ejecutar código asíncrono, DEBEMOS crear una función async adentro y luego mandarla a llamar.
      const initMocks = async () => {
        try {
          // Importación dinámica. Vite entiende esto y divide el código (Code Splitting).
          const { worker } = await import("@/shared/mocks/browser");

          // MSW inyecta un Service Worker en el navegador. Un Service Worker actúa como un policía de tránsito:
          // detiene las peticiones fetch de la app, y si tiene datos de mentira configurados (handlers), los devuelve directamente.
          await worker.start({
            // onUnhandledRequest="bypass" le dice a MSW: "Si la app pide una imagen o algo que no hemos simulado, déjalo pasar a internet sin quejarte en la consola".
            onUnhandledRequest: "bypass",
            serviceWorker: {
              // El Service Worker se descarga del archivo public/mockServiceWorker.js
              url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
            },
          });
          
          // Terminó de arrancar. Avisamos a React que ya puede pintar los componentes visuales.
          setIsReady(true);
        } catch (error) {
          console.error("[MSW] Falló al intentar encender los mocks:", error);
          // 🎓 CONCEPTO JUNIOR: Graceful Degradation (Degradación grácil)
          // Si por alguna razón MSW explota (archivo borrado, navegador no compatible), 
          // igual cambiamos a true. Esto permite que la app funcione e intente golpear la API real en vez de dejar la pantalla en blanco por siempre.
          setIsReady(true);
        }
      };
      
      // Ejecutamos la función asíncrona que acabamos de crear.
      initMocks();
    }
  }, [isDev]); // Se reevaluará solo si isDev cambia (lo cual casi nunca ocurre en tiempo real).

  return isReady;
};
