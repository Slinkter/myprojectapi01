import { useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { cn } from "@/shared/lib/utils/utils";
import { ChevronRight } from "lucide-react";

/**
 * @file UserCard.jsx
 * @description Flexible compound card component styling displaying individual user profile metadata.
 * Arranged inside motion tags for smooth interactive entry transitions.
 */

const TAILWIND_BUTTON_BASE_CLASS = "btn-tailwind";

const CARD_STYLE_VARIANTS = {
  default: "tailwind-card",
  glass: "tailwind-card",
  minimal: "border border-border/40 rounded-xl hover:border-accent hover:bg-surface/30 transition-all duration-300",
  "accent-glow": "tailwind-card border-accent/30 hover:border-accent shadow-[0_4px_20px_-4px_rgba(14,165,233,0.08)]",
};

/**
 * @typedef {Object} UserAvatarProps
 * @property {string} avatarUrl - Image URL.
 * @property {string} username - GitHub handle.
 * @property {string} [variant="default"] - Card styling presets.
 */

/**
 * UserAvatar sub-component.
 * Renders user profile picture with layout animations.
 *
 * @component
 * @param {UserAvatarProps} props - Component props.
 * @returns {JSX.Element} Profile avatar image.
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
 * @typedef {Object} UserHeaderProps
 * @property {string} username - GitHub handle.
 * @property {string} [variant="default"] - Card styling presets.
 */

/**
 * UserHeader sub-component.
 * Renders main header title displaying the username handle.
 *
 * @component
 * @param {UserHeaderProps} props - Component props.
 * @returns {JSX.Element} Card header element.
 */
const UserHeader = ({ username, variant = "default" }) => {
  const isMinimalLayout = variant === "minimal";

  return (
    <div className={cn("space-y-1 flex-1 min-w-0 leading-snug", isMinimalLayout ? "px-0 pb-0 text-left" : "px-5 pb-1 text-center")}>
      <h3 className={cn(
        "font-heading font-bold truncate text-text leading-snug tracking-tight",
        isMinimalLayout ? "text-sm" : "text-sm uppercase tracking-wide"
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

UserHeader.displayName = "UserCard.Header";

/**
 * @typedef {Object} UserFooterProps
 * @property {string} username - GitHub handle.
 * @property {string} [variant="default"] - Card styling presets.
 */

/**
 * UserFooter sub-component.
 * Renders CTA link action mapping to detail views.
 *
 * @component
 * @param {UserFooterProps} props - Component props.
 * @returns {JSX.Element|null} Card footer element.
 */
const UserFooter = ({ username, variant = "default" }) => {
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
 * @typedef {Object} UserCardProps
 * @property {React.ReactNode} children - Combined child components.
 * @property {"default"|"glass"|"minimal"|"accent-glow"} [variant="default"] - Card styling presets.
 * @property {string} [className] - Extra Tailwind styling overrides.
 * @property {string} [username] - GitHub user handle.
 */

/**
 * UserCard compound component.
 * Layout primitive encapsulating individual cards representing search matches.
 *
 * @component
 * @param {UserCardProps} props - Component props.
 * @returns {JSX.Element} Mapped card element.
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
