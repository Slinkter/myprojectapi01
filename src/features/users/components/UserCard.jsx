/**
 * @file User Card Component (v4 Semantic Refactor)
 */

import { useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { FaArrowRight } from "react-icons/fa";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

/**
 * Sub-component: Avatar
 */
const UserAvatar = ({ url, login }) => (
  <div className="relative p-6 md:p-8 flex flex-col items-center">
    <div className="absolute top-8 left-1/2 -translate-x-1/2 w-24 h-24 bg-brand-500/20 rounded-full blur-2xl"></div>
    <img
      src={url}
      alt={`Avatar de ${login}`}
      loading="lazy"
      className="relative w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-4 border-app-surface shadow-md bg-app-surface z-10"
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
  <div className="px-6 md:px-8 pb-4 text-center">
    <h3 className="text-xl font-bold text-app-text truncate w-full tracking-tight">
      {login}
    </h3>
    <p className="mt-1 text-sm font-semibold text-app-accent tracking-wide">
      @{login}
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
  <div className="p-6 md:p-8 pt-0 mt-auto w-full">
    <Link to={`/user/${login}`} className="w-full block">
      <button
        className="btn-primary w-full gap-x-2"
        aria-label={`Ver perfil de ${login}`}
      >
        Ver Perfil
        <FaArrowRight size={14} className="text-app-accent" />
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
    <div ref={cardRef} className="h-full w-full max-w-[300px] sm:max-w-none mx-auto min-h-[320px]">
      {isVisible ? (
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="glass-card flex flex-col h-full w-full overflow-hidden"
        >
          {children}
        </motion.div>
      ) : (
        <div className="h-full w-full rounded-2xl bg-app-surface/50 animate-pulse border border-app-border" />
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
