/**
 * @file ResultFactory.jsx
 * @description Factory component implementing the GoF Factory Pattern.
 * Dynamically resolves and mounts specialized cards based on the entity type (User vs. Organization).
 */

import PropTypes from "prop-types";
import UserCard from "./UserCard";
import { Building2 } from "lucide-react";

/**
 * OrganizationCard specialized sub-component.
 * Renders dedicated styling cards for entities categorized as Organizations.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.organization - Estandardized profile data.
 * @param {string} props.organization.username - GitHub handle.
 * @param {string} props.organization.photo - Profile photo URL.
 * @param {string} [props.variant="default"] - Card styling presets.
 * @returns {JSX.Element} Organization card component.
 */
const OrganizationCard = ({ organization, variant = "default" }) => (
  <UserCard variant={variant} username={organization.username} className="relative">
    <UserCard.Avatar avatarUrl={organization.photo} username={organization.username} variant={variant} />
    
    {variant !== "minimal" && (
      <div className="absolute top-3 right-3 z-20 flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-border bg-surface text-accent text-[9px] font-mono font-bold uppercase tracking-tight select-none shadow-sm">
        <Building2 size={10} />
        <span>ORG</span>
      </div>
    )}

    <UserCard.Header username={organization.username} variant={variant} />
    
    {variant !== "minimal" && (
      <div className="px-5 pb-1 -mt-3 text-center">
        <span className="font-mono text-[9px] text-text-mute/80 uppercase tracking-wider flex items-center justify-center gap-1">
          ORGANIZACIÓN VERIFICADA
        </span>
      </div>
    )}
    
    <UserCard.Footer username={organization.username} variant={variant} />
  </UserCard>
);

OrganizationCard.propTypes = {
  organization: PropTypes.shape({
    photo: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
  variant: PropTypes.string,
};

OrganizationCard.displayName = "OrganizationCard";

/**
 * ResultFactory component.
 * Decides whether to instantiate an OrganizationCard or a standard UserCard based on entity properties.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.userProfile - Domain model for the user/organization.
 * @param {string} props.userProfile.type - Domain entity type identifier ("User" or "Organization").
 * @param {string} props.userProfile.photo - Image URL.
 * @param {string} props.userProfile.username - Profile username handle.
 * @param {string} [props.variant="default"] - Card styling presets.
 * @returns {JSX.Element} Product card resolved dynamically by factory checks.
 */
const ResultFactory = ({ userProfile, variant = "default" }) => {
  switch (userProfile.type) {
    case "Organization":
      return <OrganizationCard organization={userProfile} variant={variant} />;
    
    case "User":
    default:
      return (
        <UserCard variant={variant} username={userProfile.username}>
          <UserCard.Avatar avatarUrl={userProfile.photo} username={userProfile.username} variant={variant} />
          <UserCard.Header username={userProfile.username} variant={variant} />
          <UserCard.Footer username={userProfile.username} variant={variant} />
        </UserCard>
      );
  }
};

ResultFactory.propTypes = {
  userProfile: PropTypes.shape({
    type: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
  variant: PropTypes.string,
};

ResultFactory.displayName = "ResultFactory";

export default ResultFactory;
