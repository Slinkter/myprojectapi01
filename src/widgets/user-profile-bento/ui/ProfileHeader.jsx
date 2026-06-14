import { motion } from "motion/react";
import PropTypes from "prop-types";

/**
 * ProfileHeader component.
 * Displays the main user details, avatar, username, and bio section.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.user - Normalized user details object.
 * @param {string} props.user.username - Github login username.
 * @param {string} props.user.name - Github name.
 * @param {string} props.user.photo - Avatar photo URL.
 * @param {string} props.user.bio - User bio.
 * @param {Object} props.variants - Motion animation variants.
 * @returns {JSX.Element} Profile header element.
 */
const ProfileHeader = ({ user, variants }) => {
  return (
    <motion.section
      variants={variants}
      className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-start text-center sm:text-left tailwind-card p-6 sm:p-8 relative overflow-hidden"
    >
      <div className="relative">
        <motion.img
          layoutId={`avatar-${user.username}`}
          src={user.photo}
          alt={`Avatar de ${user.username}`}
          className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full border border-border object-cover shadow-md transition-all duration-300 z-10 ring-4 ring-accent/10 dark:ring-accent/15"
        />
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
            <p className="text-text-mute text-xs sm:text-sm leading-relaxed max-w-xl mx-auto sm:mx-0 font-medium font-sans">
              {user.bio}
            </p>
          </div>
        ) : (
          <p className="text-text-mute/50 text-[11px] italic font-sans">
            Este desarrollador aún no ha añadido una biografía en su perfil de GitHub.
          </p>
        )}
      </div>
    </motion.section>
  );
};

ProfileHeader.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    bio: PropTypes.string,
  }).isRequired,
  variants: PropTypes.object,
};

ProfileHeader.displayName = "ProfileHeader";

export default ProfileHeader;
