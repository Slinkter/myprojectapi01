import { Typography } from "@material-tailwind/react";
import PropTypes from 'prop-types';

const NotFound = ({ searchTerm }) => (
    <div className="text-center mt-10 animate-fade-in">
        <Typography variant="h3" className="dark:text-gray-300">
            No se encontraron usuarios con &quot;{searchTerm}&quot;.
        </Typography>
    </div>
);

NotFound.propTypes = {
    searchTerm: PropTypes.string.isRequired,
};

export default NotFound;
