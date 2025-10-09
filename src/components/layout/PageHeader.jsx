import PropTypes from "prop-types";
import {
    Typography,
    Input,
    IconButton,
    Spinner,
} from "@material-tailwind/react";
import { MoonIcon, SunIcon } from "../../assets/Icons.jsx";

const PageHeader = ({
    theme,
    toggleTheme,
    searchTerm,
    handleSearch,
    isSearching,
}) => (
    <header className="main-header">
        <div className="flex justify-end mb-4">
            <IconButton
                variant="text"
                className="theme-toggle-button"
                onClick={toggleTheme}
                aria-label="Toggle theme"
            >
                {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </IconButton>
        </div>
        <Typography
            variant="h1"
            className="main-header-h1 text-brand-dark dark:text-brand-light"
        >
            API Github Users
        </Typography>

        <article className="text-center prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert mx-auto mt-8">
            <p>
                Este proyecto demuestra las capacidades de React 18 con
                renderizado concurrente y Tailwind CSS.
            </p>
        </article>
        <div className="search-container">
            <Input
                type="text"
                className="dark:text-white"
                label="Buscar usuario..."
                color={theme === "dark" ? "white" : "black"}
                value={searchTerm}
                onChange={handleSearch}
                icon={isSearching && <Spinner className="h-5 w-5" />}
            />
        </div>
    </header>
);

PageHeader.propTypes = {
    theme: PropTypes.string.isRequired,
    toggleTheme: PropTypes.func.isRequired,
    searchTerm: PropTypes.string.isRequired,
    handleSearch: PropTypes.func.isRequired,
    isSearching: PropTypes.bool.isRequired,
};

export default PageHeader;
