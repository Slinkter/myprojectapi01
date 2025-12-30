/**
 * @file Main application component (App).
 * @author Luis cueva
 * @description
 * This component acts as the main layout shell for the application.
 * It handles the overall theme and renders the primary features.
 */
import { MoonIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { IconButton } from "@material-tailwind/react";
import PropTypes from "prop-types";

// Custom hooks for state management and logic.
import { useTheme } from "./hooks/useTheme.js";

// Feature Components
import UserSearch from "./features/users/UserSearch.jsx";

/**
 * A button component to toggle between light and dark themes.
 * @param {{ toggleTheme: () => void, theme: string }} props - Component properties.
 */
const ThemeToggleButton = ({ toggleTheme, theme }) => {
    return (
        <IconButton
            variant="text"
            className="page-header__theme-toggle"
            aria-label="Toggle theme"
            onClick={toggleTheme}
        >
            {theme === "dark" ? (
                <SparklesIcon className="page-header__icon" />
            ) : (
                <MoonIcon className="page-header__icon" />
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
