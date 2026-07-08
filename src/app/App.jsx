/**
 * @file App.jsx
 * @description Componente raíz y contenedor principal de la aplicación. Configura los proveedores
 * de estado global (TanStack Query), los estilos de temas y el enrutador de páginas SPA.
 */

import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
import {
  useTheme,
  ErrorBoundary,
  ThemeToggle,
  queryClient,
} from "@/shared";

/**
 * 🎓 CONCEPTO JUNIOR: Proveedores (Providers) y Carga Diferida (Lazy Loading)
 * 1. Los Providers envuelven el árbol de componentes para distribuir estado o configuraciones 
 *    (como consultas HTTP o temas de diseño) sin pasar propiedades manualmente elemento por elemento.
 * 2. React.lazy() permite cargar los componentes de las páginas por separado en bundles pequeños 
 *    bajo demanda, descargándolos solo cuando el usuario navega a esa ruta específica (reduciendo el tiempo inicial).
 */

const SearchPage = lazy(() => import("@/pages/search-page/SearchPage.jsx"));
const DetailPage = lazy(() => import("@/pages/detail-page/DetailPage.jsx"));

/**
 * Componente funcional raíz de la aplicación.
 * 
 * @component App
 * @returns {React.JSX.Element} Estructura principal de enrutamiento y estado.
 */
const App = () => {
  const [theme, toggleTheme] = useTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/myprojectapi01">
        <div className="w-full min-h-screen bg-bg bg-grid-pattern flex flex-col items-center relative">
          <div className="absolute top-6 right-6 sm:top-8 sm:right-12 z-50">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>

          <div className="w-full max-w-7xl px-6 md:px-12 py-8 pb-24 flex-1 relative">
            <ErrorBoundary>
              <Suspense
                fallback={
                  <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                  </div>
                }
              >
                <Routes>
                  <Route path="/" element={<SearchPage />} />
                  <Route path="/user/:login" element={<DetailPage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </div>

          <Toaster
            position="bottom-left"
            theme={theme}
            expand={false}
            richColors
          />
        </div>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
    </QueryClientProvider>
  );
};

export default App;

App.displayName = "App";
