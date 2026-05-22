/**
 * @file App.jsx
 * @description
 * Componente raíz de la aplicación que configura la estructura de rutas (routing) y el diseño global.
 * Administra el estado del tema (claro/oscuro) y provee la navegación entre diferentes vistas.
 */
import { Routes, Route, Navigate, Link } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Toaster } from "sonner";
import { useTheme } from "@/application/hooks/useTheme.js";
import { ThemeToggle } from "@/presentation/components/ui/ThemeToggle";
import { log } from "@/infrastructure/logger/logger";
import ErrorBoundary from "@/presentation/components/common/ErrorBoundary";
import SkeletonGrid from "@/presentation/features/users/components/SkeletonGrid";
import { Globe } from "lucide-react";

// Lazy loading components (Suspense Pattern)
const UserSearch = lazy(() => import("@/presentation/features/users/UserSearch.jsx"));
const UserDetail = lazy(() => import("@/presentation/features/user-detail/UserDetail.jsx"));

/**
 * Main Application Component (Resilience Refactor with Tailwind-inspired Navbar)
 */
const App = () => {
  // Hook for managing the theme (light/dark mode) with localStorage persistence
  const [theme, toggleTheme] = useTheme();

  log.state("App Theme", theme);

  return (
    <div className="w-full min-h-screen bg-transparent flex flex-col items-center">
      <Toaster position="top-center" theme={theme} expand={false} richColors />
      
      {/* Sticky Header Nav Bar - Styled just like Tailwind CSS website */}
      <header className="w-full border-b border-app-border bg-app-surface/80 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-3.5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-app-accent to-indigo-600 flex items-center justify-center text-white font-mono font-bold text-xs shadow-sm">
              &lt;/&gt;
            </div>
            <span className="font-bold text-sm sm:text-base tracking-tight text-app-text group-hover:text-app-accent transition-colors">
              GitExplorer
            </span>
            <span className="tech-badge border-app-accent/30 text-app-accent! ml-0.5 select-none hidden xs:inline-block">
              v4.0.0
            </span>
          </Link>
          
          <div className="flex items-center gap-4 sm:gap-6">
            <a 
              href="https://github.com/Slinkter/myprojectapi01/blob/main/src/docs/02-Arquitectura-y-Patrones.md" 
              target="_blank" 
              rel="noreferrer" 
              className="text-xs font-semibold text-app-muted hover:text-app-text transition-colors hidden sm:inline-block"
            >
              Docs
            </a>
            <a 
              href="https://github.com/Slinkter/myprojectapi01" 
              target="_blank" 
              rel="noreferrer" 
              className="text-xs font-semibold text-app-muted hover:text-app-text transition-colors"
            >
              Architecture
            </a>
            <div className="w-[1px] h-4 bg-app-border" />
            
            <a 
              href="https://github.com/Slinkter/myprojectapi01" 
              target="_blank" 
              rel="noreferrer" 
              className="text-app-muted hover:text-app-text transition-colors p-1"
              aria-label="GitHub Repository"
            >
              <Globe size={18} />
            </a>

            <ThemeToggle toggleTheme={toggleTheme} theme={theme} />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="w-full max-w-screen-xl px-6 md:px-12 py-8 pb-24 flex-1">
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
    </div>
  );
};

export default App;

App.displayName = "App";
