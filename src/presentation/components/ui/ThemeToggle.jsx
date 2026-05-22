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
        whileHover={{ scale: 1.05, y: -1 }}
        whileTap={{ scale: 0.92 }}
        onClick={toggleTheme}
        className="w-11 h-11 border border-app-glass-border rounded-full flex items-center justify-center bg-app-card backdrop-blur-xl text-app-text hover:bg-app-surface shadow-premium cursor-pointer transition-all duration-300 relative group overflow-hidden"
        aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        aria-pressed={isDark}
      >
        {/* Subtle hover glow circle */}
        <div className="absolute inset-0 bg-gradient-to-tr from-app-accent/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 15 }}
            >
              <Moon className="w-5 h-5 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]" aria-hidden="true" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, opacity: 0, scale: 0.6 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 15 }}
            >
              <Sun className="w-5 h-5 text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.3)]" aria-hidden="true" />
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
