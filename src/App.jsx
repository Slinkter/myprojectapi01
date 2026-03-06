/**
 * @file Main Application Component
 * @description
 * Root component that sets up the application's routing structure and global layout.
 * Manages theme state and provides navigation between different views.
 */
import { Routes, Route } from "react-router-dom";
import { useRef, Suspense, lazy } from "react";
import { useTheme } from "@/hooks/useTheme.js";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { log } from "@/app/logger";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import SkeletonGrid from "@/features/users/components/SkeletonGrid";

// Lazy loading components (Suspense Pattern)
const UserSearch = lazy(() => import("@/features/users/UserSearch.jsx"));
const UserDetail = lazy(() => import("@/features/user-detail/UserDetail.jsx"));

/**
 * Main Application Component (Resilience Refactor)
 */
const App = () => {
  const renderCount = useRef(1);
  log.render("App", renderCount.current);
  renderCount.current++;

  // Hook for managing the theme (light/dark mode) with localStorage persistence
  const [theme, toggleTheme] = useTheme();

  log.state("App Theme", theme);

  return (
    <main className="relative min-h-screen flex flex-col items-center py-12 pb-24 overflow-x-hidden">
      <ThemeToggle toggleTheme={toggleTheme} theme={theme} />

      <div className="w-full max-w-screen-xl px-6 md:px-12">
        <ErrorBoundary>
          <Suspense fallback={<SkeletonGrid />}>
            <Routes>
              <Route path="/" element={<UserSearch />} />
              <Route path="/user/:login" element={<UserDetail />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </div>
    </main>
  );
};

export default App;

App.displayName = "App";
