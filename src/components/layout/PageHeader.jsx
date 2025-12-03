import PropTypes from "prop-types";
import { Typography, Input, Spinner } from "@material-tailwind/react";
import { XCircleIcon } from "@heroicons/react/24/solid";

const PageHeader = ({ searchTerm, handleSearch, isSearching }) => (
  <header className="page-header">
    <div className="page-header__top-bar">
      <Typography variant="h1" color="inherit">
        API - Github Users
      </Typography>
    </div>

    <div className="search-form">
      <Input
        key="search-input"
        className="search-form__input"
        label={isSearching ? "Cargando datos..." : "Buscar usuario..."}
        type="text"
        color="black"
        value={searchTerm}
        onChange={handleSearch}
        icon={
          isSearching ? (
            <Spinner className="search-form__spinner" />
          ) : searchTerm ? (
            <XCircleIcon
              className="search-form__clear-icon"
              onClick={() => handleSearch({ target: { value: "" } })}
            />
          ) : null
        }
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
