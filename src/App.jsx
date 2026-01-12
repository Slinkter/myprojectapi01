/**
 * @file Main Application Component
 * @description
 * Root component that sets up the application's routing structure and global layout.
 * Manages theme state and provides navigation between different views.
 */

import { Routes, Route } from "react-router-dom";
import { useTheme } from "@/hooks/useTheme.js";
import UserSearch from "@/features/users/UserSearch.jsx";
import UserDetail from "@/features/user-detail/UserDetail.jsx";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

/**
 * Main Application Component
 *
 * @component
 * @description
 * The root component of the application that provides:
 * - Global layout structure with responsive padding
 * - Theme management (light/dark mode)
 * - Client-side routing configuration
 *
 * Routes:
 * - `/` - User search page with infinite scroll
 * - `/user/:login` - Individual user detail page
 *
 * @returns {JSX.Element} The main application layout with routing
 *
 * @example
 * // Rendered in main.jsx
 * <App />
 */
const App = () => {
  // Hook for managing the theme (light/dark mode) with localStorage persistence
  const [theme, toggleTheme] = useTheme();

  return (
    <main className="relative min-h-dvh flex flex-col items-center p-4 sm:p-6">
      <ThemeToggle toggleTheme={toggleTheme} theme={theme} />

      <Routes>
        <Route path="/" element={<UserSearch />} />
        <Route path="/user/:login" element={<UserDetail />} />
      </Routes>
    </main>
  );
};

export default App;

App.displayName = "App";
