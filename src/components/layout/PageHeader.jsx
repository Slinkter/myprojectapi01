import PropTypes from "prop-types";
import { Typography, Input, Spinner } from "@material-tailwind/react";
import { XCircleIcon } from "@heroicons/react/24/solid";

const PageHeader = ({ searchTerm, handleSearch, isSearching }) => (
    <header className="page-header">
        <div className="page-header__top-bar">
            <Typography variant="h1" color="inherit">
                API Github Users
            </Typography>
        </div>

        <div className="search-form">
            <Input
                type="text"
                className="dark:text-white"
                label={isSearching ? "Cargando datos..." : "Buscar usuario..."}
                color="black"
                value={searchTerm}
                onChange={handleSearch}
                icon={
                    isSearching ? (
                        <Spinner className="h-5 w-5" />
                    ) : searchTerm ? (
                        <XCircleIcon
                            className="h-5 w-5 cursor-pointer text-gray-500 hover:text-gray-700"
                            onClick={() =>
                                handleSearch({ target: { value: "" } })
                            }
                        />
                    ) : null
                }
                disabled={isSearching}
            />
        </div>
    </header>
);

PageHeader.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    handleSearch: PropTypes.func.isRequired,
    isSearching: PropTypes.bool.isRequired,
};

export default PageHeader;
