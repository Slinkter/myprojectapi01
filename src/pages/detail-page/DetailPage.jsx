/**
 * @file DetailPage.jsx
 * @description Componente Página que representa la pantalla de detalle de un usuario.
 * Monta el widget del dashboard (Bento Grid).
 */

import { UserDetail } from "@/widgets/user-profile-bento";
import { log, useComponentProfiler } from "@/shared";

/**
 * 🎓 CONCEPTO JUNIOR: Page Components en FSD
 * En Feature-Sliced Design, las páginas son "pegamento". No deberían tener lógica pesada 
 * (como llamadas a API o manipulaciones de estado complicadas). Solo se encargan de juntar 
 * los "Widgets" (bloques de UI independientes) para formar una vista completa y conectarlos con React Router.
 *
 * Componente principal de la vista de Detalles del Usuario.
 *
 * @component
 * @returns {JSX.Element} Vista completa de los detalles del perfil.
 */
const DetailPage = () => {
  useComponentProfiler(
    "DetailPage",
    "🖥️ [PASO 3B: DetailPage] Montando la página de detalle de usuario"
  );
  return <UserDetail />;
};

DetailPage.displayName = "DetailPage";

export default DetailPage;
