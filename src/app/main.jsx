/**
 * @file main.jsx
 * @description Punto de entrada principal de la aplicación React. Orquestador de la inicialización de
 * servicios locales (MSW) y el montaje del DOM.
 */

import ReactDOM from "react-dom/client";
import App from "@/app/App.jsx";
import "@/shared/styles/index.css";

/**
 * 🎓 CONCEPTO JUNIOR: Await de Alto Nivel (Top-Level Await)
 * Tradicionalmente, solo podíamos usar 'await' dentro de funciones marcadas como 'async'.
 * Con JavaScript moderno y Vite, podemos usar 'await' directamente en el cuerpo global de un archivo.
 * Esto nos permite detener la ejecución del archivo secuencialmente hasta que el Service Worker 
 * de MSW esté activo, montando React inmediatamente después de forma limpia y sin bloques '.then()'.
 */

// Si estamos en desarrollo, esperamos a que MSW esté registrado y listo
if (import.meta.env.MODE === "development") {
  const { worker } = await import("@/shared/mocks/browser");
  await worker.start({
    onUnhandledRequest: "bypass",
    serviceWorker: {
      url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
    },
  });
}

// Una vez resuelto el bootstraping asíncrono, montamos la aplicación React
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
