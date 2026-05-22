import { useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import useIntersectionObserver from "@/application/hooks/useIntersectionObserver";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

const VARIANTS = {
  default: "glass-card",
  glass: "glass-card-hover",
  minimal: "border border-border/40 rounded-xl hover:border-accent transition-all duration-200",
  "accent-glow": "glass-card-hover",
};

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

const UserHeader = ({ login, variant = "default" }) => {
  const isMinimal = variant === "minimal";

  return (
    <div className={cn("space-y-1 flex-1 min-w-0", isMinimal ? "px-0 pb-0 text-left" : "px-5 pb-1 text-center")}>
      <h3 className={cn(
        "font-heading font-bold truncate text-text",
        isMinimal ? "text-sm" : "text-xs tracking-wider uppercase"
      )}>
        {login}
      </h3>
      <p className="font-mono text-[10px] text-text-mute truncate select-all">
        github.com/{login}
      </p>
    </div>
  );
};

UserHeader.propTypes = {
  login: PropTypes.string.isRequired,
  variant: PropTypes.string,
};

const UserFooter = ({ login, variant = "default" }) => {
  if (variant === "minimal") return null;

  return (
    <div className="px-5 pb-5 pt-1 mt-auto w-full z-10 overflow-hidden">
      <Link to={`/user/${login}`} className="w-full block">
        <motion.button
          className="btn-glass w-full text-[10px] py-2.5 rounded-xl flex items-center justify-center gap-1.5"
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

const UserCard = ({ children, variant = "default", className, login }) => {
  const cardRef = useRef(null);
  const isVisible = useIntersectionObserver(cardRef, { threshold: 0.1 });
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
      {isVisible ? (
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
      ) : (
        <div className="h-full w-full rounded-xl bg-border/20" />
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
