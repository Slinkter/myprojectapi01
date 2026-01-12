import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./app/store";
import App from "./App.jsx";
import "./index.css";

// El `Provider` de Redux envuelve la aplicación, permitiendo que cualquier
// componente anidado acceda al `store` de Redux a través de hooks como `useSelector` y `useDispatch`.
// BrowserRouter habilita el enrutamiento del lado del cliente.
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter basename="/myprojectapi01">
      <App />
    </BrowserRouter>
  </Provider>
);
