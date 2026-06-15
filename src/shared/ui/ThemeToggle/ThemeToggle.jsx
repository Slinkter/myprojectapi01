/**
 * @file ThemeToggle.jsx
 * @description Botón accesible que alterna entre temas claros y oscuros de la app.
 * Implementa micro-animaciones (motion/react) de tipo resorte rotacional y transiciones de íconos cruzados (Sun/Moon).
 */

import { Moon, Sun } from "lucide-react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "motion/react";

/**
 * Componente botón para alternar el tema visual de la aplicación.
 *
 * @component
 * @param {Object} props - Propiedades inyectadas por el componente padre.
 * @param {string} props.theme - Tema activo de la app ('light' o 'dark').
 * @param {Function} props.toggleTheme - Función manejadora (Event Handler) que invierte el tema al hacer clic.
 * @returns {JSX.Element} Botón interactivo y accesible.
 * 
 * @example
 * ```tsx
 * const [theme, toggleTheme] = useTheme();
 * <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
 * ```
 */
export const ThemeToggle = ({ theme, toggleTheme }) => {
  const isDark = theme === "dark";

  return (
    // 🎓 CONCEPTO JUNIOR: Componentes "Animados" (Higher-Order Components)
    // <motion.button> no es HTML estándar. Es un componente especial de la librería Framer Motion 
    // que hereda todas las propiedades de <button> pero le añade física realista (spring animations).
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full border border-border bg-surface text-text hover:text-accent hover:border-accent flex items-center justify-center shadow-sm cursor-pointer relative group overflow-hidden shrink-0 transition-colors duration-200"
      
      // 🎓 CONCEPTO JUNIOR: Accesibilidad Web (a11y)
      // aria-label: Le dice a los lectores de pantalla (para personas ciegas) qué hace el botón (ya que solo tiene un icono, sin texto).
      // aria-pressed: Le avisa a la tecnología de asistencia si el "interruptor" está encendido o apagado.
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      aria-pressed={isDark}
    >
      {/* 
        AnimatePresence permite que los elementos "hijos" ejecuten una animación de salida (exit) 
        ANTES de ser removidos del DOM. React nativo normalmente elimina componentes instantáneamente.
      */}
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
