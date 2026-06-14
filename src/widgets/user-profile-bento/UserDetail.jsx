/**
 * @file UserDetail.jsx
 * @description Vista detallada del perfil de usuario estilizada como un Bento Dashboard de Tailwind CSS.
 */

import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, animate } from "motion/react";
import PropTypes from "prop-types";
import { ArrowLeft, Globe, MapPin, Link as LinkIcon, GitFork, Users, Heart, Code } from "lucide-react";
import { UserDetailSkeleton, useUserDetailQuery } from "@/entities/user";
import { cn, TAILWIND_STYLE_TOKENS } from "@/shared";

/**
 * Animated Counter Component
 */
const AnimatedCounter = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1.2,
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
      staggerChildren: 0.05,
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
      stiffness: 140,
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
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 text-3xl font-extrabold shadow-lg animate-pulse">
          !
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-extrabold font-heading text-text">Error de Conexión</h3>
          <p className="text-red-500/90 font-medium max-w-sm">
            {error?.message || "No pudimos encontrar el perfil de este desarrollador."}
          </p>
        </div>
        <Link to="/" className="btn-tailwind text-xs px-6 py-2.5">
          Regresar al Buscador
        </Link>
      </div>
    );
  }

  if (!user) return null;

  // Statistics items array using descriptive Clean Code naming conventions
  const userStatisticsList = [
    { label: "Repositorios", statisticValue: user.repos, icon: <GitFork className="w-5 h-5" /> },
    { label: "Seguidores", statisticValue: user.followers, icon: <Users className="w-5 h-5" /> },
    { label: "Siguiendo", statisticValue: user.following, icon: <Heart className="w-5 h-5" /> },
    { label: "Gists", statisticValue: user.gists, icon: <Code className="w-5 h-5" /> },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto space-y-8 md:space-y-12 py-8 md:py-12 px-4 relative"
    >
      {/* Background visual glow for detail */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-tr from-accent/5 to-indigo-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <motion.div variants={itemVariants} className="inline-block group">
        <Link to="/" className="cursor-pointer">
          <button 
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-surface text-text-mute hover:text-text hover:border-text/25 hover:shadow-sm transition-all text-xs font-semibold cursor-pointer active:scale-95"
            aria-label="Volver a la búsqueda de usuarios"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
            <span>Volver a buscar</span>
          </button>
        </Link>
      </motion.div>

      {/* Profile Header Block */}
      <motion.section 
        variants={itemVariants}
        className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-start text-center sm:text-left tailwind-card p-6 sm:p-8 relative overflow-hidden"
      >
        <div className="relative">
          <motion.img
            layoutId={`avatar-${user.username}`}
            src={user.photo}
            alt={`Avatar de ${user.username}`}
            className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full border border-border object-cover shadow-md transition-all duration-300 z-10 ring-4 ring-accent/10 dark:ring-accent/15"
          />
          {/* Online status indicator */}
          <span className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-3.5 h-3.5 bg-emerald-500 border-2 border-surface rounded-full z-20 shadow-sm" />
        </div>

        <div className="space-y-4 sm:pt-1 flex-1 min-w-0">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text tracking-tight font-heading leading-tight truncate">
              {user.name}
            </h2>
            <p className="font-mono text-xs sm:text-sm text-accent font-semibold tracking-tight">
              github.com/{user.username}
            </p>
          </div>
          
          {user.bio ? (
            <div className="relative pl-3 border-l-2 border-accent/20">
              <p className="text-text-mute text-xs sm:text-sm leading-relaxed max-w-xl mx-auto sm:mx-0 font-medium">
                {user.bio}
              </p>
            </div>
          ) : (
            <p className="text-text-mute/50 text-[11px] italic">Este desarrollador aún no ha añadido una biografía en su perfil de GitHub.</p>
          )}
        </div>
      </motion.section>

      {/* Asymmetric Bento Box Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        
        {/* Bento 1: Repositories (Double width on large screens) */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -4, scale: 1.005 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className={cn(TAILWIND_STYLE_TOKENS.card, "md:col-span-2 p-6 flex flex-col justify-between gap-5 relative overflow-hidden group/bento")}
        >
          {/* Subtle grid accent background */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-40 pointer-events-none" />
          
          <div className="flex items-center justify-between relative z-10">
            <div className="w-10 h-10 rounded-lg bg-bg border border-border flex items-center justify-center text-accent">
              <GitFork className="w-5 h-5" />
            </div>
            <span className="font-mono text-[9px] font-bold text-accent bg-accent-soft px-2.5 py-0.5 rounded border border-accent/15 tracking-wider uppercase">
              REPOSITORIOS // CÓDIGO
            </span>
          </div>

          <div className="space-y-1.5 mt-2 relative z-10">
            <p className="font-mono text-5xl sm:text-6xl font-black tracking-tight text-text leading-none">
              <AnimatedCounter value={user.repos} />
            </p>
            <h4 className="text-sm font-bold text-text font-heading">Repositorios Públicos</h4>
            <p className="text-[11px] text-text-mute font-medium max-w-sm">Proyectos independientes, bibliotecas publicadas y colaboraciones activas del desarrollador.</p>
          </div>

          {/* Premium animated gradient progress bar inspired by Tailwind CSS docs */}
          <div className="w-full bg-bg h-1.5 rounded-full overflow-hidden mt-1 border border-border relative z-10">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "75%" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 rounded-full"
            />
          </div>
        </motion.div>

        {/* Bento 2: Followers */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -4, scale: 1.005 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className={cn(TAILWIND_STYLE_TOKENS.card, "p-6 flex flex-col justify-between gap-5 relative overflow-hidden group/bento")}
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-lg bg-bg border border-border flex items-center justify-center text-accent">
              <Users className="w-5 h-5" />
            </div>
            <span className="font-mono text-[9px] font-bold text-text-mute bg-bg px-2.5 py-0.5 rounded border border-border uppercase tracking-wider">
              SEGUIDORES
            </span>
          </div>

          <div className="space-y-1 mt-2">
            <p className="font-mono text-4xl sm:text-5xl font-black tracking-tight text-text leading-none">
              <AnimatedCounter value={user.followers} />
            </p>
            <h4 className="text-xs font-bold text-text font-heading">Seguidores</h4>
            <p className="text-[11px] text-text-mute leading-relaxed">Cuentas que siguen sus actividades e integraciones diarias en GitHub.</p>
          </div>
        </motion.div>

        {/* Bento 3: Following */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -4, scale: 1.005 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className={cn(TAILWIND_STYLE_TOKENS.card, "p-6 flex flex-col justify-between gap-5 relative overflow-hidden group/bento")}
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-lg bg-bg border border-border flex items-center justify-center text-accent">
              <Heart className="w-5 h-5" />
            </div>
            <span className="font-mono text-[9px] font-bold text-text-mute bg-bg px-2.5 py-0.5 rounded border border-border uppercase tracking-wider">
              SIGUIENDO
            </span>
          </div>

          <div className="space-y-1 mt-2">
            <p className="font-mono text-4xl sm:text-5xl font-black tracking-tight text-text leading-none">
              <AnimatedCounter value={user.following} />
            </p>
            <h4 className="text-xs font-bold text-text font-heading">Siguiendo</h4>
            <p className="text-[11px] text-text-mute leading-relaxed">Cuentas de interés técnico y repositorios bajo observación directa.</p>
          </div>
        </motion.div>

        {/* Bento 4: Gists */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -4, scale: 1.005 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className={cn(TAILWIND_STYLE_TOKENS.card, "p-6 flex flex-col justify-between gap-5 relative overflow-hidden group/bento")}
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-lg bg-bg border border-border flex items-center justify-center text-accent">
              <Code className="w-5 h-5" />
            </div>
            <span className="font-mono text-[9px] font-bold text-text-mute bg-bg px-2.5 py-0.5 rounded border border-border uppercase tracking-wider">
              GISTS
            </span>
          </div>

          <div className="space-y-1 mt-2">
            <p className="font-mono text-4xl sm:text-5xl font-black tracking-tight text-text leading-none">
              <AnimatedCounter value={user.gists} />
            </p>
            <h4 className="text-xs font-bold text-text font-heading">Gists Públicos</h4>
            <p className="text-[11px] text-text-mute leading-relaxed">Snippets y fragmentos de código rápido cargados en la nube de GitHub.</p>
          </div>
        </motion.div>

        {/* Bento 5: Developer Profile Metadata Status */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -4, scale: 1.005 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className={cn(TAILWIND_STYLE_TOKENS.card, "p-6 flex flex-col justify-between min-h-[160px] relative group/bento")}
        >
          <div className="flex items-center justify-between border-b border-border pb-2.5">
            <span className="text-[10px] font-mono font-bold text-accent tracking-wider uppercase">
              Estado de Cuenta
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-[9px] text-text-mute select-none">ONLINE</span>
            </span>
          </div>
          
          <div className="space-y-2.5 py-2 text-left">
            <div className="flex justify-between items-center text-xs">
              <span className="text-text-mute font-medium">Tipo de cuenta</span>
              <span className="font-mono font-bold text-text">{user.type || "Developer"}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-text-mute font-medium">Sincronización</span>
              <span className="text-text font-bold">100% Completado</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-text-mute font-medium">Fuente de Datos</span>
              <span className="font-mono text-[10px] text-accent font-semibold bg-accent-soft px-2 py-0.5 rounded border border-accent/10">GitHub API v3</span>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Sub-footer pills section */}
      <motion.footer 
        variants={itemVariants}
        className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 pt-6 text-xs font-semibold border-t border-border"
      >
        {user.location && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-surface text-text-mute shadow-sm select-none">
            <MapPin size={14} className="text-accent" /> 
            <span>{user.location}</span>
          </div>
        )}
        
        {user.website && (
          <a
            href={user.website.startsWith("http") ? user.website : `https://${user.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-surface text-text-mute hover:text-accent hover:border-accent/30 hover:shadow-sm transition-all duration-200"
          >
            <LinkIcon size={14} className="text-accent" /> 
            <span>Website Oficial</span>
          </a>
        )}
        
        <a
          href={user.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-white hover:bg-sky-600 shadow-sm transition-all duration-200 font-bold cursor-pointer"
        >
          <Globe size={14} /> 
          <span>Ver en GitHub</span>
        </a>
      </motion.footer>
    </motion.div>
  );
};

UserDetail.displayName = "UserDetail";

export default UserDetail;
