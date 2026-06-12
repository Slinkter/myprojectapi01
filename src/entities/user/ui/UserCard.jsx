import { useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { cn } from "@/shared/lib/utils/utils";
import { ChevronRight } from "lucide-react";

const BTN_BASE = "btn-glass";

const VARIANTS = {
  default: "glass-card",
  glass: "glass-card-hover",
  minimal: "border border-border/40 rounded-xl hover:border-accent transition-all duration-200",
  "accent-glow": "glass-card-hover",
};

/**
 * @typedef {Object} UserAvatarProps
 * @property {string} url - URL de la imagen del avatar.
 * @property {string} login - Username del usuario para tags de animación.
 * @property {string} [variant="default"] - Variante de diseño visual.
 */

/**
 * Componente que renderiza la imagen de avatar animada del usuario.
 *
 * @component
 * @param {UserAvatarProps} props - Propiedades del avatar.
 * @returns {JSX.Element} Imagen del avatar animada.
 */
const UserAvatar = ({ url, login, variant = "default" }) => {
  const isMinimal = variant === "minimal";

  return (
    <div className={cn("flex flex-col items-center relative", isMinimal ? "pt-0 pb-0" : "pt-6 pb-2")}>
      <div className="relative">
        <motion.img
          layoutId={`avatar-${login}`}
          src={url}
          alt={`Avatar de ${login}`}
          loading="lazy"
          variants={{
            initial: { opacity: 0, scale: 0.95 },
            animate: { opacity: 1, scale: 1 },
            hover: { scale: 1.04 },
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={cn(
            "rounded-xl object-cover z-10 relative",
            isMinimal ? "w-10 h-10" : "w-16 h-16"
          )}
        />
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
 * @typedef {Object} UserHeaderProps
 * @property {string} login - Username del usuario de GitHub.
 * @property {string} [variant="default"] - Variante visual de diseño.
 */

/**
 * Componente que renderiza el encabezado con el nombre de usuario y enlace de perfil.
 *
 * @component
 * @param {UserHeaderProps} props - Propiedades del header.
 * @returns {JSX.Element} Sección de encabezado de la tarjeta.
 */
const UserHeader = ({ login, variant = "default" }) => {
  const isMinimal = variant === "minimal";

  return (
    <div className={cn("space-y-1 flex-1 min-w-0 leading-snug", isMinimal ? "px-0 pb-0 text-left" : "px-5 pb-1 text-center")}>
      <h3 className={cn(
        "font-heading font-bold truncate text-text leading-snug",
        isMinimal ? "text-sm" : "text-xs tracking-wider uppercase"
      )}>
        {login}
      </h3>
      <p className="font-mono text-[10px] text-text-mute truncate select-all leading-normal">
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
 * @typedef {Object} UserFooterProps
 * @property {string} login - Username del usuario de GitHub.
 * @property {string} [variant="default"] - Variante de diseño visual.
 */

/**
 * Componente que renderiza el botón de pie de página para navegar al detalle.
 *
 * @component
 * @param {UserFooterProps} props - Propiedades del footer.
 * @returns {JSX.Element|null} Botón animado o null si es variante minimal.
 */
const UserFooter = ({ login, variant = "default" }) => {
  if (variant === "minimal") return null;

  return (
    <div className="px-5 pb-5 pt-1 mt-auto w-full z-10 overflow-hidden">
      <Link to={`/user/${login}`} className="w-full block">
        <motion.button
          className={cn(BTN_BASE, "w-full text-[10px] py-2.5 rounded-xl flex items-center justify-center gap-1.5")}
          aria-label={`Ver perfil de ${login}`}
          variants={{
            initial: { opacity: 0.6, y: 5 },
            hover: { opacity: 1, y: 0 },
          }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <span>Ver perfil</span>
          <ChevronRight size={12} />
        </motion.button>
      </Link>
    </div>
  );
};

UserFooter.propTypes = {
  login: PropTypes.string.isRequired,
  variant: PropTypes.string,
};

/**
 * @typedef {Object} UserCardProps
 * @property {React.ReactNode} children - Hijos del compuesto (UserCard.Avatar, UserCard.Header, etc.).
 * @property {"default"|"glass"|"minimal"|"accent-glow"} [variant="default"] - Variante de diseño visual de la tarjeta.
 * @property {string} [className] - Clases de estilo Tailwind CSS adicionales.
 * @property {string} [login] - El identificador único del usuario en GitHub.
 */

/**
 * Tarjeta contenedora de usuario animada con efecto de glassmorphism.
 * Utiliza el Compound Component Pattern (Avatar, Header, Footer).
 *
 * @component
 * @param {UserCardProps} props - Propiedades de la tarjeta.
 * @returns {JSX.Element} Contenedor animado de la tarjeta.
 *
 * @example
 * ```jsx
 * <UserCard variant="glass" login="mojombo">
 *   <UserCard.Avatar url="https://..." login="mojombo" />
 *   <UserCard.Header login="mojombo" />
 *   <UserCard.Footer login="mojombo" />
 * </UserCard>
 * ```
 */
const UserCard = ({ children, variant = "default", className, login }) => {
  const cardRef = useRef(null);
  const variantClass = VARIANTS[variant] || VARIANTS.default;
  const isMinimal = variant === "minimal";

  return (
    <div
      ref={cardRef}
      className={cn(
        "h-full w-full mx-auto group",
        isMinimal ? "min-h-[70px]" : "min-h-[190px] max-w-full sm:max-w-[280px]",
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
        transition={{ type: "spring", stiffness: 180, damping: 15 }}
        className={cn(
          variantClass,
          "flex h-full w-full overflow-hidden",
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
