/**
 * @file User Card Component (Compound & Lite Virtualization Pattern)
 * @description Flexible User Card that only renders content when visible.
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
    <div className="absolute top-8 left-1/2 -translate-x-1/2 w-24 h-24 bg-brand-500/10 dark:bg-brand-500/20 rounded-full blur-2xl"></div>
    <img
      src={url}
      alt={`Avatar de ${login}`}
      loading="lazy"
      className="relative w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-4 border-white dark:border-dark-surface shadow-md bg-white dark:bg-dark-surface z-10"
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
    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 truncate w-full tracking-tight">
      {login}
    </h3>
    <p className="mt-1 text-sm font-semibold text-brand-600 dark:text-brand-400 tracking-wide">
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
        className="w-full inline-flex justify-center items-center gap-x-2 text-sm font-bold rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white hover:bg-gray-100 hover:text-brand-600 dark:hover:text-brand-400 dark:hover:bg-gray-700 py-3 px-4 transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:focus:ring-offset-dark-surface cursor-pointer shadow-sm active:scale-[0.98]"
        aria-label={`Ver perfil de ${login}`}
      >
        Ver Perfil
        <FaArrowRight size={16} />
      </button>
    </Link>
  </div>
);

UserFooter.propTypes = {
  login: PropTypes.string.isRequired,
};

/**
 * Main UserCard Component (Container with Lite Virtualization)
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
          className="flex flex-col h-full w-full rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-dark-surface hover:shadow-lg transition-all duration-300"
        >
          {children}
        </motion.div>
      ) : (
        /* Placeholder while not visible */
        <div className="h-full w-full rounded-2xl bg-gray-100/50 dark:bg-neutral-800/20 animate-pulse border border-transparent" />
      )}
    </div>
  );
};

UserCard.propTypes = {
  children: PropTypes.node.isRequired,
};

// Attaching sub-components
UserCard.Avatar = UserAvatar;
UserCard.Header = UserHeader;
UserCard.Footer = UserFooter;

UserCard.displayName = "UserCard";

export default UserCard;
