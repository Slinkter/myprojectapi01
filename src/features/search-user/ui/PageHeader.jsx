/**
 * @file PageHeader.jsx
 * @description Componente de presentación (Dumb Component) que renderiza la barra de búsqueda y el título principal.
 * No realiza peticiones de red por sí mismo; expone eventos para que un componente inteligente (Smart Component / Facade) los maneje.
 */

import { useState } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "motion/react";
import { Search, XCircle, Loader2 } from "lucide-react";
import { cn } from "@/shared/lib/utils/utils";
import { TAILWIND_STYLE_TOKENS, log } from "@/shared";

/**
 * 🎓 CONCEPTO JUNIOR: Componentes "Dumb" (Mudos / Presentacionales)
 * Este Spinner no guarda estado, ni pide datos a una API. Solo sabe cómo dibujarse y rotar.
 * Lo hace súper reutilizable en toda la app.
 */
const Spinner = ({ className }) => {
  return <Loader2 className={cn("animate-spin", className)} />;
};

Spinner.propTypes = {
  className: PropTypes.string,
};

/**
 * 🎓 CONCEPTO JUNIOR: Controlled Components (Componentes Controlados)
 * Mira cómo el `input` abajo tiene `value={searchTerm}` y `onChange={handleSearch}`.
 * El input no guarda lo que escribes por su cuenta. Delega toda la responsabilidad a React.
 * A esto se le llama ser un Componente Controlado: React tiene la verdad absoluta de lo que hay escrito,
 * y nos lo pasa a través de las "props".
 *
 * Componente PageHeader (Buscador).
 * Implementa animaciones y micro-interacciones visuales para mejorar la Experiencia de Usuario (UX).
 *
 * @component
 * @param {Object} props - Propiedades inyectadas por el Facade padre.
 * @param {string} props.searchTerm - El texto actual escrito en la barra de búsqueda.
 * @param {Function} props.handleSearch - Handler que se ejecuta cada vez que el usuario teclea.
 * @param {boolean} props.isSearching - Indica si hay una petición a la API en curso (dibuja el spinner).
 * @returns {JSX.Element} Encabezado de la página de búsqueda.
 */
const PageHeader = ({ searchTerm, handleSearch, isSearching }) => {
  log.flow(
    "🧩 [PASO 4A: Feature Component] Montando PageHeader (Buscador)...",
  );

  // Estado puramente visual/local. Solo sirve para saber si el borde del input debe pintarse de color brillante.
  const [isFocused, setIsFocused] = useState(false);

  return (
    <header className="flex flex-col w-full items-center gap-y-8 py-10 sm:py-14 mb-4 relative">
      <div className="text-center space-y-6 max-w-2xl mx-auto px-4">
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 80 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tight leading-[1.1]"
          >
            Explora el{" "}
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              network
            </span>
            <br />
            de GitHub
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base text-text-mute max-w-md mx-auto leading-relaxed"
          >
            Busca perfiles, organizaciones y descubre desarrolladores en tiempo
            real.
          </motion.p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="w-full max-w-lg px-4 sm:px-0"
      >
        <div
          className={cn(
            TAILWIND_STYLE_TOKENS.input,
            isFocused && "border-accent", // Fusión de clases dinámica según el estado del foco
          )}
        >
          {isSearching ? (
            <Spinner className="text-accent text-lg" aria-hidden="true" />
          ) : (
            <motion.div
              animate={isFocused ? { scale: 1.05 } : { scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className={cn(
                "transition-colors duration-200",
                isFocused ? "text-accent" : "text-text-mute",
              )}
            >
              <Search className="text-base" aria-hidden="true" />
            </motion.div>
          )}

          <input
            type="text"
            className="flex-1 bg-transparent border-none outline-none text-sm sm:text-base text-text placeholder:text-text-mute/40 font-medium selection:bg-accent/20"
            placeholder="Buscar usuarios..."
            value={searchTerm}
            onChange={handleSearch}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            aria-label="Buscar usuarios de GitHub"
          />

          <AnimatePresence>
            {searchTerm ? (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                // Emulamos un evento de "input" falso pasándole target.value vacío para limpiar el buscador
                onClick={() => handleSearch({ target: { value: "" } })}
                className="text-text-mute hover:text-text transition-colors cursor-pointer"
                aria-label="Limpiar búsqueda"
              >
                <XCircle size={18} aria-hidden="true" />
              </motion.button>
            ) : (
              <div className="hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded border border-border bg-bg text-[9px] font-mono text-text-mute font-medium select-none shrink-0">
                <span>⌘</span>
                <span>K</span>
              </div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </header>
  );
};

// 🎓 CONCEPTO JUNIOR: PropTypes
// Sirven para proteger al componente de que se le pasen "tipos" equivocados.
// Si alguien intenta mandar isSearching="sí" (string) en vez de boolean, React gritará en consola en Modo Desarrollo.
PageHeader.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
  isSearching: PropTypes.bool.isRequired,
};

export default PageHeader;
