

import { motion } from "motion/react";
import PropTypes from "prop-types";
import { MapPin, Link as LinkIcon, Globe } from "lucide-react";


const ProfileFooter = ({ user, variants }) => {
  return (
    <motion.footer
      variants={variants}
      className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 pt-6 text-xs font-semibold border-t border-border"
    >
      {}
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
  );
};

ProfileFooter.propTypes = {
  user: PropTypes.shape({
    location: PropTypes.string,
    website: PropTypes.string,
    profileUrl: PropTypes.string.isRequired,
  }).isRequired,
  variants: PropTypes.object,
};

ProfileFooter.displayName = "ProfileFooter";

export default ProfileFooter;
