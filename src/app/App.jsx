import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import {
  useTheme,
  ErrorBoundary,
  ThemeToggle,
  queryClient,
  useMsw,
} from "@/shared";

const SearchPage = lazy(() => import("@/pages/search-page/SearchPage.jsx"));
const DetailPage = lazy(() => import("@/pages/detail-page/DetailPage.jsx"));

/**
 * [PASO 2: App Shell & Providers Setup]
 * Orquesta la estructura global del Virtual DOM envolviendo el árbol bajo los proveedores
 * necesarios de red (TanStack Query), ruteo (React Router DOM) y temas CSS.
 *
 * @component
 * @returns {JSX.Element} App provider framework shell.
 */
const App = () => {
  console.log(
    "📦 [PASO 2: App Shell] Renderizando providers globales (QueryClient, Router, Theme) e inicializando MSW...",
  );
  const [theme, toggleTheme] = useTheme();

  const isMswReady = useMsw();

  // No renderizar hasta que el build del entorno esté completado (MSW listo si es desarrollo)
  if (!isMswReady) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/myprojectapi01">
        <div className="w-full min-h-screen bg-bg bg-grid-pattern flex flex-col items-center relative">
          {/* Floating Theme Toggle (Apple style) */}
          <div className="absolute top-6 right-6 sm:top-8 sm:right-12 z-50">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>

          <Toaster
            position="top-center"
            theme={theme}
            expand={false}
            richColors
          />

          <div className="w-full max-w-7xl px-6 md:px-12 py-8 pb-24 flex-1 relative">
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<SearchPage />} />
                <Route path="/user/:login" element={<DetailPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </ErrorBoundary>
          </div>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;

App.displayName = "App";
