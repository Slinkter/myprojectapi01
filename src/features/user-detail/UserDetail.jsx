/**
 * @file User Detail Component
 * @description Premium User Detail - System Design Aligned
 */

import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
  FaArrowLeft,
  FaGithub,
  FaMapMarkerAlt,
  FaLink,
  FaUsers,
  FaBook,
  FaSpinner,
} from "react-icons/fa";
import { log } from "@/app/logger";

const Spinner = ({ className }) => (
  <FaSpinner className={`animate-spin ${className}`} />
);

Spinner.propTypes = {
  className: PropTypes.string,
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
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spinner className="h-12 w-12 text-brand-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl px-4 mx-auto">
        <Link to="/" className="inline-block mb-8">
          <button className="flex items-center gap-2 text-light-muted dark:text-dark-muted hover:text-brand-500 transition-colors font-medium">
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
    <div className="w-full max-w-4xl px-4 mx-auto animate-fade-in-up">
      <Link to="/" className="inline-block mb-8">
        <button className="flex items-center gap-2 text-light-muted dark:text-dark-muted hover:text-brand-500 transition-colors font-medium cursor-pointer">
          <FaArrowLeft /> Volver a la búsqueda
        </button>
      </Link>

      <div className="w-full bg-light-surface dark:bg-dark-surface shadow-premium dark:shadow-dark-premium rounded-3xl overflow-hidden border border-light-border dark:border-dark-border">
        {/* Banner Header */}
        <div className="h-48 sm:h-64 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 relative">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        </div>

        {/* Profile Content */}
        <div className="relative px-6 sm:px-12 pb-10">
          {/* Avatar Area */}
          <div className="absolute -top-16 sm:-top-24 left-6 sm:left-12">
            <div className="h-32 w-32 sm:h-48 sm:w-48 rounded-full border-8 border-light-surface dark:border-dark-surface shadow-2xl overflow-hidden bg-light-surface dark:bg-dark-surface">
              <img
                src={user.avatar_url}
                alt={user.login}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* User Meta */}
          <div className="pt-20 sm:pt-28 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="space-y-1">
              <h2 className="text-3xl sm:text-4xl font-bold text-light-text dark:text-dark-text tracking-tight">
                {user.name || user.login}
              </h2>
              <p className="text-lg text-brand-500 font-semibold tracking-wide">
                @{user.login}
              </p>
              {user.bio && (
                <p className="text-light-muted dark:text-dark-muted mt-4 max-w-2xl leading-relaxed">
                  {user.bio}
                </p>
              )}
            </div>

            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0"
            >
              <button className="flex items-center gap-3 bg-brand-500 hover:bg-brand-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-brand-500/20 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer">
                <FaGithub size={20} /> Seguir en GitHub
              </button>
            </a>
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
              },
              {
                label: "Seguidores",
                val: user.followers,
                icon: FaUsers,
                color: "text-brand-500",
              },
              {
                label: "Siguiendo",
                val: user.following,
                icon: FaUsers,
                color: "text-purple-500",
              },
              {
                label: "Gists",
                val: user.public_gists,
                icon: FaBook,
                color: "text-orange-500",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-neutral-50 dark:bg-neutral-900/50 p-5 rounded-2xl border border-light-border dark:border-dark-border hover:border-brand-500/50 transition-colors"
              >
                <stat.icon className={`mb-3 text-xl ${stat.color}`} />
                <p className="text-2xl font-bold text-light-text dark:text-dark-text leading-none">
                  {stat.val}
                </p>
                <p className="text-xs uppercase tracking-widest font-semibold text-light-muted dark:text-dark-muted mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Metadata Footer */}
          <div className="flex flex-wrap gap-x-8 gap-y-4 text-light-muted dark:text-dark-muted font-medium">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
