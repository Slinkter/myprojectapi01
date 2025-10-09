import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App.jsx";
import "./index.css";

// Renderiza la aplicación en el elemento 'root' del DOM.
ReactDOM.createRoot(document.getElementById("root")).render(
    // El `Provider` de Redux envuelve la aplicación, permitiendo que cualquier
    // componente anidado acceda al `store` de Redux a través de hooks como `useSelector` y `useDispatch`.
    <Provider store={store}>
        <App />
    </Provider>
);
