/**
 * @file PageHeader.jsx
 * @description Componente de presentación para el héroe y cabecera de búsqueda principal.
 * Agrupa la caja de entrada (input), el indicador de cargando y escuchadores de atajos de teclado.
 */

import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "motion/react";
import { Search, XCircle, Loader2 } from "lucide-react";
import { cn, TAILWIND_STYLE_TOKENS } from "@/shared";

/**
 * 🎓 CONCEPTO JUNIOR: Referencias (Refs) y Escuchadores de Eventos del DOM
 * 1. useRef() crea un objeto persistente cuya propiedad '.current' apunta directamente al elemento del DOM real.
 *    Esto permite interactuar directamente con elementos HTML (ej: forzar el foco al input del teclado).
 * 2. window.addEventListener("keydown", ...): Escucha cualquier pulsación de teclas en la ventana global del navegador.
 *    Es obligatorio retornar una función de limpieza para remover el listener cuando el componente se desmonte.
 */

/**
 * Componente interno que renderiza el Spinner indicador de carga.
 * 
 * @component Spinner
 * @param {Object} props - Propiedades.
 * @param {string} [props.className] - Clases CSS adicionales.
 * @returns {React.JSX.Element} Icono animado de carga.
 */
const Spinner = ({ className }) => {
  return <Loader2 className={cn("animate-spin", className)} />;
};

Spinner.propTypes = {
  className: PropTypes.string,
};

/**
 * Cabecera y caja de búsqueda de usuarios con atajo de teclado adaptativo.
 * 
 * @component PageHeader
 * @param {Object} props - Propiedades.
 * @param {string} props.searchTerm - Valor escrito en el input.
 * @param {Function} props.handleSearch - Manejador de eventos para el cambio de texto del input.
 * @param {boolean} props.isSearching - Indica si hay una búsqueda en progreso.
 * @returns {React.JSX.Element} Héroe de búsqueda de GitExplorer.
 */
const PageHeader = ({ searchTerm, handleSearch, isSearching }) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  // Determinar si el sistema operativo del usuario es macOS
  const isMac = typeof window !== "undefined" && /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);

  // Escuchar atajo Ctrl+K / Cmd+K para enfocar el buscador automáticamente
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key?.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
            <span className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
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
            isFocused && "border-accent ring-2 ring-accent/15",
          )}
        >
          {isSearching ? (
            <Spinner className="text-accent w-4 h-4 shrink-0" aria-hidden="true" />
          ) : (
            <Search 
              className={cn(
                "w-4 h-4 transition-colors duration-200 shrink-0",
                isFocused ? "text-accent" : "text-text-mute/50"
              )} 
              aria-hidden="true" 
            />
          )}

          <input
            ref={inputRef}
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
                onClick={() => handleSearch({ target: { value: "" } })}
                className="text-text-mute hover:text-text transition-colors cursor-pointer"
                aria-label="Limpiar búsqueda"
              >
                <XCircle size={18} aria-hidden="true" />
              </motion.button>
            ) : (
              <div className="hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded border border-border bg-bg text-[9px] font-mono text-text-mute font-medium select-none shrink-0">
                <span>{isMac ? "⌘" : "Ctrl"}</span>
                <span>K</span>
              </div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </header>
  );
};

PageHeader.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
  isSearching: PropTypes.bool.isRequired,
};

export default PageHeader;
