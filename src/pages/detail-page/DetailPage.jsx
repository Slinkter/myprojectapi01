import { UserDetail } from "@/widgets/user-profile-bento";

/**
 * @file DetailPage.jsx
 * @description Page layout shell mounting the user details Bento Grid widget dashboard view.
 */

/**
 * [PASO 3B: Detail Page Mount]
 * Componente que representa la pantalla de detalles de un desarrollador.
 * Monta el widget del dashboard bento.
 *
 * @component
 * @returns {JSX.Element} Bento details dashboard page layout.
 */
const DetailPage = () => {
  console.log("🖥️ [PASO 3B: DetailPage] Montando la página de detalle de usuario...");
  return <UserDetail />;
};

DetailPage.displayName = "DetailPage";

export default DetailPage;
