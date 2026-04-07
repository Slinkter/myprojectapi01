import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "@/App.jsx";
import "@/index.css";
import { STALE_TIME, GC_TIME } from "@/app/config";

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
 * Enable MSW mocking in development mode
 */
async function enableMocking() {
  if (import.meta.env.MODE !== "development") {
    return;
  }

  try {
    const { worker } = await import("@/mocks/browser");

    // `worker.start()` returns a Promise that resolves
    // once the Service Worker is up and ready to intercept requests.
    await worker.start({
      onUnhandledRequest: "bypass", // Bypass unhandled requests to actual API
      serviceWorker: {
        url: "/myprojectapi01/mockServiceWorker.js", // Explicitly set for GitHub Pages basename compatibility
      },
    });
    console.log("[MSW] Mocking enabled successfully.");
  } catch (error) {
    console.error("[MSW] Failed to enable mocking:", error);
  }
}

/**
 * Renders the application root.
 */
enableMocking().finally(() => {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/myprojectapi01">
        <App />
      </BrowserRouter>
    </QueryClientProvider>,
  );
});
