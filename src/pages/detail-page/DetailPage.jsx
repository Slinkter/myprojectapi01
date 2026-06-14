import { UserDetail } from "@/widgets/user-profile-bento";

/**
 * @file DetailPage.jsx
 * @description Page layout shell mounting the user details Bento Grid widget dashboard view.
 */

/**
 * DetailPage component.
 *
 * @component
 * @returns {JSX.Element} Bento details dashboard page layout.
 */
const DetailPage = () => {
  return <UserDetail />;
};

DetailPage.displayName = "DetailPage";

export default DetailPage;
