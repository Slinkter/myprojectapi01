/**
 * @file Result Factory Component
 * @description 
 * Implements the FACTORY PATTERN (GoF Creational).
 * Decides which specialized component to render based on the data type.
 */

import PropTypes from "prop-types";
import UserCard from "@/features/users/components/UserCard";
import { FaBuilding } from "react-icons/fa";

/**
 * Specialized component for Organizations
 */
const OrganizationCard = ({ org }) => (
  <UserCard>
    <UserCard.Avatar url={org.photo} login={org.username} />
    <div className="bg-brand-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full absolute top-4 right-4 z-20 flex items-center gap-1">
      <FaBuilding /> ORG
    </div>
    <UserCard.Header login={`${org.username} (Org)`} />
    <UserCard.Footer login={org.username} />
  </UserCard>
);

OrganizationCard.propTypes = {
  org: PropTypes.shape({
    photo: PropTypes.string,
    username: PropTypes.string,
  }).isRequired,
};

/**
 * Result Factory
 * 
 * @param {Object} props.data - The standardized data from the Adapter
 * @returns {JSX.Element} The appropriate component (UserCard or OrganizationCard)
 */
const ResultFactory = ({ data }) => {
  // Logic to decide which "product" to create
  switch (data.type) {
    case "Organization":
      return <OrganizationCard org={data} />;
    
    case "User":
    default:
      return (
        <UserCard>
          <UserCard.Avatar url={data.photo} login={data.username} />
          <UserCard.Header login={data.username} />
          <UserCard.Footer login={data.username} />
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
};

export default ResultFactory;
