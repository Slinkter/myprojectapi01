import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { useTheme } from "./hooks/useTheme.js";

const Main = () => {
    // Inicializa el tema aquí para que la clase dark/light esté presente en <html>
    // antes de que los componentes lazy se carguen.
    useTheme();
    return <App />;
};

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
