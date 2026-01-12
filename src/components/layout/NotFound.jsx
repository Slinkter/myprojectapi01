import { Typography } from "@material-tailwind/react";
import PropTypes from "prop-types";

const NotFound = ({ searchTerm }) => (
  <div className="animate-not-foundName flex items-center justify-center text-center p-8 mt-10">
    <Typography
      variant="h3"
      className="text-3xl text-slate-900 dark:text-dark-text"
    >
      No se encontraron usuarios con &quot;{searchTerm}&quot;.
    </Typography>
  </div>
);

NotFound.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};

export default NotFound;
