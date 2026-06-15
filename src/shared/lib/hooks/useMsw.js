import { useState, useEffect } from "react";

/**
 * [PASO 1A: Mock Service Worker Initialization Hook]
 * Custom hook to initialize the MSW interceptor in development environment.
 * Dynamically imports the worker to prevent bundling in production mode.
 *
 * @returns {boolean} isReady - True if the environment is initialized (MSW started or bypassed in production).
 */
export const useMsw = () => {
  const isDev = import.meta.env.MODE === "development";
  const [isReady, setIsReady] = useState(!isDev);

  useEffect(() => {
    if (isDev) {
      const initMocks = async () => {
        try {
          // 👈 Importación dinámica: Carga MSW solo en desarrollo. Evita que se incluya en el build de producción.
          const { worker } = await import("@/shared/mocks/browser");

          // 👈 Inicia el interceptor. No pide datos ahora, sino que activa el Service Worker como un proxy local de red.
          await worker.start({
            // 👈 bypass: Si la URL no está en handlers.js (ej. Google Fonts), viaja directo a internet sin advertencias.
            onUnhandledRequest: "bypass",
            serviceWorker: {
              // 👈 Prefija con BASE_URL para localizar el script correctamente en la subruta de GitHub Pages.
              url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
            },
          });
          setIsReady(true); // 👈 Entorno listo. Permite continuar con el renderizado del árbol React.
        } catch (error) {
          console.error("[MSW] Failed to enable mocking:", error);
          setIsReady(true); // 👈 Fallback: Permite renderizar igual para intentar conectar con la API real de GitHub.
        }
      };
      initMocks();
    }
  }, [isDev]);

  return isReady;
};
