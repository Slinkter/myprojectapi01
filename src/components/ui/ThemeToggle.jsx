/**
 * @file Theme Toggle Component
 * @description UI component for toggling between light and dark themes.
 */

import { MdDarkMode, MdLightMode } from "react-icons/md";
import PropTypes from "prop-types";

export const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <div className="fixed top-6 right-6 z-50">
      <button
        onClick={toggleTheme}
        className="rounded-full p-2 bg-gray-100 dark:bg-dark-surface border border-gray-200 dark:border-dark-border cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <MdDarkMode className="w-5 h-5 text-dark-muted" />
        ) : (
          <MdLightMode className="w-5 h-5 text-gray-600" />
        )}
      </button>
    </div>
  );
};

ThemeToggle.propTypes = {
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};
