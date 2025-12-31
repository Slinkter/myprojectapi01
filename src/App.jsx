import { IconButton } from "@material-tailwind/react";
import PropTypes from "prop-types";

// Custom hooks for state management and logic.
import { useTheme } from "./hooks/useTheme.js";

// Feature Components
import UserSearch from "./features/users/UserSearch.jsx";

import { FaStar } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";

const ThemeToggleButton = ({ toggleTheme, theme }) => {
    return (
        <IconButton
            variant="text"
            className="page-header__theme-toggle"
            aria-label="Toggle theme"
            onClick={toggleTheme}
        >
            {theme === "dark" ? (
                <FaStar className="h-6 w-6" />
            ) : (
                <MdDarkMode className="h-6 w-6" />
            )}
        </IconButton>
    );
};

ThemeToggleButton.propTypes = {
    toggleTheme: PropTypes.func.isRequired,
    theme: PropTypes.string.isRequired,
};

const App = () => {
    // Hook for managing the theme (light/dark).
    const [theme, toggleTheme] = useTheme();

    return (
        <main className="app">
            <ThemeToggleButton toggleTheme={toggleTheme} theme={theme} />
            <UserSearch />
        </main>
    );
};

export default App;

ThemeToggleButton.displayName = "ThemeToggleButton";
App.displayName = "App";
