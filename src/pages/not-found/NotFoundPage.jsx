import PropTypes from "prop-types";
import { motion } from "motion/react";
import { Search } from "lucide-react";
import { cn } from "@/shared/lib/utils/utils";
import { SWISS_STYLE_TOKENS } from "@/shared";

const NotFound = ({ searchTerm }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.25 }}
    className={cn(SWISS_STYLE_TOKENS.card, "flex flex-col items-center justify-center text-center p-14 max-w-lg mx-auto mt-10 gap-6 rounded-none")} // Sharp corners
  >
    <div className="w-12 h-12 border border-border flex items-center justify-center text-text-mute rounded-none">
      <Search className="w-5 h-5" />
    </div>

    <div className="space-y-2">
      <h3 className="text-lg font-heading font-extrabold text-text uppercase tracking-tight">
        Sin resultados
      </h3>
      <p className="text-xs text-swiss-text-mute uppercase tracking-wide leading-relaxed font-bold">
        No encontramos nada para <span className="font-mono text-xs px-1.5 py-0.5 border border-border bg-surface text-swiss-accent">{searchTerm}</span>
      </p>
    </div>
  </motion.div>
);

NotFound.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};

export default NotFound;
