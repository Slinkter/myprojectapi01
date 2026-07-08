

/**
 * @file ResultFactory.jsx
 * @description Fábrica de componentes visuales para renderizar diferentes tipos de perfiles
 * (usuarios u organizaciones) manteniendo la coherencia de la UI.
 */

import PropTypes from "prop-types";
import UserCard from "./UserCard";
import { Building2 } from "lucide-react";

/**
 * 🎓 CONCEPTO JUNIOR: Patrón Factory (Fábrica)
 * El patrón Factory es un plano de diseño que crea objetos o componentes en tiempo de ejecución 
 * evaluando ciertas condiciones, sin que el componente padre necesite saber los detalles de creación.
 * Aquí decidimos renderizar 'OrganizationCard' o 'UserCard' dinámicamente según la propiedad 'type' del usuario.
 */

/**
 * Componente que representa la tarjeta visual para una Organización.
 * 
 * @component OrganizationCard
 * @param {Object} props - Propiedades del componente.
 * @param {import('../model/adapter').UserProfile} props.organization - Objeto de perfil de organización adaptado.
 * @param {string} [props.variant="default"] - Variante visual estético.
 * @returns {React.JSX.Element} Tarjeta visual de organización.
 */
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


/**
 * Fábrica condicional de tarjetas de perfil de GitHub.
 * 
 * @component ResultFactory
 * @param {Object} props - Propiedades del componente.
 * @param {import('../model/adapter').UserProfile} props.userProfile - Perfil de usuario u organización adaptado.
 * @param {string} [props.variant="default"] - Variante visual estético.
 * @returns {React.JSX.Element} El componente de tarjeta correspondiente.
 * 
 * @example
 * ```tsx
 * <ResultFactory userProfile={adaptedProfile} variant="default" />
 * ```
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
