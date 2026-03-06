/**
 * @file Theme Toggle Component (Minimalist v4)
 */

import { MdDarkMode, MdLightMode } from "react-icons/md";
import PropTypes from "prop-types";

export const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <div className="fixed top-6 right-6 z-[100]">
      <button
        onClick={toggleTheme}
        className="w-10 h-10 border border-app-border rounded-full flex items-center justify-center bg-app-surface text-app-text hover:bg-app-accent hover:text-white transition-all cursor-pointer"
        aria-label="Alternar tema"
      >
        {theme === "dark" ? (
          <MdDarkMode className="w-5 h-5" />
        ) : (
          <MdLightMode className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};

ThemeToggle.propTypes = {
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};
