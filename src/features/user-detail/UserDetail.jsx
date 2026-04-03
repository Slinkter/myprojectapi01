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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto space-y-12 py-4"
    >
      <Link to="/" className="w-fit">
        <button className="flex items-center gap-2 text-app-muted hover:text-app-text transition-colors text-sm font-medium">
          <FaArrowLeft size={12} /> Volver
        </button>
      </Link>

      <section className="flex flex-col md:flex-row gap-8 items-start md:items-center">
        <motion.img
          layoutId={`avatar-${user.username}`}
          src={user.photo}
          alt={user.username}
          className="w-32 h-32 rounded-full border border-app-border grayscale-[0.1]"
        />
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-app-text tracking-tight">
            {user.name}
          </h2>
          <p className="text-lg text-app-accent font-medium">@{user.username}</p>
          {user.bio && (
            <p className="text-app-muted text-base leading-relaxed max-w-xl">
              {user.bio}
            </p>
          )}
        </div>
      </section>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Repos", val: user.repos },
          { label: "Seguidores", val: user.followers },
          { label: "Siguiendo", val: user.following },
          { label: "Gists", val: user.gists },
        ].map((stat, i) => (
          <div key={i} className="border border-app-border p-4 rounded-lg">
            <p className="text-2xl font-bold text-app-text">
              <AnimatedCounter value={stat.val} />
            </p>
            <p className="text-xs uppercase font-medium text-app-muted tracking-wide mt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <footer className="flex flex-wrap gap-x-10 gap-y-4 pt-6 text-sm font-medium text-app-muted border-t border-app-border">
        {user.location && (
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt size={14} className="opacity-50" /> {user.location}
          </div>
        )}
        {user.website && (
          <a
            href={
              user.website.startsWith("http") ? user.website : `https://${user.website}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-app-text transition-colors"
          >
            <FaLink size={14} className="opacity-50" /> Website
          </a>
        )}
        <a
          href={user.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-app-text transition-colors"
        >
          <FaGithub size={14} className="opacity-50" /> GitHub Profile
        </a>
      </footer>
    </motion.div>
  );
};

UserDetail.displayName = "UserDetail";

export default UserDetail;
