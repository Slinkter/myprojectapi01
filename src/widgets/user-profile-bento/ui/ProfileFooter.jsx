/**
 * @file ProfileFooter.jsx
 * @description Sub-componente que renderiza la fila final del widget Bento (Ubicación, Website, y Botón de Github).
 */

import { motion } from "motion/react";
import PropTypes from "prop-types";
import { MapPin, Link as LinkIcon, Globe } from "lucide-react";

/**
 * 🎓 CONCEPTO JUNIOR: Enlaces Seguros (Rel Noopener Noreferrer)
 * Si te fijas en los botones de "Ver en Github" o "Website", usamos `target="_blank"` para abrir otra pestaña.
 * ¡NUNCA uses `target="_blank"` sin `rel="noopener noreferrer"`! 
 * Si no lo pones, la nueva pestaña que abras tiene control oculto sobre tu aplicación mediante la variable global `window.opener`.
 * Es una vulnerabilidad clásica de seguridad web (Tabnabbing). `noopener` rompe ese cordón umbilical.
 *
 * Componente ProfileFooter.
 * Muestra información "meta" en pastillas visuales (pills).
 *
 * @component
 * @param {Object} props - Propiedades inyectadas.
 * @param {Object} props.user - Detalles de usuario normalizados.
 * @param {string} [props.user.location] - Ciudad o país (opcional).
 * @param {string} [props.user.website] - URL del blog/sitio (opcional).
 * @param {string} props.user.profileUrl - URL principal del perfil en GitHub.
 * @param {Object} props.variants - Variantes de animación.
 * @returns {JSX.Element} Pie de página de la tarjeta de perfil.
 */
const ProfileFooter = ({ user, variants }) => {
  return (
    <motion.footer
      variants={variants}
      className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 pt-6 text-xs font-semibold border-t border-border"
    >
      {/* 
        🎓 CONCEPTO JUNIOR: Renderizado con Operador Lógico Cortocircuito (&&)
        Si `user.location` está vacío, o es falso o null, la ejecución se "corta" ahí mismo 
        y React simplemente ignora el <div>. Es la forma más limpia de hacer Ifs en JSX.
      */}
      {user.location && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-surface text-text-mute shadow-sm select-none">
          <MapPin size={14} className="text-accent" />
          <span>{user.location}</span>
        </div>
      )}

      {user.website && (
        <a
          href={user.website.startsWith("http") ? user.website : `https://${user.website}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-surface text-text-mute hover:text-accent hover:border-accent/30 hover:shadow-sm transition-all duration-200"
        >
          <LinkIcon size={14} className="text-accent" />
          <span>Website Oficial</span>
        </a>
      )}

      <a
        href={user.profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-white hover:bg-sky-600 shadow-sm transition-all duration-200 font-bold cursor-pointer"
      >
        <Globe size={14} />
        <span>Ver en GitHub</span>
      </a>
    </motion.footer>
  );
};

ProfileFooter.propTypes = {
  user: PropTypes.shape({
    location: PropTypes.string,
    website: PropTypes.string,
    profileUrl: PropTypes.string.isRequired,
  }).isRequired,
  variants: PropTypes.object,
};

ProfileFooter.displayName = "ProfileFooter";

export default ProfileFooter;
