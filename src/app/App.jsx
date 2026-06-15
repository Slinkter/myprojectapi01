import { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { useTheme, ErrorBoundary, ThemeToggle, queryClient } from "@/shared";
import { SkeletonGrid } from "@/widgets/search-results";

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

  // Inicialización de Mock Service Worker (MSW) para desarrollo offline
  useEffect(() => {
    if (isDev) {
      const initMocks = async () => {
        try {
          // 👈 Importación dinámica: Carga MSW solo en desarrollo. Evita que se incluya en el build de producción.
          const { worker } = await import("@/shared/mocks/browser");
          
          // 👈 Inicia el interceptor. No pide datos ahora, sino que activa el Service Worker como un proxy local de red.
          await worker.start({
            // 👈 bypass: Si la URL no está en handlers.js (ej. Google Fonts), viaja directo a internet sin advertencias.
            onUnhandledRequest: "bypass",
            serviceWorker: {
              // 👈 Prefija con BASE_URL para localizar el script correctamente en la subruta de GitHub Pages.
              url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
            },
          });
          setIsBuild(true); // 👈 Entorno listo. Permite continuar con el renderizado del árbol React.
        } catch (error) {
          console.error("[MSW] Failed to enable mocking:", error);
          setIsBuild(true); // 👈 Fallback: Permite renderizar igual para intentar conectar con la API real de GitHub.
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
