

import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { UserDetailSkeleton } from "@/entities/user";
import { useUserDetailFacade } from "@/features/view-user-details";
import ProfileHeader from "./ui/ProfileHeader";
import ProfileFooter from "./ui/ProfileFooter";
import BentoStatsGrid from "./ui/BentoStatsGrid";
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
  const { user, isLoading, isError, error } = useUserDetailFacade();

  

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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto space-y-8 md:space-y-12 py-8 md:py-12 px-4 relative"
    >
      {}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-tr from-accent/5 to-indigo-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {}
      <motion.div variants={itemVariants} className="inline-block group">
        <Link to="/" className="cursor-pointer">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-surface text-text-mute hover:text-text hover:border-text/25 hover:shadow-sm transition-all text-xs font-semibold cursor-pointer active:scale-95"
            aria-label="Volver a la búsqueda de usuarios"
          >
            <ArrowLeft
              size={14}
              className="group-hover:-translate-x-1 transition-transform"
              aria-hidden="true"
            />
            <span>Volver a buscar</span>
          </button>
        </Link>
      </motion.div>

      {}
      <ProfileHeader user={user} variants={itemVariants} />
      <BentoStatsGrid user={user} variants={itemVariants} />
      <ProfileFooter user={user} variants={itemVariants} />
    </motion.div>
  );
};

UserDetail.displayName = "UserDetail";

export default UserDetail;
