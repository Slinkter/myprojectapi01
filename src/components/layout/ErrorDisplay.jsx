import { Typography, Button } from "@material-tailwind/react";

const ErrorDisplay = ({ message, onRetry }) => (
    <div className="center-container">
        <Typography variant="h3" color="red" className="text-center">
            {message}
        </Typography>
        <Button color="blue" onClick={onRetry} className="mt-4">
            Reintentar
        </Button>
    </div>
);

export default ErrorDisplay;
