/**
 * @file UserDetail.jsx
 * @description Vista detallada del perfil de usuario estilizada como un Dashboard Bento ultra-premium.
 */

import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, animate } from "motion/react";
import PropTypes from "prop-types";
import { ArrowLeft, Globe, MapPin, Link as LinkIcon, GitFork, Users, Heart, Code, Sparkles } from "lucide-react";
import UserDetailSkeleton from "@/presentation/features/user-detail/components/UserDetailSkeleton";
import { useUserDetailQuery } from "@/application/queries/useUserDetailQuery";
import { cn } from "@/lib/utils";

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
          <h3 className="text-2xl font-black font-heading text-app-text">Error de Conexión</h3>
          <p className="text-red-500/90 font-medium max-w-sm">
            {error?.message || "No pudimos encontrar el perfil de este desarrollador."}
          </p>
        </div>
        <Link to="/" className="btn-action-gradient text-xs px-6 py-2.5">
          Regresar al Buscador
        </Link>
      </div>
    );
  }

  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-8 md:space-y-12 py-8 md:py-12 px-4 relative"
    >
      {/* Background visual glow for detail */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-tr from-app-accent/5 to-purple-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <Link to="/" className="inline-block group">
        <button 
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-app-border bg-app-surface/50 backdrop-blur-md text-app-muted hover:text-app-text hover:border-app-text/20 transition-all text-xs font-semibold cursor-pointer active:scale-95 shadow-sm"
          aria-label="Volver a la búsqueda de usuarios"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
          <span>Volver a buscar</span>
        </button>
      </Link>

      {/* Profile Header Block */}
      <section className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-start text-center sm:text-left glass-card-pro p-6 sm:p-8 relative overflow-hidden">
        <div className="relative">
          <motion.img
            layoutId={`avatar-${user.username}`}
            src={user.photo}
            alt={`Avatar de ${user.username}`}
            className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full border-2 border-app-accent object-cover shadow-md transition-all duration-300 z-10 ring-4 ring-app-accent/10 dark:ring-app-accent/20"
          />
          {/* Subtle online status indicator in tech teal */}
          <span className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-3.5 h-3.5 bg-emerald-500 border-2 border-app-surface rounded-full z-20 shadow-sm" />
        </div>

        <div className="space-y-4 sm:pt-1 flex-1 min-w-0">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-app-text tracking-tight font-heading leading-none truncate">
              {user.name}
            </h2>
            <p className="font-mono text-xs sm:text-sm text-app-accent font-semibold tracking-tight">
              github.com/{user.username}
            </p>
          </div>
          
          {user.bio ? (
            <div className="relative pl-3 border-l-2 border-app-accent/20">
              <p className="text-app-muted text-xs sm:text-sm leading-relaxed max-w-xl mx-auto sm:mx-0 font-medium">
                {user.bio}
              </p>
            </div>
          ) : (
            <p className="text-app-muted/50 text-[11px] italic">Este desarrollador aún no ha añadido una biografía en su perfil de GitHub.</p>
          )}
        </div>
      </section>

      {/* Asymmetric Bento Box Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        
        {/* Bento 1: Repositories (Double width on large screens) */}
        <motion.div 
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="md:col-span-2 p-6 rounded-xl glass-card-pro flex flex-col justify-between gap-5 relative overflow-hidden"
        >
          {/* Subtle grid accent background */}
          <div className="absolute inset-0 bg-gradient-to-br from-app-accent/5 via-transparent to-transparent opacity-30 pointer-events-none" />
          
          <div className="flex items-center justify-between relative z-10">
            <div className="w-10 h-10 rounded-lg bg-app-bg border border-app-border flex items-center justify-center text-app-accent">
              <GitFork className="w-5 h-5" />
            </div>
            <span className="font-mono text-[9px] font-bold text-app-accent bg-app-accent/5 px-2.5 py-0.5 rounded border border-app-accent/15 tracking-wider uppercase">
              REPOS // CODEBASE
            </span>
          </div>

          <div className="space-y-1.5 mt-2 relative z-10">
            <p className="font-mono text-5xl sm:text-6xl font-black tracking-tight text-app-text">
              <AnimatedCounter value={user.repos} />
            </p>
            <h4 className="text-sm font-bold text-app-text font-heading">Repositorios Públicos</h4>
            <p className="text-[11px] text-app-muted font-medium max-w-sm">Proyectos independientes, bibliotecas publicadas y colaboraciones activas del desarrollador.</p>
          </div>

          {/* Premium animated gradient progress bar inspired by Tailwind CSS docs */}
          <div className="w-full bg-app-bg h-1.5 rounded-full overflow-hidden mt-1 border border-app-border relative z-10">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "75%" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 rounded-full"
            />
          </div>
        </motion.div>

        {/* Bento 2: Followers */}
        <motion.div 
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="p-6 rounded-xl glass-card-pro flex flex-col justify-between gap-5 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-lg bg-app-bg border border-app-border flex items-center justify-center text-app-accent">
              <Users className="w-5 h-5" />
            </div>
            <span className="font-mono text-[9px] font-bold text-app-muted bg-app-bg px-2.5 py-0.5 rounded border border-app-border uppercase tracking-wider">
              FOLLOWERS
            </span>
          </div>

          <div className="space-y-1 mt-2">
            <p className="font-mono text-4xl sm:text-5xl font-black tracking-tight text-app-text">
              <AnimatedCounter value={user.followers} />
            </p>
            <h4 className="text-xs font-bold text-app-text font-heading">Seguidores</h4>
            <p className="text-[11px] text-app-muted leading-relaxed">Cuentas que siguen sus actividades e integraciones diarias en GitHub.</p>
          </div>
        </motion.div>

        {/* Bento 3: Following */}
        <motion.div 
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="p-6 rounded-xl glass-card-pro flex flex-col justify-between gap-5 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-lg bg-app-bg border border-app-border flex items-center justify-center text-app-accent">
              <Heart className="w-5 h-5" />
            </div>
            <span className="font-mono text-[9px] font-bold text-app-muted bg-app-bg px-2.5 py-0.5 rounded border border-app-border uppercase tracking-wider">
              FOLLOWING
            </span>
          </div>

          <div className="space-y-1 mt-2">
            <p className="font-mono text-4xl sm:text-5xl font-black tracking-tight text-app-text">
              <AnimatedCounter value={user.following} />
            </p>
            <h4 className="text-xs font-bold text-app-text font-heading">Siguiendo</h4>
            <p className="text-[11px] text-app-muted leading-relaxed">Cuentas de interés técnico y repositorios bajo observación directa.</p>
          </div>
        </motion.div>

        {/* Bento 4: Gists */}
        <motion.div 
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="p-6 rounded-xl glass-card-pro flex flex-col justify-between gap-5 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-lg bg-app-bg border border-app-border flex items-center justify-center text-app-accent">
              <Code className="w-5 h-5" />
            </div>
            <span className="font-mono text-[9px] font-bold text-app-muted bg-app-bg px-2.5 py-0.5 rounded border border-app-border uppercase tracking-wider">
              GISTS
            </span>
          </div>

          <div className="space-y-1 mt-2">
            <p className="font-mono text-4xl sm:text-5xl font-black tracking-tight text-app-text">
              <AnimatedCounter value={user.gists} />
            </p>
            <h4 className="text-xs font-bold text-app-text font-heading">Gists Públicos</h4>
            <p className="text-[11px] text-app-muted leading-relaxed">Snippets y fragmentos de código rápido cargados en la nube de GitHub.</p>
          </div>
        </motion.div>

        {/* Bento 5: System Configuration/Build Log (Tailwind CLI) */}
        <motion.div 
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="p-6 rounded-xl glass-card-pro flex flex-col justify-between min-h-[160px] relative bg-[#090D16] border-slate-800 text-slate-300"
        >
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] opacity-90" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] opacity-90" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] opacity-90" />
            </div>
            <span className="font-mono text-[9px] text-slate-500 select-none">bash - tailwindcss</span>
          </div>
          
          <div className="font-mono text-[10px] sm:text-xs space-y-1.5 text-left flex-1 flex flex-col justify-center py-1">
            <div className="text-slate-500 select-none">$ tailwindcss --build</div>
            <div className="text-emerald-400 font-semibold flex items-center gap-1.5">
              <span>🚀</span> tailwindcss v4.0.0
            </div>
            <div className="text-sky-400 font-semibold flex items-center gap-1.5">
              <span>⚡️</span> [rebuild] 145 files changed in 14ms
            </div>
            <div className="text-slate-500/60 select-none text-[9px] mt-0.5">... listening for changes</div>
          </div>
        </motion.div>

      </div>

      {/* Sub-footer pills section */}
      <footer className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 pt-6 text-xs font-semibold border-t border-app-border">
        {user.location && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-app-border bg-app-surface text-app-muted shadow-sm select-none">
            <MapPin size={14} className="text-app-accent" /> 
            <span>{user.location}</span>
          </div>
        )}
        
        {user.website && (
          <a
            href={user.website.startsWith("http") ? user.website : `https://${user.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-app-border bg-app-surface text-app-muted hover:text-app-accent hover:border-app-accent/30 hover:shadow-sm transition-all duration-200"
          >
            <LinkIcon size={14} className="text-app-accent" /> 
            <span>Website Oficial</span>
          </a>
        )}
        
        <a
          href={user.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2 rounded-lg border border-transparent bg-app-accent text-white hover:bg-blue-600 shadow-sm transition-all duration-200 font-bold"
        >
          <Globe size={14} /> 
          <span>Ver en GitHub</span>
        </a>
      </footer>
    </motion.div>
  );
};

UserDetail.displayName = "UserDetail";

export default UserDetail;
