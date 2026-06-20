/**
 * @file ResultFactory.jsx
 * @description Componente factoría que implementa el Patrón Factory (GoF).
 * Resuelve y monta dinámicamente tarjetas especializadas basadas en el tipo de entidad (User vs. Organization).
 */

import PropTypes from "prop-types";
import UserCard from "./UserCard";
import { Building2 } from "lucide-react";
import { log, useComponentProfiler } from "@/shared";

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
 * @param {string} [props.variant="default"] - Variante de diseño.
 * @returns {JSX.Element} Tarjeta renderizada con decoradores empresariales.
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
 * 🎓 CONCEPTO JUNIOR: Factory Pattern (Patrón Factoría) en React
 * Este componente no pinta estilos propios. Es una "fábrica". 
 * Recibe un objeto genérico (`userProfile`), mira su propiedad `.type`, y decide inteligentemente
 * qué componente React debe crear e instanciar (<OrganizationCard> o <UserCard> normal).
 * Esto evita llenar nuestra página principal de `if` y `else` interminables.
 *
 * Componente factoría que recibe un modelo normalizado y decide qué tipo de tarjeta retornar.
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
  useComponentProfiler(
    "ResultFactory",
    `🏭 [PASO 5: ResultFactory] Decidiendo tipo de tarjeta para el perfil: "${userProfile.username}" (${userProfile.type})`
  );
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
