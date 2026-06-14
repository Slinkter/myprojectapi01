import { useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { cn } from "@/shared/lib/utils/utils";
import { ChevronRight } from "lucide-react";

const SWISS_BUTTON_BASE_CLASS = "btn-swiss";

const CARD_STYLE_VARIANTS = {
  default: "swiss-card",
  glass: "swiss-card", // Replaced glass with flat swiss card style
  minimal: "border-b border-border/40 hover:bg-surface/50 transition-all duration-200",
  "accent-glow": "swiss-card border-accent", // Border indicator on active
};

/**
 * @typedef {Object} UserAvatarProps
 * @property {string} avatarUrl - URL de la imagen del avatar.
 * @property {string} username - Nombre de usuario de GitHub para tags de animación.
 * @property {string} [variant="default"] - Variante de diseño visual.
 */

/**
 * Componente que renderiza la imagen de avatar animada del usuario.
 *
 * @component
 * @param {UserAvatarProps} props - Propiedades del avatar.
 * @returns {JSX.Element} Imagen del avatar animada.
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
            initial: { opacity: 0, scale: 0.98 },
            animate: { opacity: 1, scale: 1 },
            hover: { scale: 1.02 },
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={cn(
            "rounded-none border border-border object-cover z-10 relative", // Sharp corners
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

/**
 * @typedef {Object} UserHeaderProps
 * @property {string} username - Nombre de usuario de GitHub.
 * @property {string} [variant="default"] - Variante visual de diseño.
 */

/**
 * Componente que renderiza el encabezado con el nombre de usuario y enlace de perfil.
 *
 * @component
 * @param {UserHeaderProps} props - Propiedades del header.
 * @returns {JSX.Element} Sección de encabezado de la tarjeta.
 */
const UserHeader = ({ username, variant = "default" }) => {
  const isMinimalLayout = variant === "minimal";

  return (
    <div className={cn("space-y-1 flex-1 min-w-0 leading-snug", isMinimalLayout ? "px-0 pb-0 text-left" : "px-5 pb-1 text-center")}>
      <h3 className={cn(
        "font-heading font-extrabold truncate text-text leading-snug tracking-tight", // Swiss Style: Extrabold
        isMinimalLayout ? "text-sm" : "text-xs uppercase tracking-wider"
      )}>
        {username}
      </h3>
      <p className="font-mono text-[10px] text-text-mute truncate select-all leading-normal">
        github.com/{username}
      </p>
    </div>
  );
};

UserHeader.propTypes = {
  username: PropTypes.string.isRequired,
  variant: PropTypes.string,
};

/**
 * @typedef {Object} UserFooterProps
 * @property {string} username - Nombre de usuario de GitHub.
 * @property {string} [variant="default"] - Variante de diseño visual.
 */

/**
 * Componente que renderiza el botón de pie de página para navegar al detalle.
 *
 * @component
 * @param {UserFooterProps} props - Propiedades del footer.
 * @returns {JSX.Element|null} Botón animado o null si es variante minimal.
 */
const UserFooter = ({ username, variant = "default" }) => {
  if (variant === "minimal") return null;

  return (
    <div className="px-5 pb-5 pt-1 mt-auto w-full z-10 overflow-hidden">
      <Link to={`/user/${username}`} className="w-full block">
        <motion.button
          className={cn(SWISS_BUTTON_BASE_CLASS, "w-full text-[10px] py-2.5 rounded-none flex items-center justify-center gap-1.5")} // Sharp corners
          aria-label={`Ver perfil de ${username}`}
          variants={{
            initial: { opacity: 0.9 },
            hover: { opacity: 1 },
          }}
          transition={{ duration: 0.1 }}
        >
          <span>Ver perfil</span>
          <ChevronRight size={12} />
        </motion.button>
      </Link>
    </div>
  );
};

UserFooter.propTypes = {
  username: PropTypes.string.isRequired,
  variant: PropTypes.string,
};

/**
 * @typedef {Object} UserCardProps
 * @property {React.ReactNode} children - Hijos del compuesto (UserCard.Avatar, UserCard.Header, etc.).
 * @property {"default"|"glass"|"minimal"|"accent-glow"} [variant="default"] - Variante de diseño visual de la tarjeta.
 * @property {string} [className] - Clases de estilo Tailwind CSS adicionales.
 * @property {string} [username] - El identificador único del usuario en GitHub.
 */

/**
 * Tarjeta contenedora de usuario animada con estética minimalista suiza.
 * Utiliza el Compound Component Pattern (Avatar, Header, Footer).
 *
 * @component
 * @param {UserCardProps} props - Propiedades de la tarjeta.
 * @returns {JSX.Element} Contenedor animado de la tarjeta.
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
        isMinimalLayout ? "min-h-[70px]" : "min-h-[190px] max-w-full sm:max-w-[280px]",
        className
      )}
    >
      <motion.div
        initial="initial"
        whileHover="hover"
        animate="animate"
        variants={{
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          hover: { y: -2 }, // Subtler hover motion for Swiss minimalist feel
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className={cn(
          variantClassName,
          "flex h-full w-full overflow-hidden rounded-none", // Sharp edges
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

export default UserCard;
