import ReactDOM from "react-dom/client";
import App from "@/app/App.jsx";
import "@/shared/styles/index.css";

/**
 * Punto de entrada de la aplicación.
 * El componente App encapsula toda la lógica de inicialización y providers.
 */
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
