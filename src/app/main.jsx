import ReactDOM from "react-dom/client";
import App from "@/app/App.jsx";
import "@/shared/styles/index.css";

/**
 * [PASO 1: Virtual DOM Mount]
 * Inicialización de ReactDOM, vinculación al DOM Real (#root) y renderizado de la estructura Virtual DOM inicial.
 */
console.log(
  "🚀 [PASO 1: React Mounting] Inicializando ReactDOM y renderizando el componente <App /> en el DOM real (#root)",
);
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
