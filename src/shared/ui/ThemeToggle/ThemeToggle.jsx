

import { Moon, Sun } from "lucide-react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "motion/react";


export const ThemeToggle = ({ theme, toggleTheme }) => {
  const isDark = theme === "dark";

  return (
    

    

    

    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full border border-border bg-surface text-text hover:text-accent hover:border-accent flex items-center justify-center shadow-sm cursor-pointer relative group overflow-hidden shrink-0 transition-colors duration-200"
      
      

      

      

      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      aria-pressed={isDark}
    >
      {}
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ rotate: -45, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 45, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className="w-4 h-4 text-accent animate-pulse" aria-hidden="true" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 45, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -45, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="w-4 h-4 text-accent" aria-hidden="true" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

ThemeToggle.propTypes = {
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

ThemeToggle.displayName = "ThemeToggle";

export default ThemeToggle;
