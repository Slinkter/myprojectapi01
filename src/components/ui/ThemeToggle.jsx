/**
 * @file Theme Toggle Component (v4 Semantic Refactor)
 */

import { MdDarkMode, MdLightMode } from "react-icons/md";
import PropTypes from "prop-types";

export const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <div className="fixed top-6 right-6 z-50">
      <button
        onClick={toggleTheme}
        className="btn-primary p-3 rounded-full shadow-premium hover:scale-110 active:scale-95 transition-all"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <MdDarkMode className="w-5 h-5 text-app-accent" />
        ) : (
          <MdLightMode className="w-5 h-5 text-app-accent" />
        )}
      </button>
    </div>
  );
};

ThemeToggle.propTypes = {
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};
