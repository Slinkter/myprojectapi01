/**
 * @file User Card Component
 * @description Standardized, high-quality User Card with proper widths.
 */

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { FaArrowRight } from "react-icons/fa";

const cardVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const UserCard = React.memo(({ user = {} }) => {
  const { avatar_url, login } = user;

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="h-full w-full max-w-[300px] sm:max-w-none mx-auto"
    >
      <div className="flex flex-col h-full w-full rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-dark-surface hover:shadow-lg transition-all duration-300">
        {/* Card Body: Content & Media */}
        <div className="p-6 md:p-8 flex flex-col items-center flex-grow relative overflow-hidden">
          {/* Subtle Background Glow for Avatar */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-24 h-24 bg-brand-500/10 dark:bg-brand-500/20 rounded-full blur-2xl"></div>

          <img
            src={avatar_url}
            alt={`Avatar de ${login}`}
            loading="lazy"
            className="relative w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-4 border-white dark:border-dark-surface shadow-md bg-white dark:bg-dark-surface z-10"
          />
          <h3 className="mt-5 text-xl font-bold text-gray-900 dark:text-gray-100 text-center truncate w-full tracking-tight">
            {login}
          </h3>
          <p className="mt-1 text-sm font-semibold text-brand-600 dark:text-brand-400 text-center tracking-wide">
            @{login}
          </p>
        </div>

        {/* Card Footer: Action */}
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
      </div>
    </motion.div>
  );
});

UserCard.displayName = "UserCard";

UserCard.propTypes = {
  user: PropTypes.shape({
    avatar_url: PropTypes.string,
    login: PropTypes.string,
  }).isRequired,
};

export default UserCard;
