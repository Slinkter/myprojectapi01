/**
 * @file UserCard.jsx
 * @description Componente de tarjeta de usuario interactiva estructurado bajo el patrón
 * de diseño Compound Components (Componentes Compuestos) para dar flexibilidad de maquetación en React.
 */

import { useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { cn } from "@/shared";
import { ChevronRight } from "lucide-react";

/**
 * 🎓 CONCEPTO JUNIOR: Compound Components (Componentes Compuestos)
 * Este patrón permite componer una UI flexible atando sub-componentes (como .Avatar, .Header, .Footer) 
 * al componente principal (UserCard). El desarrollador que usa el componente decide el orden y la estructura 
 * del JSX de forma libre y legible en lugar de depender de decenas de propiedades (props) restrictivas.
 */

const TAILWIND_BUTTON_BASE_CLASS = "btn-tailwind";

/**
 * Variaciones estéticas de clases CSS aplicables a las tarjetas de usuario.
 * @type {Record<string, string>}
 */
const CARD_STYLE_VARIANTS = {
  default: "tailwind-card",
  glass: "tailwind-card",
  minimal: "border border-border/40 rounded-xl hover:border-accent hover:bg-surface/30 transition-all duration-300",
  "accent-glow": "tailwind-card border-accent/30 hover:border-accent shadow-[0_4px_20px_-4px_rgba(99,102,241,0.08)]",
};

/**
 * Subcomponente para renderizar la foto de perfil (avatar) del usuario.
 * 
 * @component UserCard.Avatar
 * @param {Object} props - Propiedades del subcomponente.
 * @param {string} props.avatarUrl - URL de la imagen del avatar de GitHub.
 * @param {string} props.username - Username de la cuenta.
 * @param {string} [props.variant="default"] - Estilo estético de la tarjeta.
 * @returns {React.JSX.Element} Avatar animado.
 */
const UserAvatar = ({ avatarUrl, username, variant = "default" }) => {
  const isMinimalLayout = variant === "minimal";

  return (
    <div className={cn("flex flex-col items-center relative", isMinimalLayout ? "pt-0 pb-0" : "pt-6 pb-2")}>
      <div className="relative">
        <motion.img
          layoutId={`avatar-${username}`}
          src={avatarUrl}
          alt={`Avatar de ${username}`}
          loading="lazy"
          variants={{
            initial: { opacity: 0, scale: 0.95 },
            animate: { opacity: 1, scale: 1 },
            hover: { scale: 1.05 },
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={cn(
            "rounded-full object-cover border border-border ring-4 ring-accent/5 dark:ring-accent/10 z-10 relative",
            isMinimalLayout ? "w-10 h-10" : "w-16 h-16"
          )}
        />
      </div>
    </div>
  );
};

UserAvatar.propTypes = {
  avatarUrl: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  variant: PropTypes.string,
};

UserAvatar.displayName = "UserCard.Avatar";

/**
 * Subcomponente para renderizar la cabecera e información textual de la tarjeta.
 * 
 * @component UserCard.Header
 * @param {Object} props - Propiedades del subcomponente.
 * @param {string} props.username - Username de la cuenta de GitHub.
 * @param {string} [props.variant="default"] - Variante estética de la tarjeta.
 * @returns {React.JSX.Element} Cabecera textual de la tarjeta.
 */
const UserHeader = ({ username, variant = "default" }) => {
  const isMinimalLayout = variant === "minimal";

  return (
    <div className={cn(
      "flex-1 min-w-0", 
      isMinimalLayout ? "px-0 pb-0 text-left flex flex-col justify-center" : "px-5 pb-3 text-center flex flex-col items-center gap-1.5"
    )}>
      <h3 className={cn(
        "font-heading font-bold truncate text-text tracking-tight",
        isMinimalLayout ? "text-sm leading-tight" : "text-sm uppercase tracking-wide leading-relaxed"
      )}>
        {username}
      </h3>
      <p className="font-mono text-[10px] text-text-mute truncate select-all leading-tight opacity-70">
        github.com/{username}
      </p>
    </div>
  );
};

UserHeader.propTypes = {
  username: PropTypes.string.isRequired,
  variant: PropTypes.string,
};

UserHeader.displayName = "UserCard.Header";

/**
 * Subcomponente para renderizar el botón inferior de redirección.
 * 
 * @component UserCard.Footer
 * @param {Object} props - Propiedades del subcomponente.
 * @param {string} props.username - Username de la cuenta de GitHub.
 * @param {string} [props.variant="default"] - Variante estética de la tarjeta.
 * @returns {React.JSX.Element|null} Botón con enlace al detalle.
 */
const UserFooter = ({ username, variant = "default" }) => {
  if (variant === "minimal") return null;

  return (
    <div className="px-5 pb-5 pt-1 mt-auto w-full z-10 overflow-hidden">
      <Link 
        to={`/user/${username}`} 
        className="w-full block"
        aria-label={`Ver perfil de ${username}`}
      >
        <motion.div
          className={cn(TAILWIND_BUTTON_BASE_CLASS, "w-full text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5")}
          variants={{
            initial: { opacity: 0.95 },
            hover: { opacity: 1 },
          }}
          transition={{ duration: 0.2 }}
        >
          <span>Ver perfil</span>
          <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </motion.div>
      </Link>
    </div>
  );
};

UserFooter.propTypes = {
  username: PropTypes.string.isRequired,
  variant: PropTypes.string,
};

UserFooter.displayName = "UserCard.Footer";

/**
 * Componente principal contenedor de la tarjeta de usuario.
 * 
 * @component UserCard
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Subcomponentes estructurados a ensamblar.
 * @param {string} [props.variant="default"] - Variante estética de visualización.
 * @param {string} [props.className] - Clases CSS adicionales.
 * @param {string} [props.username] - Username de la cuenta de GitHub.
 * @returns {React.JSX.Element} Tarjeta contenedora con animaciones físicas.
 */
const UserCard = ({ children, variant = "default", className, username }) => {
  const userCardRef = useRef(null);
  
  const variantClassName = CARD_STYLE_VARIANTS[variant] || CARD_STYLE_VARIANTS.default;
  const isMinimalLayout = variant === "minimal";

  return (
    <div
      ref={userCardRef}
      className={cn(
        "h-full w-full mx-auto group",
        isMinimalLayout ? "min-h-[70px]" : "min-h-[220px] max-w-full sm:max-w-[280px]",
        className
      )}
    >
      <motion.div
        initial="initial"
        whileHover="hover"
        animate="animate"
        variants={{
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          hover: { y: -4 },
        }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        className={cn(
          variantClassName,
          "flex h-full w-full overflow-hidden rounded-2xl",
          isMinimalLayout ? "flex-row items-center gap-4 p-4" : "flex-col"
        )}
      >
        {isMinimalLayout ? (
          <Link to={`/user/${username || ""}`} className="flex items-center gap-4 w-full">
            {children}
          </Link>
        ) : (
          children
        )}
      </motion.div>
    </div>
  );
};

UserCard.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["default", "glass", "minimal", "accent-glow"]),
  className: PropTypes.string,
  username: PropTypes.string,
};

UserCard.Avatar = UserAvatar;
UserCard.Header = UserHeader;
UserCard.Footer = UserFooter;

UserCard.displayName = "UserCard";

export default UserCard;
