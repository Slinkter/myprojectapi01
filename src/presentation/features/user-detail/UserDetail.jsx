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
      <section className="flex flex-col sm:flex-row gap-8 items-center sm:items-start text-center sm:text-left glass-card-pro p-8 sm:p-10 relative overflow-hidden">
        {/* Decorative corner visual */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-app-accent/10 to-transparent blur-xl pointer-events-none" />

        <div className="relative group/avatar">
          {/* Glowing ring under image */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-app-accent to-indigo-500 opacity-60 blur-md group-hover/avatar:opacity-100 group-hover/avatar:scale-105 transition-all duration-700 pointer-events-none" />
          
          <motion.img
            layoutId={`avatar-${user.username}`}
            src={user.photo}
            alt={`Avatar de ${user.username}`}
            className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-app-surface object-cover shadow-2xl transition-all duration-500 grayscale-[0.05] group-hover/avatar:grayscale-0 z-10"
          />
        </div>

        <div className="space-y-4 sm:pt-2 flex-1 min-w-0">
          <div className="space-y-1">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-app-text tracking-tight font-heading leading-tight truncate">
              {user.name}
            </h2>
            <p className="text-base sm:text-lg text-app-accent font-bold tracking-wider font-heading">
              @{user.username}
            </p>
          </div>
          
          {user.bio ? (
            <p className="text-app-muted text-sm sm:text-base leading-relaxed max-w-xl mx-auto sm:mx-0 font-medium">
              {user.bio}
            </p>
          ) : (
            <p className="text-app-muted/50 text-xs italic">Este desarrollador aún no ha añadido una biografía en su perfil de GitHub.</p>
          )}
        </div>
      </section>

      {/* Asymmetric Bento Box Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        
        {/* Bento 1: Repositories (Double width on large screens) */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="md:col-span-2 p-8 rounded-2xl glass-card-pro border-app-accent/20 bg-gradient-to-br from-app-accent/10 via-indigo-500/5 to-transparent flex flex-col justify-between gap-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-app-accent/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-app-accent/20 flex items-center justify-center text-app-accent shadow-md shadow-app-accent/10">
              <GitFork className="w-6 h-6 animate-pulse" />
            </div>
            <span className="text-[10px] font-black tracking-widest text-app-accent uppercase bg-app-accent/10 px-3 py-1 rounded-full border border-app-accent/20">
              Código Activo
            </span>
          </div>

          <div className="space-y-2 mt-4">
            <p className="text-5xl font-black tracking-tighter text-app-text font-heading">
              <AnimatedCounter value={user.repos} />
            </p>
            <h4 className="text-lg font-bold text-app-text font-heading">Repositorios Públicos</h4>
            <p className="text-xs text-app-muted font-medium max-w-sm">Proyectos independientes, forks y colaboraciones activas registradas en GitHub.</p>
          </div>

          {/* Decorative mini metric bar */}
          <div className="w-full bg-app-text/5 h-1.5 rounded-full overflow-hidden mt-2 border border-app-border/10">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "70%" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-app-accent to-indigo-500 rounded-full"
            />
          </div>
        </motion.div>

        {/* Bento 2: Followers (Violet Glow Theme) */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="p-8 rounded-2xl glass-card-pro border-violet-500/20 bg-gradient-to-br from-violet-500/10 via-fuchsia-500/5 to-transparent flex flex-col justify-between gap-6 relative overflow-hidden"
        >
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-violet-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center text-violet-400">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-[9px] font-bold text-violet-400/90 uppercase tracking-widest">Audiencia</span>
          </div>

          <div className="space-y-1 mt-4">
            <p className="text-4xl font-extrabold tracking-tighter text-app-text font-heading">
              <AnimatedCounter value={user.followers} />
            </p>
            <h4 className="text-sm font-bold text-app-text font-heading">Seguidores</h4>
            <p className="text-[11px] text-app-muted leading-snug mt-1">Desarrolladores inspirados por su código y contribuciones diarias.</p>
          </div>
        </motion.div>

        {/* Bento 3: Following */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="p-8 rounded-2xl glass-card-pro flex flex-col justify-between gap-6 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Heart className="w-5 h-5 text-indigo-400" />
            </div>
            <span className="text-[9px] font-bold text-indigo-400/90 uppercase tracking-widest">Comunidad</span>
          </div>

          <div className="space-y-1 mt-4">
            <p className="text-4xl font-extrabold tracking-tighter text-app-text font-heading">
              <AnimatedCounter value={user.following} />
            </p>
            <h4 className="text-sm font-bold text-app-text font-heading">Siguiendo</h4>
            <p className="text-[11px] text-app-muted leading-snug mt-1">Perfiles que este desarrollador sigue de cerca para mantenerse al día.</p>
          </div>
        </motion.div>

        {/* Bento 4: Gists (Gold Editorial Style) */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="p-8 rounded-2xl glass-card-pro border-amber-500/20 bg-gradient-to-br from-amber-500/10 via-yellow-500/5 to-transparent flex flex-col justify-between gap-6 relative overflow-hidden"
        >
          <div className="absolute -top-6 -right-6 w-20 h-20 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-500">
              <Code className="w-5 h-5" />
            </div>
            <span className="text-[9px] font-bold text-amber-500/90 uppercase tracking-widest">Snippets</span>
          </div>

          <div className="space-y-1 mt-4">
            <p className="text-4xl font-extrabold tracking-tighter text-app-text font-heading">
              <AnimatedCounter value={user.gists} />
            </p>
            <h4 className="text-sm font-bold text-app-text font-heading">Gists Creados</h4>
            <p className="text-[11px] text-app-muted leading-snug mt-1">Fragmentos de código de utilidad y scripts compartidos en GitHub.</p>
          </div>
        </motion.div>

        {/* Bento 5: Sparkle Tech Badge (Decorative Grid-Filler Card) */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="p-8 rounded-2xl glass-card-pro bg-gradient-to-br from-purple-500/5 to-indigo-500/10 flex flex-col justify-between relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-xl pointer-events-none" />
          
          <div className="flex items-center gap-2 text-app-accent">
            <Sparkles size={16} className="animate-spin" style={{ animationDuration: "12s" }} />
            <span className="text-[9px] font-black uppercase tracking-widest">Tecnología</span>
          </div>
          
          <div className="space-y-2 mt-4">
            <h4 className="text-base font-black tracking-tight text-app-text font-heading">Dev Hub Profile</h4>
            <p className="text-[10px] text-app-muted leading-normal">
              Esta ficha ha sido normalizada e importada con validación Zod en tiempo de ejecución.
            </p>
          </div>
        </motion.div>

      </div>

      {/* Sub-footer pills section */}
      <footer className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 pt-8 text-sm font-medium border-t border-app-border/40">
        {user.location && (
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-app-border bg-app-surface/60 backdrop-blur-md text-app-muted shadow-sm select-none">
            <MapPin size={15} className="text-app-accent" /> 
            <span>{user.location}</span>
          </div>
        )}
        
        {user.website && (
          <a
            href={user.website.startsWith("http") ? user.website : `https://${user.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-app-border bg-app-surface/60 backdrop-blur-md text-app-muted hover:text-app-accent hover:border-app-accent/20 hover:shadow-sm transition-all duration-300"
          >
            <LinkIcon size={15} className="text-app-accent" /> 
            <span>Website Oficial</span>
          </a>
        )}
        
        <a
          href={user.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-app-accent/20 bg-app-accent/5 backdrop-blur-md text-app-accent hover:bg-app-accent hover:text-app-bg hover:shadow-md hover:shadow-app-accent/10 transition-all duration-300 font-bold"
        >
          <Globe size={15} /> 
          <span>Ver en GitHub</span>
        </a>
      </footer>
    </motion.div>
  );
};

UserDetail.displayName = "UserDetail";

export default UserDetail;
