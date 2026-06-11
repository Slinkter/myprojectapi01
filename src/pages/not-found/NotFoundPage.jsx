import PropTypes from "prop-types";
import { motion } from "motion/react";
import { Search } from "lucide-react";
import { cn } from "@/shared/lib/utils/utils";
import { THEME } from "@/shared/styles/theme";

const NotFound = ({ searchTerm }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className={cn(THEME.glassCard, "flex flex-col items-center justify-center text-center p-14 max-w-lg mx-auto mt-10 gap-6")}
  >
    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-text-mute">
      <Search className="w-5 h-5" />
    </div>

    <div className="space-y-2">
      <h3 className="text-lg font-heading font-bold text-text">
        Sin resultados
      </h3>
      <p className="text-sm text-text-mute leading-relaxed">
        No encontramos nada para <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-border/40 text-accent">{searchTerm}</span>
      </p>
    </div>
  </motion.div>
);

NotFound.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};

export default NotFound;
