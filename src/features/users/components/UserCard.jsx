/**
 * @file User Card Component (Multi-Variant Refactor)
 * @description 
 * High-fidelity card component supporting multiple visual styles:
 * - 'default': Standard clean border
 * - 'glass': Bento-style glassmorphism with backdrop blur
 * - 'minimal': Vercel-inspired clean monochrome
 * - 'accent-glow': Dynamic glow on hover
 */

import { useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

/**
 * Variant Styles Mapping
 */
const VARIANTS = {
  default: "border border-app-border bg-app-surface shadow-sm hover:border-app-accent/30",
  glass: "bg-app-card backdrop-blur-xl border border-app-glass-border shadow-premium hover:border-app-accent/20",
  minimal: "border-l-2 border-transparent hover:border-app-accent hover:bg-app-text/5 bg-transparent",
  "accent-glow": "bg-app-surface border border-app-border hover:shadow-[0_0_30px_-10px_var(--color-app-accent)]"
};

/**
 * Sub-component: Avatar
 */
const UserAvatar = ({ url, login, variant = "default" }) => {
  const isMinimal = variant === "minimal";
  
  return (
    <div className={`flex flex-col items-center ${isMinimal ? "pt-0 pb-0" : "pt-6 pb-4"}`}>
      <motion.img
        layoutId={`avatar-${login}`}
        src={url}
        alt={`Avatar de ${login}`}
        loading="lazy"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`${
          isMinimal ? "w-12 h-12" : "w-20 h-20"
        } rounded-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500`}
      />
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
    <div className={`${isMinimal ? "px-0 pb-0 text-left" : "px-6 pb-6 text-center"} space-y-0.5 flex-1 min-w-0`}>
      <h3 className="text-lg font-semibold text-app-text truncate tracking-tight group-hover:text-app-accent transition-colors">
        {login}
      </h3>
      <p className="text-xs font-medium text-app-muted tracking-normal truncate">
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
    <div className="px-6 pb-6 pt-2 mt-auto w-full">
      <Link to={`/user/${login}`} className="w-full">
        <button className="btn-action w-full !rounded-md text-sm py-2 cursor-pointer active:scale-95 transition-transform">
          Ver Perfil
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
const UserCard = ({ children, variant = "default" }) => {
  const cardRef = useRef(null);
  const isVisible = useIntersectionObserver(cardRef, { threshold: 0.1 });
  const variantClass = VARIANTS[variant] || VARIANTS.default;
  const isMinimal = variant === "minimal";

  return (
    <div
      ref={cardRef}
      className={`h-full w-full mx-auto group ${
        isMinimal ? "min-h-[80px]" : "min-h-[300px] max-w-[280px] sm:max-w-none"
      }`}
    >
      {isVisible ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={variant === "minimal" ? {} : { y: -5 }}
          className={`${variantClass} rounded-xl flex ${
            isMinimal ? "flex-row items-center gap-4 p-4" : "flex-col"
          } h-full w-full overflow-hidden transition-all duration-500`}
        >
          {isMinimal ? (
            <Link to={`/user/${children.props?.login || ""}`} className="flex items-center gap-4 w-full">
               {children}
            </Link>
          ) : (
            children
          )}
        </motion.div>
      ) : (
        <div className={`h-full w-full rounded-xl bg-app-surface/30 border border-app-border/50`} />
      )}
    </div>
  );
};

UserCard.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["default", "glass", "minimal", "accent-glow"]),
};

UserCard.Avatar = UserAvatar;
UserCard.Header = UserHeader;
UserCard.Footer = UserFooter;

export default UserCard;
