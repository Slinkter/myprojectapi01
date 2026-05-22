/**
 * @file ThemeToggle.jsx
 * @description Botón de alternancia de tema ultra-premium con desenfoque de fondo glass y animación de rotación fluida.
 */

import { Moon, Sun } from "lucide-react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "motion/react";

export const ThemeToggle = ({ theme, toggleTheme }) => {
  const isDark = theme === "dark";

  return (
    <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[100]">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleTheme}
        className="w-10 h-10 border border-app-border rounded-lg flex items-center justify-center bg-app-surface text-app-text hover:bg-app-bg shadow-sm cursor-pointer transition-all duration-200 relative group overflow-hidden"
        aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        aria-pressed={isDark}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 45, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Moon className="w-4 h-4 text-app-accent" aria-hidden="true" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -45, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Sun className="w-4 h-4 text-amber-600" aria-hidden="true" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

ThemeToggle.propTypes = {
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};
