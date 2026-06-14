import { motion } from "motion/react";
import PropTypes from "prop-types";
import { cn, TAILWIND_STYLE_TOKENS } from "@/shared";

/**
 * AccountStatus component.
 * Displays developer profile sync diagnostics status and account type in a Bento box cell.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.user - Normalized user details object.
 * @param {string} props.user.type - The account type (e.g., "User", "Organization").
 * @param {Object} props.variants - Motion animation variants.
 * @returns {JSX.Element} Account status element.
 */
const AccountStatus = ({ user, variants }) => {
  return (
    <motion.div
      variants={variants}
      whileHover={{ y: -4, scale: 1.005 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className={cn(
        TAILWIND_STYLE_TOKENS.card,
        "p-6 flex flex-col justify-between min-h-[160px] relative group/bento",
      )}
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
          <span className="text-text-mute font-medium font-sans">Tipo de cuenta</span>
          <span className="font-mono font-bold text-text">{user.type || "Developer"}</span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="text-text-mute font-medium font-sans">Sincronización</span>
          <span className="text-text font-bold font-sans">100% Completado</span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="text-text-mute font-medium font-sans">Fuente de Datos</span>
          <span className="font-mono text-[10px] text-accent font-semibold bg-accent-soft px-2 py-0.5 rounded border border-accent/10">
            GitHub API v3
          </span>
        </div>
      </div>
    </motion.div>
  );
};

AccountStatus.propTypes = {
  user: PropTypes.shape({
    type: PropTypes.string.isRequired,
  }).isRequired,
  variants: PropTypes.object,
};

AccountStatus.displayName = "AccountStatus";

export default AccountStatus;
