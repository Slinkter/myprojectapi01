/**
 * @file Theme Toggle Component
 * @description
 * UI component for toggling between light and dark themes.
 * Features smooth icon transitions and visual feedback.
 */

import { IconButton } from "@material-tailwind/react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import PropTypes from "prop-types";

/**
 * Theme Toggle Component
 *
 * @component
 * @description
 * Floating button that toggles between light and dark themes.
 * Displays animated sun/moon icons with smooth transitions.
 *
 * Features:
 * - Fixed position in top-right corner
 * - Smooth icon rotation and fade transitions
 * - Glow effect matching current theme
 * - Hover and active state animations
 * - Accessible with aria-label
 *
 * Visual States:
 * - Light mode: Sun icon, white background, subtle shadow
 * - Dark mode: Moon icon, dark background, yellow glow
 *
 * @param {Object} props - Component props
 * @param {string} props.theme - Current theme ('light' | 'dark')
 * @param {Function} props.toggleTheme - Callback to toggle theme
 *
 * @returns {JSX.Element} Theme toggle button
 *
 * @example
 * <ThemeToggle
 *   theme={theme}
 *   toggleTheme={toggleTheme}
 * />
 */
export const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <div className="fixed top-6 right-6 z-50">
      <IconButton
        onClick={toggleTheme}
        variant="text"
        className={`
          relative flex items-center justify-center rounded-full p-2 transition-all duration-300 ease-in-out focus:outline-none
          hover:scale-110 active:scale-95
          ${
            theme === "dark"
              ? "bg-slate-800 text-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.3)] hover:shadow-[0_0_20px_rgba(250,204,21,0.5)] border border-slate-700"
              : "bg-white text-slate-700 shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_rgba(0,0,0,0.15)] border border-slate-200"
          }
        `}
        aria-label="Toggle theme"
      >
        <div className="relative w-6 h-6">
          <MdLightMode
            className={`absolute inset-0 w-full h-full transform transition-all duration-500 ${
              theme === "dark"
                ? "rotate-0 opacity-100 scale-100"
                : "rotate-90 opacity-0 scale-50"
            }`}
          />
          <MdDarkMode
            className={`absolute inset-0 w-full h-full transform transition-all duration-500 ${
              theme === "light"
                ? "rotate-0 opacity-100 scale-100"
                : "-rotate-90 opacity-0 scale-50"
            }`}
          />
        </div>
      </IconButton>
    </div>
  );
};

/**
 * PropTypes validation
 */
ThemeToggle.propTypes = {
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};
