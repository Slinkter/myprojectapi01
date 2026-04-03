/**
 * @file User Detail Component (Minimalist Refactor)
 */

import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, animate } from "motion/react";
import PropTypes from "prop-types";
import { FaArrowLeft, FaGithub, FaMapMarkerAlt, FaLink } from "react-icons/fa";
import UserDetailSkeleton from "./components/UserDetailSkeleton";
import { useUserDetailQuery } from "./hooks/useUserDetailQuery";

/**
 * Animated Counter Component
 */
const AnimatedCounter = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1,
      ease: "easeOut",
      onUpdate: (latest) => setDisplayValue(Math.floor(latest)),
    });
    return () => controls.stop();
  }, [value]);

  return <span>{displayValue.toLocaleString()}</span>;
};

AnimatedCounter.propTypes = {
  value: PropTypes.number.isRequired,
};

const UserDetail = () => {
  const { login } = useParams();
  
  const { 
    data: user, 
    isLoading, 
    isError, 
    error 
  } = useUserDetailQuery(login);

  if (isLoading) return <UserDetailSkeleton />;

  if (isError) {
    return (
      <div className="flex flex-col items-center py-20 gap-4">
        <p className="text-red-500 font-medium">
          {error?.message || "Usuario no encontrado"}
        </p>
        <Link to="/" className="text-sm underline">
          Volver
        </Link>
      </div>
    );
  }

  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-8 md:space-y-12 py-8 md:py-12 px-4"
    >
      <Link to="/" className="inline-block group">
        <button className="flex items-center gap-2 text-app-muted group-hover:text-app-text transition-colors text-sm font-medium cursor-pointer active:scale-95">
          <FaArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" /> Volver
        </button>
      </Link>

      <section className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-center sm:items-start text-center sm:text-left">
        <motion.img
          layoutId={`avatar-${user.username}`}
          src={user.photo}
          alt={`Avatar de ${user.username}`}
          className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-2 border-app-border object-cover shadow-lg grayscale-[0.1] hover:grayscale-0 transition-all duration-500"
        />
        <div className="space-y-3 sm:pt-2">
          <h2 className="text-3xl sm:text-4xl font-bold text-app-text tracking-tight">
            {user.name}
          </h2>
          <p className="text-lg text-app-accent font-medium">@{user.username}</p>
          {user.bio && (
            <p className="text-app-muted text-base leading-relaxed max-w-2xl mx-auto sm:mx-0">
              {user.bio}
            </p>
          )}
        </div>
      </section>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {[
          { label: "Repositorios", val: user.repos },
          { label: "Seguidores", val: user.followers },
          { label: "Siguiendo", val: user.following },
          { label: "Gists", val: user.gists },
        ].map((stat, i) => (
          <div 
            key={i} 
            className="border border-app-border bg-app-surface p-5 sm:p-6 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col items-center sm:items-start"
          >
            <p className="text-3xl font-bold text-app-text tracking-tight">
              <AnimatedCounter value={stat.val} />
            </p>
            <p className="text-xs sm:text-sm uppercase font-semibold text-app-muted tracking-wider mt-2">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <footer className="flex flex-col sm:flex-row flex-wrap items-center sm:items-start justify-center sm:justify-start gap-x-10 gap-y-4 pt-8 text-sm font-medium text-app-muted border-t border-app-border">
        {user.location && (
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt size={16} className="text-app-accent opacity-80" /> {user.location}
          </div>
        )}
        {user.website && (
          <a
            href={
              user.website.startsWith("http") ? user.website : `https://${user.website}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-app-accent transition-colors"
          >
            <FaLink size={16} className="opacity-80" /> Website
          </a>
        )}
        <a
          href={user.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-app-accent transition-colors"
        >
          <FaGithub size={16} className="opacity-80" /> GitHub Profile
        </a>
      </footer>
    </motion.div>
  );
};

UserDetail.displayName = "UserDetail";

export default UserDetail;
