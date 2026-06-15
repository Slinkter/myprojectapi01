import { useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { cn } from "@/shared/lib/utils/utils";
import { ChevronRight } from "lucide-react";
import { log } from "@/shared";

/**
 * @file UserCard.jsx
 * @description Componente de tarjeta de usuario que muestra metadatos del perfil.
 * Implementa animaciones suaves de entrada mediante motion/react.
 */

const TAILWIND_BUTTON_BASE_CLASS = "btn-tailwind";

const CARD_STYLE_VARIANTS = {
  default: "tailwind-card",
  glass: "tailwind-card",
  minimal: "border border-border/40 rounded-xl hover:border-accent hover:bg-surface/30 transition-all duration-300",
  "accent-glow": "tailwind-card border-accent/30 hover:border-accent shadow-[0_4px_20px_-4px_rgba(14,165,233,0.08)]",
};

/**
 * Sub-componente UserAvatar.
 * Renderiza la foto de perfil del usuario con animaciones de layout.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.avatarUrl - URL de la imagen.
 * @param {string} props.username - Handle de GitHub.
 * @param {string} [props.variant="default"] - Variante de diseño.
 * @returns {JSX.Element} Imagen de avatar.
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
 * Sub-componente UserHeader.
 * Renderiza el título principal mostrando el username y el enlace secundario.
 * 
 * 🎓 CONCEPTO JUNIOR: Line-height y Vertical Spacing
 * Si el texto se "traspala" o se ve encimado, suele ser por la propiedad CSS `line-height` (en Tailwind `leading-*`).
 * Hemos ajustado el espaciado para que el Título (h3) y el Subtítulo (p) tengan aire suficiente.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.username - Handle de GitHub.
 * @param {string} [props.variant="default"] - Variante de diseño.
 * @returns {JSX.Element} Cabecera de la tarjeta.
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
 * Sub-componente UserFooter.
 * Renderiza el botón/enlace de acción (Call To Action) hacia las vistas de detalle.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.username - Handle de GitHub.
 * @param {string} [props.variant="default"] - Variante de diseño.
 * @returns {JSX.Element|null} Pie de la tarjeta o null si la variante no lo requiere.
 */
const UserFooter = ({ username, variant = "default" }) => {
  // 🎓 CONCEPTO JUNIOR: Early Return
  // Si pedimos una tarjeta minimalista, cortamos la ejecución y devolvemos `null`.
  // React ignora los null y simplemente no dibuja esta porción en pantalla.
  if (variant === "minimal") return null;

  return (
    <div className="px-5 pb-5 pt-1 mt-auto w-full z-10 overflow-hidden">
      <Link to={`/user/${username}`} className="w-full block">
        <motion.button
          className={cn(TAILWIND_BUTTON_BASE_CLASS, "w-full text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5")}
          aria-label={`Ver perfil de ${username}`}
          variants={{
            initial: { opacity: 0.95 },
            hover: { opacity: 1 },
          }}
          transition={{ duration: 0.2 }}
        >
          <span>Ver perfil</span>
          <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </motion.button>
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
 * 🎓 CONCEPTO JUNIOR: Compound Components (Componentes Compuestos)
 * Nota cómo al final del archivo hacemos `UserCard.Avatar = UserAvatar`.
 * Esto permite usar el componente así: `<UserCard><UserCard.Avatar /></UserCard>`.
 * Da muchísima flexibilidad porque el desarrollador puede cambiar el orden de las cosas por dentro
 * (poner el Avatar abajo y el Footer arriba) sin tener que enviarle 50 "props" al contenedor padre.
 *
 * Componente principal UserCard.
 * Representa una tarjeta de perfil de usuario individual.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Componentes hijos combinados (Header, Avatar, Footer).
 * @param {"default"|"glass"|"minimal"|"accent-glow"} [props.variant="default"] - Variante de diseño.
 * @param {string} [props.className] - Clases adicionales de Tailwind para sobreescritura.
 * @param {string} [props.username] - Handle del usuario.
 * @returns {JSX.Element} Elemento de tarjeta mapeado.
 * 
 * @example
 * ```tsx
 * <UserCard username="octocat" variant="minimal">
 *   <UserCard.Avatar avatarUrl="img.jpg" username="octocat" />
 *   <UserCard.Header username="octocat" />
 * </UserCard>
 * ```
 */
const UserCard = ({ children, variant = "default", className, username }) => {
  log.flow(`🎴 [PASO 5A: Entity Card] Instanciando UserCard para el usuario: "${username}"`);
  
  // useRef no causa re-renders, sirve para mantener una referencia directa al nodo del DOM.
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
      {/* motion.div reacciona a las acciones del ratón (hover, tap) sin CSS complejo */}
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

// Asignación estática de sub-componentes (Patrón Compound Component)
UserCard.Avatar = UserAvatar;
UserCard.Header = UserHeader;
UserCard.Footer = UserFooter;

UserCard.displayName = "UserCard";

export default UserCard;
