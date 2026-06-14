import { useState } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "motion/react";
import { Search, XCircle, Loader2 } from "lucide-react";
import { cn } from "@/shared/lib/utils/utils";
import { SWISS_STYLE_TOKENS } from "@/shared";

const Spinner = ({ className }) => {
  return <Loader2 className={cn("animate-spin", className)} />;
};

Spinner.propTypes = {
  className: PropTypes.string,
};

const PageHeader = ({ searchTerm, handleSearch, isSearching }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <header className="flex flex-col w-full items-center gap-y-8 py-10 sm:py-14 mb-4 relative">
      <div className="text-center space-y-6 max-w-2xl mx-auto px-4">
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 90 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tight text-text leading-[1.1] uppercase" // Swiss Style: Bold uppercase
          >
            EXPLORA EL <span className="text-swiss-accent">NETWORK</span>
            <br />
            DE GITHUB
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="text-xs sm:text-sm text-swiss-text-mute max-w-md mx-auto leading-relaxed font-bold uppercase tracking-wider" // Swiss details: uppercase tracking
          >
            Busca perfiles, organizaciones y descubre desarrolladores en tiempo
            real.
          </motion.p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="w-full max-w-lg px-4 sm:px-0"
      >
        <div className={cn(SWISS_STYLE_TOKENS.input, isFocused && "border-swiss-accent")}>
          {isSearching ? (
            <Spinner className="text-swiss-accent text-lg" aria-hidden="true" />
          ) : (
            <motion.div
              animate={
                isFocused
                  ? { rotate: 5, scale: 1.02 }
                  : { rotate: 0, scale: 1 }
              }
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className={cn(
                "transition-colors duration-200",
                isFocused ? "text-swiss-accent" : "text-swiss-text-mute",
              )}
            >
              <Search className="text-base" aria-hidden="true" />
            </motion.div>
          )}

          <input
            type="text"
            className="flex-1 bg-transparent border-none outline-none text-sm sm:text-base text-text placeholder:text-swiss-text-mute/45 font-bold uppercase tracking-wide selection:bg-swiss-accent/15"
            placeholder="BUSCAR USUARIOS..."
            value={searchTerm}
            onChange={handleSearch}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            aria-label="Buscar usuarios de GitHub"
          />

          <AnimatePresence>
            {searchTerm ? (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSearch({ target: { value: "" } })}
                className="text-swiss-text-mute hover:text-text transition-colors cursor-pointer"
                aria-label="Limpiar búsqueda"
              >
                <XCircle size={18} aria-hidden="true" />
              </motion.button>
            ) : (
              <div
                className={cn(
                  SWISS_STYLE_TOKENS.outline,
                  "hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-none text-[9px] font-mono text-swiss-text-mute font-bold select-none shrink-0",
                )}
              >
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

PageHeader.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
  isSearching: PropTypes.bool.isRequired,
};

export default PageHeader;
