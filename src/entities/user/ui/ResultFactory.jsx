/**
 * @file ResultFactory.jsx
 * @description Componente factoría que implementa el Patrón Factory (GoF).
 * Resuelve y monta dinámicamente tarjetas especializadas basadas en el tipo de entidad (User vs. Organization).
 */

import PropTypes from "prop-types";
import UserCard from "./UserCard";
import { Building2 } from "lucide-react";
import { log } from "@/shared";

/**
 * 🎓 CONCEPTO JUNIOR: Composición de Componentes
 * Nota cómo `OrganizationCard` no reinventa la rueda. Reutiliza el componente `<UserCard>` y sus submódulos
 * (`UserCard.Avatar`, `UserCard.Header`, etc.) pero le inyecta etiquetas ("ORG", "ORGANIZACIÓN VERIFICADA") 
 * que son exclusivas de empresas.
 *
 * Sub-componente especializado OrganizationCard.
 * Renderiza tarjetas con estilos dedicados para entidades categorizadas como Organizaciones.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.organization - Datos del perfil estandarizados.
 * @param {string} props.organization.username - Handle de GitHub.
 * @param {string} props.organization.photo - URL de la foto de perfil.
 * @param {string} [props.variant="default"] - Variante de diseño de la tarjeta.
 * @returns {JSX.Element} Componente de tarjeta de organización.
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
 * 🎓 CONCEPTO JUNIOR: Factory Pattern (Patrón Factoría) en React
 * Este componente no pinta estilos propios. Es una "fábrica". 
 * Recibe un objeto genérico (`userProfile`), mira su propiedad `.type`, y decide inteligentemente
 * qué componente React debe crear e instanciar (<OrganizationCard> o <UserCard> normal).
 * Esto evita llenar nuestra página principal de `if` y `else` interminables.
 *
 * Componente ResultFactory.
 * Decide si instanciar una OrganizationCard o una UserCard estándar basado en las propiedades de la entidad.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.userProfile - Modelo de dominio del usuario/organización.
 * @param {string} props.userProfile.type - Identificador del tipo de entidad ("User" o "Organization").
 * @param {string} props.userProfile.photo - URL de la imagen.
 * @param {string} props.userProfile.username - Handle del usuario.
 * @param {string} [props.variant="default"] - Variante de diseño.
 * @returns {JSX.Element} Tarjeta de producto resuelta dinámicamente.
 * 
 * @example
 * ```tsx
 * // Si le pasas un objeto type="Organization", devolverá el componente especial de empresa.
 * <ResultFactory userProfile={profileData} variant="glass" />
 * ```
 */
const ResultFactory = ({ userProfile, variant = "default" }) => {
  log.flow(`🏭 [PASO 5: ResultFactory] Decidiendo tipo de tarjeta para el perfil: "${userProfile.username}" (${userProfile.type})`);
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
