import { Typography } from "@material-tailwind/react";

const NotFound = ({ searchTerm }) => (
    <div className="text-center mt-10 animate-fade-in">
        <Typography variant="h3" className="dark:text-gray-300">
            No se encontraron usuarios con "{searchTerm}".
        </Typography>
    </div>
);

export default NotFound;
