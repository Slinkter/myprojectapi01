/**
 * @file ResultFactory.jsx
 * @description 
 * Implementa el PATRÓN FACTORY (GoF Creacional).
 * Genera dinámicamente el componente especializado de tarjeta de usuario u organización.
 */

import PropTypes from "prop-types";
import UserCard from "./UserCard";
import { Building2 } from "lucide-react";

/**
 * Tarjeta especializada para Organizaciones con estilo minimalista suizo.
 */
const OrganizationCard = ({ organization, variant = "default" }) => (
  <UserCard variant={variant} username={organization.username} className="relative">
    <UserCard.Avatar avatarUrl={organization.photo} username={organization.username} variant={variant} />
    
    {variant !== "minimal" && (
      <div className="absolute top-3 right-3 z-20 flex items-center gap-1 px-2 py-0.5 rounded-none border border-swiss-border bg-swiss-bg text-swiss-text-mute text-[9px] font-mono font-bold uppercase tracking-tight select-none shadow-sm">
        <Building2 size={10} />
        <span>ORG</span>
      </div>
    )}

    <UserCard.Header username={organization.username} variant={variant} />
    
    {/* Specialized visual description for orgs if displayed in list */}
    {variant !== "minimal" && (
      <div className="px-5 pb-1 -mt-3 text-center">
        <span className="font-mono text-[9px] text-swiss-text-mute/80 uppercase tracking-wider flex items-center justify-center gap-1">
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

/**
 * Result Factory
 * 
 * @param {Object} props.userProfile - Datos estandarizados del Adapter de Dominio
 * @param {string} [props.variant="default"] - Variante visual para la tarjeta
 * @returns {JSX.Element} El componente especializado creado dinámicamente
 */
const ResultFactory = ({ userProfile, variant = "default" }) => {
  // Lógica de creación de productos visuales
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

export default ResultFactory;
