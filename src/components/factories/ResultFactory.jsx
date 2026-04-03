/**
 * @file Result Factory Component
 * @description 
 * Implements the FACTORY PATTERN (GoF Creational).
 * Decides which specialized component to render based on the data type.
 */

import PropTypes from "prop-types";
import UserCard from "@/features/users/components/UserCard";
import { Building2 } from "lucide-react";

/**
 * Specialized component for Organizations
 */
const OrganizationCard = ({ org, variant = "glass" }) => (
  <UserCard variant={variant}>
    <UserCard.Avatar url={org.photo} login={org.username} variant={variant} />
    {variant !== "minimal" && (
      <div className="bg-app-accent text-app-bg text-[10px] font-bold px-2 py-0.5 rounded-full absolute top-4 right-4 z-20 flex items-center gap-1">
        <Building2 size={12} /> ORG
      </div>
    )}
    <UserCard.Header login={`${org.username} (Org)`} variant={variant} />
    <UserCard.Footer login={org.username} variant={variant} />
  </UserCard>
);

OrganizationCard.propTypes = {
  org: PropTypes.shape({
    photo: PropTypes.string,
    username: PropTypes.string,
  }).isRequired,
  variant: PropTypes.string,
};

/**
 * Result Factory
 * 
 * @param {Object} props.data - The standardized data from the Adapter
 * @param {string} [props.variant="glass"] - Visual variant for the card
 * @returns {JSX.Element} The appropriate component (UserCard or OrganizationCard)
 */
const ResultFactory = ({ data, variant = "glass" }) => {
  // Logic to decide which "product" to create
  switch (data.type) {
    case "Organization":
      return <OrganizationCard org={data} variant={variant} />;
    
    case "User":
    default:
      return (
        <UserCard variant={variant}>
          <UserCard.Avatar url={data.photo} login={data.username} variant={variant} />
          <UserCard.Header login={data.username} variant={variant} />
          <UserCard.Footer login={data.username} variant={variant} />
        </UserCard>
      );
  }
};

ResultFactory.propTypes = {
  data: PropTypes.shape({
    type: PropTypes.string,
    photo: PropTypes.string,
    username: PropTypes.string,
  }).isRequired,
  variant: PropTypes.string,
};

export default ResultFactory;
