/**
 * @file App.jsx
 * @description
 * Componente raíz de la aplicación que configura la estructura de rutas (routing) y el diseño global.
 * Administra el estado del tema (claro/oscuro) y provee la navegación entre diferentes vistas.
 */
import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Toaster } from "sonner";
import { useTheme } from "@/application/hooks/useTheme.js";
import { ThemeToggle } from "@/presentation/components/ui/ThemeToggle";
import { log } from "@/infrastructure/logger/logger";
import ErrorBoundary from "@/presentation/components/common/ErrorBoundary";
import SkeletonGrid from "@/presentation/features/users/components/SkeletonGrid";

// Lazy loading components (Suspense Pattern)
const UserSearch = lazy(() => import("@/presentation/features/users/UserSearch.jsx"));
const UserDetail = lazy(() => import("@/presentation/features/user-detail/UserDetail.jsx"));

/**
 * Main Application Component (Resilience Refactor)
 */
const App = () => {
  // Hook for managing the theme (light/dark mode) with localStorage persistence
  const [theme, toggleTheme] = useTheme();

  log.state("App Theme", theme);

  return (
    <main className="relative min-h-screen flex flex-col items-center py-12 pb-24 overflow-x-hidden">
      <Toaster position="top-center" theme={theme} expand={false} richColors />
      <ThemeToggle toggleTheme={toggleTheme} theme={theme} />

      <div className="w-full max-w-screen-xl px-6 md:px-12">
        <ErrorBoundary>
          <Suspense fallback={<SkeletonGrid />}>
            <Routes>
              <Route path="/" element={<UserSearch />} />
              <Route path="/user/:login" element={<UserDetail />} />
              {/* Bug 3: Ruta fallback comodín (404/Redirect a Home) */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </div>
    </main>
  );
};

export default App;

App.displayName = "App";
