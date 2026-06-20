

import PropTypes from "prop-types";
import UserCard from "./UserCard";
import { Building2 } from "lucide-react";



const OrganizationCard = ({ organization, variant = "default" }) => {
  return (
    <UserCard variant={variant} username={organization.username}>
      <UserCard.Avatar avatarUrl={organization.photo} username={organization.username} variant={variant} />
      <UserCard.Header username={organization.username} variant={variant}>
        <span className="flex items-center gap-1 mt-1 text-[10px] font-semibold tracking-wider text-pink-500 uppercase bg-pink-500/10 px-2 py-0.5 rounded-full border border-pink-500/20">
          <Building2 size={10} className="animate-pulse" />
          Organización
        </span>
      </UserCard.Header>
      <UserCard.Footer username={organization.username} variant={variant} />
    </UserCard>
  );
};

OrganizationCard.propTypes = {
  organization: PropTypes.shape({
    username: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
  }).isRequired,
  variant: PropTypes.string,
};

OrganizationCard.displayName = "OrganizationCard";


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
