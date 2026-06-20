

import { motion } from "motion/react";
import PropTypes from "prop-types";
import { GitFork, Users, Heart, Code } from "lucide-react";
import { cn, TAILWIND_STYLE_TOKENS } from "@/shared";
import AnimatedCounter from "./AnimatedCounter";
import AccountStatus from "./AccountStatus";


const BentoStatsGrid = ({ user, variants }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
      {}
      <motion.div
        variants={variants}
        whileHover={{ y: -4, scale: 1.005 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className={cn(
          TAILWIND_STYLE_TOKENS.card,
          "md:col-span-2 p-6 flex flex-col justify-between gap-5 relative overflow-hidden group/bento",
        )}
      >
        {}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-40 pointer-events-none" />

        <div className="flex items-center justify-between relative z-10">
          <div className="w-10 h-10 rounded-lg bg-bg border border-border flex items-center justify-center text-accent">
            <GitFork className="w-5 h-5" />
          </div>
          <span className="font-mono text-[9px] font-bold text-accent bg-accent-soft px-2.5 py-0.5 rounded border border-accent/15 tracking-wider uppercase">
            REPOSITORIOS 

          </span>
        </div>

        <div className="space-y-1.5 mt-2 relative z-10">
          <p className="font-mono text-5xl sm:text-6xl font-black tracking-tight text-text leading-none">
            <AnimatedCounter value={user.repos} />
          </p>
          <h4 className="text-sm font-bold text-text font-heading font-sans">
            Repositorios Públicos
          </h4>
          <p className="text-[11px] text-text-mute font-medium max-w-sm font-sans">
            Proyectos independientes, bibliotecas publicadas y colaboraciones activas del
            desarrollador.
          </p>
        </div>

        <div className="w-full bg-bg h-1.5 rounded-full overflow-hidden mt-1 border border-border relative z-10">
          {}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "75%" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"
          />
        </div>
      </motion.div>

      {}
      <motion.div
        variants={variants}
        whileHover={{ y: -4, scale: 1.005 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className={cn(
          TAILWIND_STYLE_TOKENS.card,
          "p-6 flex flex-col justify-between gap-5 relative overflow-hidden group/bento",
        )}
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
          <h4 className="text-xs font-bold text-text font-heading font-sans">Seguidores</h4>
          <p className="text-[11px] text-text-mute leading-relaxed font-sans">
            Cuentas que siguen sus actividades e integraciones diarias en GitHub.
          </p>
        </div>
      </motion.div>

      {}
      <motion.div
        variants={variants}
        whileHover={{ y: -4, scale: 1.005 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className={cn(
          TAILWIND_STYLE_TOKENS.card,
          "p-6 flex flex-col justify-between gap-5 relative overflow-hidden group/bento",
        )}
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
          <h4 className="text-xs font-bold text-text font-heading font-sans">Siguiendo</h4>
          <p className="text-[11px] text-text-mute leading-relaxed font-sans">
            Cuentas de interés técnico y repositorios bajo observación directa.
          </p>
        </div>
      </motion.div>

      {}
      <motion.div
        variants={variants}
        whileHover={{ y: -4, scale: 1.005 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className={cn(
          TAILWIND_STYLE_TOKENS.card,
          "p-6 flex flex-col justify-between gap-5 relative overflow-hidden group/bento",
        )}
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
          <h4 className="text-xs font-bold text-text font-heading font-sans">Gists Públicos</h4>
          <p className="text-[11px] text-text-mute leading-relaxed font-sans">
            Snippets y fragmentos de código rápido cargados en la nube de GitHub.
          </p>
        </div>
      </motion.div>

      {}
      <AccountStatus user={user} variants={variants} />
    </div>
  );
};

BentoStatsGrid.propTypes = {
  user: PropTypes.shape({
    repos: PropTypes.number.isRequired,
    followers: PropTypes.number.isRequired,
    following: PropTypes.number.isRequired,
    gists: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  variants: PropTypes.object,
};

BentoStatsGrid.displayName = "BentoStatsGrid";

export default BentoStatsGrid;
