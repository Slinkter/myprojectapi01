/**
 * @file main.jsx
 * @description Punto de entrada principal de la aplicación React. Orquestador de la inicialización de
 * servicios locales (MSW) y el montaje del DOM.
 */

import ReactDOM from "react-dom/client";
import App from "@/app/App.jsx";
import "@/shared/styles/index.css";

/**
 * 🎓 CONCEPTO JUNIOR: Inicialización Asíncrona (Bootstraping)
 * Para que MSW intercepte las peticiones de red desde el primer segundo que carga la app, 
 * debemos esperar a que el Service Worker se active antes de renderizar React. 
 * Usamos una función asíncrona que retorna una Promesa para garantizar este orden.
 */

/**
 * Habilita el Mock Service Worker (MSW) en entornos locales de desarrollo.
 * Importa de manera dinámica el browser worker para evitar cargarlo en producción.
 * 
 * @async
 * @function enableMocking
 * @returns {Promise<ServiceWorkerRegistration|undefined>} Registro del Service Worker o promesa resuelta.
 * 
 * @example
 * ```javascript
 * enableMocking().then(() => {
 *   mountReactApp();
 * });
 * ```
 */
async function enableMocking() {
  if (import.meta.env.MODE !== "development") {
    return;
  }
  const { worker } = await import("@/shared/mocks/browser");
  return worker.start({
    onUnhandledRequest: "bypass",
    serviceWorker: {
      url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
    },
  });
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
});
