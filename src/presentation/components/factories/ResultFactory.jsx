/**
 * @file Result Factory Component
 * @description 
 * Implementa el PATRÓN FACTORY (GoF Creacional).
 * Genera dinámicamente el componente especializado de tarjeta de usuario u organización.
 */

import PropTypes from "prop-types";
import UserCard from "@/presentation/features/users/components/UserCard";
import { Building2, Sparkles } from "lucide-react";

/**
 * Tarjeta especializada para Organizaciones con Badge Bento Glass
 */
const OrganizationCard = ({ org, variant = "glass" }) => (
  <UserCard variant={variant} login={org.username} className="relative">
    <UserCard.Avatar url={org.photo} login={org.username} variant={variant} />
    
    {variant !== "minimal" && (
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1 px-2.5 py-1 rounded-full border border-violet-500/30 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 backdrop-blur-md text-violet-400 dark:text-violet-300 text-[10px] font-black uppercase tracking-wider select-none shadow-sm shadow-violet-500/10">
        <Building2 size={11} className="animate-pulse" />
        <span>Org</span>
      </div>
    )}

    <UserCard.Header login={`${org.username}`} variant={variant} />
    
    {/* Specialized visual description for orgs if displayed in list */}
    {variant !== "minimal" && (
      <div className="px-6 pb-2 -mt-4 text-center">
        <span className="text-[10px] font-bold text-app-muted/70 uppercase tracking-widest flex items-center justify-center gap-1">
          <Sparkles size={10} className="text-violet-400" /> Cuenta Corporativa
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
