/**
 * @file User Detail Component
 * @description Premium User Detail - System Design Aligned
 */

import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion, useSpring, useTransform, animate } from "motion/react";
import PropTypes from "prop-types";
import {
  FaArrowLeft,
  FaGithub,
  FaMapMarkerAlt,
  FaLink,
  FaUsers,
  FaBook,
} from "react-icons/fa";
import { log } from "@/app/logger";
import UserDetailSkeleton from "./components/UserDetailSkeleton";

/**
 * Animated Counter Component
 */
const AnimatedCounter = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1.5,
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
  const renderCount = useRef(1);
  log.render("UserDetail", renderCount.current);
  renderCount.current++;

  const { login } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  log.state("UserDetail Info", { login, loading, hasUser: !!user });

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        log.effect(`Fetching detail for user: ${login}`);
        setLoading(true);
        // Artificial delay for UX testing (remove in production if desired)
        await new Promise((resolve) => setTimeout(resolve, 800));
        const response = await fetch(`https://api.github.com/users/${login}`);
        if (!response.ok) throw new Error(`Usuario no encontrado`);
        const data = await response.json();
        setUser(data);
        log.flow("success");
      } catch (err) {
        log.redux("UserDetail Fetch Error", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetail();
  }, [login]);

  if (loading) {
    log.flow("loading");
    return <UserDetailSkeleton />;
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl px-4 mx-auto">
        <Link to="/" className="inline-block mb-8">
          <button className="flex items-center gap-2 text-light-muted dark:text-dark-muted hover:text-brand-500 transition-colors font-medium cursor-pointer">
            <FaArrowLeft /> Volver
          </button>
        </Link>
        <div className="p-8 bg-red-500/10 rounded-2xl border border-red-500/20 text-center">
          <h4 className="text-xl font-bold text-red-600 dark:text-red-400">
            {error}
          </h4>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl px-4 mx-auto"
    >
      <Link to="/" className="inline-block mb-8">
        <motion.button
          whileHover={{ x: -5 }}
          className="flex items-center gap-2 text-light-muted dark:text-dark-muted hover:text-brand-500 transition-colors font-medium cursor-pointer"
        >
          <FaArrowLeft /> Volver a la búsqueda
        </motion.button>
      </Link>

      <div className="w-full bg-light-surface dark:bg-dark-surface shadow-premium dark:shadow-dark-premium rounded-3xl overflow-hidden border border-light-border dark:border-dark-border">
        {/* Banner Header with Parallax Effect */}
        <div className="h-48 sm:h-64 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 relative overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 1, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"
          />
        </div>

        {/* Profile Content */}
        <div className="relative px-6 sm:px-12 pb-10">
          {/* Avatar Area with Shared Layout Animation */}
          <div className="absolute -top-16 sm:-top-24 left-6 sm:left-12">
            <motion.div
              layoutId={`avatar-${user.login}`}
              className="h-32 w-32 sm:h-48 sm:w-48 rounded-full border-8 border-light-surface dark:border-dark-surface shadow-2xl overflow-hidden bg-light-surface dark:border-dark-surface"
            >
              <img
                src={user.avatar_url}
                alt={user.login}
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>

          {/* User Meta */}
          <div className="pt-20 sm:pt-28 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="space-y-1">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl sm:text-4xl font-bold text-light-text dark:text-dark-text tracking-tight"
              >
                {user.name || user.login}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg text-brand-500 font-semibold tracking-wide"
              >
                @{user.login}
              </motion.p>
              {user.bio && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-light-muted dark:text-dark-muted mt-4 max-w-2xl leading-relaxed"
                >
                  {user.bio}
                </motion.p>
              )}
            </div>

            <motion.a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button className="flex items-center gap-3 bg-brand-500 hover:bg-brand-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-brand-500/20 transition-all cursor-pointer">
                <FaGithub size={20} /> Seguir en GitHub
              </button>
            </motion.a>
          </div>

          <div className="h-px bg-light-border dark:bg-dark-border my-8" />

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-10">
            {[
              {
                label: "Repositorios",
                val: user.public_repos,
                icon: FaBook,
                color: "text-blue-500",
                delay: 0.5,
              },
              {
                label: "Seguidores",
                val: user.followers,
                icon: FaUsers,
                color: "text-brand-500",
                delay: 0.6,
              },
              {
                label: "Siguiendo",
                val: user.following,
                icon: FaUsers,
                color: "text-purple-500",
                delay: 0.7,
              },
              {
                label: "Gists",
                val: user.public_gists,
                icon: FaBook,
                color: "text-orange-500",
                delay: 0.8,
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: stat.delay }}
                whileHover={{ y: -5, borderColor: "var(--brand-500)" }}
                className="bg-neutral-50 dark:bg-neutral-900/50 p-5 rounded-2xl border border-light-border dark:border-dark-border transition-colors group"
              >
                <stat.icon
                  className={`mb-3 text-xl ${stat.color} group-hover:scale-110 transition-transform`}
                />
                <p className="text-2xl font-bold text-light-text dark:text-dark-text leading-none">
                  <AnimatedCounter value={stat.val} />
                </p>
                <p className="text-xs uppercase tracking-widest font-semibold text-light-muted dark:text-dark-muted mt-2">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Metadata Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap gap-x-8 gap-y-4 text-light-muted dark:text-dark-muted font-medium"
          >
            {user.company && (
              <div className="flex items-center gap-2">
                <FaUsers className="opacity-50" /> {user.company}
              </div>
            )}
            {user.location && (
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="opacity-50" /> {user.location}
              </div>
            )}
            {user.blog && (
              <a
                href={
                  user.blog.startsWith("http")
                    ? user.blog
                    : `https://${user.blog}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-brand-500 transition-colors"
              >
                <FaLink className="opacity-50" /> {user.blog}
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserDetail;
