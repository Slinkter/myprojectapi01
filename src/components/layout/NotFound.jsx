import { Typography } from "@material-tailwind/react";
import PropTypes from "prop-types";

const NotFound = ({ searchTerm }) => (
    <div className="not-found">
        <Typography variant="h3" className="not-found__text">
            No se encontraron usuarios con &quot;{searchTerm}&quot;.
        </Typography>
    </div>
);

NotFound.propTypes = {
    searchTerm: PropTypes.string.isRequired,
};

export default NotFound;
