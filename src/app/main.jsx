/**
 * @file main.jsx
 * @description Punto de entrada principal (Entry Point) de la aplicación React.
 * Configura la renderización inicial del Virtual DOM hacia el DOM real.
 */

import ReactDOM from "react-dom/client";
import App from "@/app/App.jsx";
import "@/shared/styles/index.css";
import { log } from "@/shared";

/**
 * 🎓 CONCEPTO JUNIOR: React Virtual DOM & Mounting
 * React no manipula el HTML (DOM Real) directamente todo el tiempo porque es un proceso lento.
 * En su lugar, construye una representación en memoria llamada Virtual DOM (el componente `<App />`).
 * 
 * `ReactDOM.createRoot` es el puente que une ese Virtual DOM con el div vacío `<div id="root"></div>`
 * que existe en el archivo `index.html`. El método `.render()` toma tu código React JSX y lo "traduce"
 * a píxeles en la pantalla por primera vez (fase de Mounting).
 */
log.flow(
  "🚀 [PASO 1: React Mounting] Inicializando ReactDOM y renderizando el componente <App /> en el DOM real (#root)",
);
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
