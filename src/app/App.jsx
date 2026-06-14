import { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { useTheme, ErrorBoundary, ThemeToggle, queryClient } from "@/shared";
import { SkeletonGrid } from "@/widgets/search-results";

const SearchPage = lazy(() => import("@/pages/search-page/SearchPage.jsx"));
const DetailPage = lazy(() => import("@/pages/detail-page/DetailPage.jsx"));

/**
 * Componente Principal de la Aplicación
 *
 * Actúa como el Shell de la aplicación, orquestando:
 * 1. Inicialización de Mocks (MSW) en desarrollo.
 * 2. Providers globales (Query, Router, Theme).
 * 3. Enrutamiento dinámico.
 */
const App = () => {
  /**
   * Determinamos si estamos en entorno de desarrollo.
   * En desarrollo (pnpm dev), Vite establece MODE como 'development'.
   */
  const isDev = import.meta.env.MODE === "development";

  /**
   * Estado de construcción del entorno (isBuild).
   * - En PRODUCCIÓN: `true` (el entorno está construido e inmediato).
   * - En DESARROLLO: `false` (esperamos a que se 'construya' el entorno con MSW).
   */
  const [isBuild, setIsBuild] = useState(!isDev);
  const [theme, toggleTheme] = useTheme();

  // Inicialización de Mock Service Worker (MSW)
  useEffect(() => {
    if (isDev) {
      const initMocks = async () => {
        try {
          const { worker } = await import("@/shared/mocks/browser");
          await worker.start({
            onUnhandledRequest: "bypass",
            serviceWorker: {
              url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
            },
          });
          setIsBuild(true);
        } catch (error) {
          console.error("[MSW] Failed to enable mocking:", error);
          setIsBuild(true);
        }
      };
      initMocks();
    }
  }, [isDev]);

  // No renderizar hasta que el build del entorno esté completado
  if (!isBuild) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/myprojectapi01">
        <div className="w-full min-h-screen bg-bg flex flex-col items-center relative">
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

          <div className="w-full max-w-screen-xl px-6 md:px-12 py-8 pb-24 flex-1 relative">
            <ErrorBoundary>
              <Suspense fallback={<SkeletonGrid />}>
                <Routes>
                  <Route path="/" element={<SearchPage />} />
                  <Route path="/user/:login" element={<DetailPage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;

App.displayName = "App";
