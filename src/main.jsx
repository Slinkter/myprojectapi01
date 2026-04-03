

import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.jsx";
import "./index.css";
import { STALE_TIME, GC_TIME } from "./app/config";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALE_TIME,
      gcTime: GC_TIME,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

console.log("[ENTRY] main.jsx: Application starting...");

/**
 * Renders the application root.
 *
 * BrowserRouter enables client-side routing with a basename configured for GitHub Pages deployment.
 */
ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter basename="/myprojectapi01">
      <App />
    </BrowserRouter>
  </QueryClientProvider>,
);
