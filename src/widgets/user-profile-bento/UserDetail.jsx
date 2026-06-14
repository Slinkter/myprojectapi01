/**
 * @file UserDetail.jsx
 * @description Vista detallada del perfil de usuario estilizada como un Dashboard Minimalista Suizo de alto contraste.
 */

import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, animate } from "motion/react";
import PropTypes from "prop-types";
import { ArrowLeft, Globe, MapPin, Link as LinkIcon, GitFork, Users, Heart, Code } from "lucide-react";
import { UserDetailSkeleton, useUserDetailQuery } from "@/entities/user";
import { cn, SWISS_STYLE_TOKENS } from "@/shared";

/**
 * Animated Counter Component
 */
const AnimatedCounter = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1.0,
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.02,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 18,
    },
  },
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
      <div className="flex flex-col items-center py-24 gap-6">
        <div className="w-12 h-12 bg-swiss-accent text-white flex items-center justify-center font-mono font-bold text-xl select-none">
          !
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-extrabold font-heading text-text">Error de Conexión</h3>
          <p className="text-swiss-accent font-medium max-w-sm">
            {error?.message || "No pudimos encontrar el perfil de este desarrollador."}
          </p>
        </div>
        <Link to="/" className="btn-swiss text-xs px-6 py-2.5">
          Regresar al Buscador
        </Link>
      </div>
    );
  }

  if (!user) return null;

  // Statistics items array using descriptive Clean Code naming conventions
  const userStatisticsList = [
    { label: "Repositorios", statisticValue: user.repos, icon: <GitFork className="w-4 h-4" /> },
    { label: "Seguidores", statisticValue: user.followers, icon: <Users className="w-4 h-4" /> },
    { label: "Siguiendo", statisticValue: user.following, icon: <Heart className="w-4 h-4" /> },
    { label: "Gists", statisticValue: user.gists, icon: <Code className="w-4 h-4" /> },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto space-y-8 md:space-y-12 py-8 md:py-12 px-4 relative"
    >
      <motion.div variants={itemVariants} className="inline-block group">
        <Link to="/" className="cursor-pointer">
          <button 
            className="flex items-center gap-2 px-4 py-2 border border-border bg-surface text-text-mute hover:text-text hover:border-text transition-all text-xs font-bold cursor-pointer active:scale-98"
            aria-label="Volver a la búsqueda de usuarios"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
            <span>VOLVER A BUSCAR</span>
          </button>
        </Link>
      </motion.div>

      {/* Profile Header Block */}
      <motion.section 
        variants={itemVariants}
        className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-start text-center sm:text-left border border-border bg-surface p-6 sm:p-8 relative overflow-hidden"
      >
        <div className="relative">
          <motion.img
            layoutId={`avatar-${user.username}`}
            src={user.photo}
            alt={`Avatar de ${user.username}`}
            className="relative w-28 h-28 sm:w-36 sm:h-36 border border-text object-cover shadow-sm transition-all duration-300 z-10" // Sharp corners
          />
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-swiss-accent border border-surface z-20" /> {/* Sharp status indicator */}
        </div>

        <div className="space-y-4 sm:pt-1 flex-1 min-w-0">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text tracking-tight font-heading leading-tight truncate">
              {user.name}
            </h2>
            <p className="font-mono text-xs sm:text-sm text-swiss-accent font-bold tracking-tight">
              github.com/{user.username}
            </p>
          </div>
          
          {user.bio ? (
            <div className="relative pl-3 border-l border-swiss-accent">
              <p className="text-text-mute text-xs sm:text-sm leading-relaxed max-w-xl mx-auto sm:mx-0 font-medium">
                {user.bio}
              </p>
            </div>
          ) : (
            <p className="text-text-mute/60 text-[11px] italic">Este desarrollador aún no ha añadido una biografía en su perfil de GitHub.</p>
          )}
        </div>
      </motion.section>

      {/* Swiss Column Grid Layout for Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {userStatisticsList.map((userStatistic, statisticIndex) => (
          <motion.div 
            key={statisticIndex}
            variants={itemVariants}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.15 }}
            className={cn(SWISS_STYLE_TOKENS.card, "p-6 flex flex-col justify-between gap-4 relative overflow-hidden")}
          >
            <div className="flex items-center justify-between border-b border-border pb-2">
              <div className="text-swiss-accent">
                {userStatistic.icon}
              </div>
              <span className="font-mono text-[9px] font-bold text-swiss-text-mute tracking-wider uppercase">
                STAT // 0{statisticIndex + 1}
              </span>
            </div>

            <div className="space-y-1 mt-2">
              <p className="font-mono text-3xl sm:text-4xl font-extrabold tracking-tight text-text leading-none">
                <AnimatedCounter value={userStatistic.statisticValue} />
              </p>
              <h4 className="text-xs font-bold text-text uppercase tracking-tight font-heading">{userStatistic.label}</h4>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Account Info Detail Block */}
      <motion.div 
        variants={itemVariants}
        className={cn(SWISS_STYLE_TOKENS.card, "p-6 flex flex-col justify-between gap-4")}
      >
        <div className="border-b border-border pb-2">
          <span className="text-[10px] font-mono font-bold text-swiss-accent tracking-wider uppercase">
            INFORMACIÓN DE CUENTA
          </span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-2">
          <div className="space-y-1">
            <span className="text-[10px] text-swiss-text-mute font-bold uppercase tracking-wider block">Tipo de cuenta</span>
            <span className="font-mono text-sm font-bold text-text">{user.type || "Developer"}</span>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-swiss-text-mute font-bold uppercase tracking-wider block">Sincronización</span>
            <span className="font-mono text-sm font-bold text-text">100% COMPLETADO</span>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-swiss-text-mute font-bold uppercase tracking-wider block">Fuente de Datos</span>
            <span className="font-mono text-xs text-swiss-accent font-bold bg-swiss-accent-soft px-2 py-0.5 border border-swiss-accent/10">GitHub API v3</span>
          </div>
        </div>
      </motion.div>

      {/* Sub-footer pills section */}
      <motion.footer 
        variants={itemVariants}
        className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 pt-6 text-xs font-bold border-t border-border"
      >
        {user.location && (
          <div className="flex items-center gap-2 px-3 py-2 border border-border bg-surface text-text-mute select-none">
            <MapPin size={14} className="text-swiss-accent" /> 
            <span>{user.location}</span>
          </div>
        )}
        
        {user.website && (
          <a
            href={user.website.startsWith("http") ? user.website : `https://${user.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 border border-border bg-surface text-text-mute hover:text-swiss-accent hover:border-swiss-accent transition-all duration-150"
          >
            <LinkIcon size={14} className="text-swiss-accent" /> 
            <span>WEBSITE OFICIAL</span>
          </a>
        )}
        
        <a
          href={user.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-text text-bg border border-text hover:bg-bg hover:text-text transition-all duration-150 font-bold cursor-pointer"
        >
          <Globe size={14} /> 
          <span>VER EN GITHUB</span>
        </a>
      </motion.footer>
    </motion.div>
  );
};

UserDetail.displayName = "UserDetail";

export default UserDetail;
