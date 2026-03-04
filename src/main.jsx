/**
 * @file Application Entry Point
 * @description
 * Main entry point for the React application. This file is responsible for:
 * - Creating the React 18 root using ReactDOM.createRoot
 * - Setting up the Redux Provider to make the store available throughout the app
 * - Configuring React Router with BrowserRouter for client-side routing
 * - Rendering the root App component
 *
 * The application uses:
 * - React 18 concurrent features
 * - Redux Toolkit for state management
 * - React Router v6 for routing
 * - GitHub Pages deployment with basename configuration
 */

import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./app/store";
import App from "./App.jsx";
import "./index.css";

console.log("[ENTRY] main.jsx: Application starting...");

/**
 * Renders the application root.
 *
 * The Provider component from react-redux wraps the application, allowing any
 * nested component to access the Redux store through hooks like useSelector and useDispatch.
 *
 * BrowserRouter enables client-side routing with a basename configured for GitHub Pages deployment.
 */
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter basename="/myprojectapi01">
      <App />
    </BrowserRouter>
  </Provider>
);
