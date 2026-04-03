/**
 * @file Theme Toggle Component (Minimalist v4)
 */

import { Moon, Sun } from "lucide-react";
import PropTypes from "prop-types";

export const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <div className="fixed top-6 right-6 z-[100]">
      <button
        onClick={toggleTheme}
        className="w-10 h-10 border border-app-border rounded-full flex items-center justify-center bg-app-surface text-app-text hover:bg-app-text/5 active:scale-90 transition-all duration-200 cursor-pointer shadow-sm"
        aria-label="Alternar tema"
      >
        {theme === "dark" ? (
          <Moon className="w-5 h-5 text-yellow-400" />
        ) : (
          <Sun className="w-5 h-5 text-orange-500" />
        )}
      </button>
    </div>
  );
};

ThemeToggle.propTypes = {
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};
