/**
 * @file User Card Component (Minimalist Refactor)
 */

import { useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

/**
 * Sub-component: Avatar
 */
const UserAvatar = ({ url, login }) => (
  <div className="pt-6 pb-4 flex flex-col items-center">
    <motion.img
      layoutId={`avatar-${login}`}
      src={url}
      alt={`Avatar de ${login}`}
      loading="lazy"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-20 h-20 rounded-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-300"
    />
  </div>
);

UserAvatar.propTypes = {
  url: PropTypes.string.isRequired,
  login: PropTypes.string.isRequired,
};

/**
 * Sub-component: Info/Header
 */
const UserHeader = ({ login }) => (
  <div className="px-6 pb-6 text-center space-y-0.5">
    <h3 className="text-lg font-semibold text-app-text truncate tracking-tight">
      {login}
    </h3>
    <p className="text-xs font-medium text-app-muted tracking-normal">
      github.com/{login}
    </p>
  </div>
);

UserHeader.propTypes = {
  login: PropTypes.string.isRequired,
};

/**
 * Sub-component: Footer Action
 */
const UserFooter = ({ login }) => (
  <div className="px-6 pb-6 pt-2 mt-auto w-full">
    <Link to={`/user/${login}`} className="w-full">
      <button className="btn-action w-full !rounded-md text-sm py-2">
        Ver Perfil
      </button>
    </Link>
  </div>
);

UserFooter.propTypes = {
  login: PropTypes.string.isRequired,
};

/**
 * Main UserCard Component
 */
const UserCard = ({ children }) => {
  const cardRef = useRef(null);
  const isVisible = useIntersectionObserver(cardRef, { threshold: 0.1 });

  return (
    <div
      ref={cardRef}
      className="h-full w-full max-w-[280px] sm:max-w-none mx-auto min-h-[300px]"
    >
      {isVisible ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="border border-app-border rounded-lg bg-app-surface shadow-sm flex flex-col h-full w-full overflow-hidden hover:border-app-accent/30 transition-colors"
        >
          {children}
        </motion.div>
      ) : (
        <div className="h-full w-full rounded-lg bg-app-surface/50 border border-app-border" />
      )}
    </div>
  );
};

UserCard.propTypes = {
  children: PropTypes.node.isRequired,
};

UserCard.Avatar = UserAvatar;
UserCard.Header = UserHeader;
UserCard.Footer = UserFooter;

export default UserCard;
