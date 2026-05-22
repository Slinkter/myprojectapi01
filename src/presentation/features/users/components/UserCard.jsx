/**
 * @file UserCard.jsx
 * @description 
 * Componente de tarjeta ultra-premium que soporta múltiples estilos visuales avanzados:
 * - 'default': Borde limpio estándar con elevación suave
 * - 'glass': Estilo Bento (glassmorphism) con resplandor neon y bordes ultra-finos
 * - 'minimal': Monocromático de estilo Vercel / Linear
 * - 'accent-glow': Resplandor dinámico con gradiente trasero al pasar el cursor
 */

import { useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import useIntersectionObserver from "@/application/hooks/useIntersectionObserver";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

/**
 * Variant Styles Mapping
 */
const VARIANTS = {
  default: "border border-app-border bg-app-surface shadow-premium hover:border-app-accent/40",
  glass: "bg-app-card backdrop-blur-xl border border-app-glass-border shadow-premium hover:border-app-accent/30 hover:shadow-[0_20px_50px_-15px_rgba(0,242,254,0.15)] dark:hover:shadow-[0_20px_50px_-15px_rgba(0,242,254,0.08)]",
  minimal: "border border-app-border/40 hover:border-app-accent hover:bg-app-text/5 bg-transparent shadow-sm",
  "accent-glow": "bg-app-surface border border-app-border hover:shadow-[0_0_40px_-10px_var(--color-app-accent)] hover:border-app-accent/40"
};

/**
 * Sub-component: Avatar
 */
const UserAvatar = ({ url, login, variant = "default" }) => {
  const isMinimal = variant === "minimal";
  
  return (
    <div className={cn("flex flex-col items-center relative", isMinimal ? "pt-0 pb-0" : "pt-8 pb-5")}>
      {/* Background soft aura behind image */}
      {!isMinimal && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-tr from-app-accent to-indigo-500/10 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
      )}
      
      <div className="relative">
        <motion.img
          layoutId={`avatar-${login}`}
          src={url}
          alt={`Avatar de ${login}`}
          loading="lazy"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={cn(
            "rounded-full object-cover border-2 border-app-border/40 group-hover:border-app-accent group-hover:scale-105 transition-all duration-500 z-10 relative",
            isMinimal ? "w-12 h-12" : "w-24 h-24"
          )}
        />
        {/* Decorative active indicator */}
        {!isMinimal && (
          <div className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-app-surface rounded-full z-20" />
        )}
      </div>
    </div>
  );
};

UserAvatar.propTypes = {
  url: PropTypes.string.isRequired,
  login: PropTypes.string.isRequired,
  variant: PropTypes.string,
};

/**
 * Sub-component: Info/Header
 */
const UserHeader = ({ login, variant = "default" }) => {
  const isMinimal = variant === "minimal";

  return (
    <div className={cn("space-y-1 flex-1 min-w-0", isMinimal ? "px-0 pb-0 text-left" : "px-6 pb-6 text-center")}>
      <h3 className="text-lg font-bold text-app-text truncate tracking-tight group-hover:text-app-accent transition-colors font-heading">
        {login}
      </h3>
      <p className="text-xs font-semibold text-app-muted tracking-normal truncate opacity-80">
        github.com/{login}
      </p>
    </div>
  );
};

UserHeader.propTypes = {
  login: PropTypes.string.isRequired,
  variant: PropTypes.string,
};

/**
 * Sub-component: Footer Action
 */
const UserFooter = ({ login, variant = "default" }) => {
  if (variant === "minimal") return null;

  return (
    <div className="px-6 pb-6 pt-2 mt-auto w-full z-10">
      <Link to={`/user/${login}`} className="w-full block">
        <button 
          className="btn-action-gradient w-full text-xs font-bold py-3 cursor-pointer group/btn flex items-center justify-center gap-1.5"
          aria-label={`Ver perfil de ${login}`}
        >
          <span>Ver Perfil</span>
          <ChevronRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
        </button>
      </Link>
    </div>
  );
};

UserFooter.propTypes = {
  login: PropTypes.string.isRequired,
  variant: PropTypes.string,
};

/**
 * Main UserCard Component
 */
const UserCard = ({ children, variant = "default", className, login }) => {
  const cardRef = useRef(null);
  const isVisible = useIntersectionObserver(cardRef, { threshold: 0.1 });
  const variantClass = VARIANTS[variant] || VARIANTS.default;
  const isMinimal = variant === "minimal";

  return (
    <div
      ref={cardRef}
      className={cn(
        "h-full w-full mx-auto group relative",
        isMinimal 
          ? "min-h-[80px]" 
          : "min-h-[300px] sm:min-h-[320px] max-w-full sm:max-w-[280px]",
        className
      )}
    >
      {isVisible ? (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={variant === "minimal" ? { scale: 1.015 } : { y: -6 }}
          transition={{ type: "spring", stiffness: 150, damping: 18 }}
          className={cn(
            variantClass,
            "rounded-2xl flex h-full w-full overflow-hidden transition-all duration-500 relative z-10",
            isMinimal ? "flex-row items-center gap-4 p-4" : "flex-col"
          )}
        >
          {isMinimal ? (
            <Link to={`/user/${login || ""}`} className="flex items-center gap-4 w-full">
               {children}
            </Link>
          ) : (
            children
          )}
        </motion.div>
      ) : (
        <div className="h-full w-full rounded-2xl bg-app-surface/20 border border-app-border/40" />
      )}
    </div>
  );
};

UserCard.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["default", "glass", "minimal", "accent-glow"]),
  className: PropTypes.string,
  login: PropTypes.string,
};

UserCard.Avatar = UserAvatar;
UserCard.Header = UserHeader;
UserCard.Footer = UserFooter;

export default UserCard;
