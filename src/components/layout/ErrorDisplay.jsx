import { Typography, Button } from "@material-tailwind/react";
import PropTypes from "prop-types";

const ErrorDisplay = ({ message, onRetry }) => (
    <div className="error-display">
        <Typography variant="h3" className="error-display__message">
            {message}
        </Typography>
        <Button color="blue" onClick={onRetry} className="error-display__button">
            Reintentar
        </Button>
    </div>
);

ErrorDisplay.propTypes = {
    message: PropTypes.string.isRequired,
    onRetry: PropTypes.func.isRequired,
};

export default ErrorDisplay;
