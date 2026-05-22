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
  default: "border border-app-border bg-app-surface shadow-sm hover:border-app-accent/50 hover:shadow-md",
  glass: "bg-app-surface border border-app-border shadow-sm hover:border-app-accent/50 hover:shadow-md",
  minimal: "border border-app-border/60 hover:border-app-accent hover:bg-app-bg bg-transparent shadow-sm",
  "accent-glow": "bg-app-surface border border-app-border hover:shadow-sm hover:border-app-accent"
};

/**
 * Sub-component: Avatar
 */
const UserAvatar = ({ url, login, variant = "default" }) => {
  const isMinimal = variant === "minimal";
  
  return (
    <div className={cn("flex flex-col items-center relative", isMinimal ? "pt-0 pb-0" : "pt-6 pb-4")}>
      <div className="relative">
        <motion.img
          layoutId={`avatar-${login}`}
          src={url}
          alt={`Avatar de ${login}`}
          loading="lazy"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={cn(
            "rounded-full object-cover border border-app-border group-hover:border-app-accent group-hover:scale-102 transition-all duration-300 z-10 relative",
            isMinimal ? "w-10 h-10" : "w-20 h-20"
          )}
        />
        {/* Decorative active indicator */}
        {!isMinimal && (
          <div className="absolute bottom-0 right-1 w-3 h-3 bg-emerald-500 border border-app-surface rounded-full z-20" />
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
    <div className={cn("space-y-1.5 flex-1 min-w-0", isMinimal ? "px-0 pb-0 text-left" : "px-5 pb-4 text-center")}>
      <h3 className="text-base font-bold text-app-text truncate tracking-tight group-hover:text-app-accent transition-colors font-heading">
        {login}
      </h3>
      <p className="font-mono text-[10px] text-app-muted tracking-tight truncate opacity-90 select-all">
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
    <div className="px-5 pb-5 pt-1 mt-auto w-full z-10">
      <Link to={`/user/${login}`} className="w-full block">
        <button 
          className="btn-action-gradient w-full text-xs font-semibold py-2.5 rounded-lg cursor-pointer group/btn flex items-center justify-center gap-1"
          aria-label={`Ver perfil de ${login}`}
        >
          <span>Ver Perfil</span>
          <ChevronRight size={13} className="group-hover/btn:translate-x-0.5 transition-transform" />
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
