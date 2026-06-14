/**
 * @file Result Factory Component
 * @description 
 * Implementa el PATRÓN FACTORY (GoF Creacional).
 * Genera dinámicamente el componente especializado de tarjeta de usuario u organización.
 */

import PropTypes from "prop-types";
import UserCard from "./UserCard";
import { Building2 } from "lucide-react";

/**
 * Tarjeta especializada para Organizaciones con Badge Bento Glass
 */
const OrganizationCard = ({ org, variant = "glass" }) => (
  <UserCard variant={variant} login={org.username} className="relative">
    <UserCard.Avatar url={org.photo} login={org.username} variant={variant} />
    
    {variant !== "minimal" && (
      <div className="absolute top-3 right-3 z-20 flex items-center gap-1 px-2 py-0.5 rounded border border-app-border bg-app-bg text-app-muted text-[9px] font-mono font-bold uppercase tracking-tight select-none shadow-sm">
        <Building2 size={10} />
        <span>ORG</span>
      </div>
    )}

    <UserCard.Header login={`${org.username}`} variant={variant} />
    
    {/* Specialized visual description for orgs if displayed in list */}
    {variant !== "minimal" && (
      <div className="px-5 pb-1 -mt-3 text-center">
        <span className="font-mono text-[9px] text-app-muted/80 uppercase tracking-wider flex items-center justify-center gap-1">
          ORGANIZACIÓN VERIFICADA
        </span>
      </div>
    )}
    
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
 * @param {Object} props.data - Datos estandarizados del Adapter de Dominio
 * @param {string} [props.variant="glass"] - Variante visual para la tarjeta
 * @returns {JSX.Element} El componente especializado creado dinámicamente
 */
const ResultFactory = ({ data, variant = "glass" }) => {
  // Lógica de creación de productos visuales
  switch (data.type) {
    case "Organization":
      return <OrganizationCard org={data} variant={variant} />;
    
    case "User":
    default:
      return (
        <UserCard variant={variant} login={data.username}>
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
