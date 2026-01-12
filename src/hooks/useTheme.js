/**
 * @file Theme Management Hook
 * @description
 * Custom hook for managing application theme (light/dark mode).
 * Provides theme state and toggle functionality with localStorage persistence.
 */

import { useState, useEffect } from "react";

/**
 * Custom hook for managing application theme
 *
 * @hook
 * @function useTheme
 * @returns {[string, Function]} Tuple containing current theme and toggle function
 * @returns {string} returns[0] - Current theme ('light' | 'dark')
 * @returns {Function} returns[1] - Function to toggle between themes
 *
 * @description
 * Manages the application's color theme with the following features:
 * - Persists user preference in localStorage
 * - Detects system color scheme preference on first load
 * - Updates document root class for CSS theme switching
 * - Defaults to light theme if no preference is found
 *
 * Theme Priority:
 * 1. Saved theme from localStorage
 * 2. System preference (prefers-color-scheme)
 * 3. Default to 'light'
 *
 * @example
 * function App() {
 *   const [theme, toggleTheme] = useTheme();
 *
 *   return (
 *     <div>
 *       <p>Current theme: {theme}</p>
 *       <button onClick={toggleTheme}>Toggle Theme</button>
 *     </div>
 *   );
 * }
 */
export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    // 1. Check for saved theme in localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme;
    }
    // 2. If no saved theme, check system preference
    const prefersDark = window.matchMedia?.(
      "(prefers-color-scheme: dark)"
    ).matches;
    // 3. Default to light theme if no system preference
    return prefersDark ? "dark" : "light";
  });

  /**
   * Toggles between light and dark themes
   * @function toggleTheme
   */
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Effect to update localStorage and HTML class when theme changes
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return [theme, toggleTheme];
};
