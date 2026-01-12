import { Typography, Button } from "@material-tailwind/react";
import PropTypes from "prop-types";

const ErrorDisplay = ({ message, onRetry }) => (
  <div className="min-h-dvh flex flex-col justify-center items-center text-center p-8 gap-4">
    <Typography variant="h3" className="text-center text-3xl text-red-500">
      {message}
    </Typography>
    <Button color="blue" onClick={onRetry} className="mt-4">
      Reintentar
    </Button>
  </div>
);

ErrorDisplay.propTypes = {
  message: PropTypes.string.isRequired,
  onRetry: PropTypes.func.isRequired,
};

export default ErrorDisplay;
