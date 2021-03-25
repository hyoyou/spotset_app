import React, { useState } from "react";
import PropTypes from "prop-types";
import SetlistSearchField from "./SetlistSearchField";
import SearchInstructions from "./SearchInstructions";

export const SetlistSearch = ({ onClick }) => {
  const [setlistId, setSetlistId] = useState("");

  const handleChange = (event) => {
    setSetlistId(event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();
    onClick(setlistId);
  };

  return (
    <div className="App-field">
      <SetlistSearchField
        onSubmit={handleClick}
        onChange={handleChange}
        setlistId={setlistId}
      />
      <SearchInstructions />
    </div>
  );
};

SetlistSearch.propTypes = {
  onClick: PropTypes.func
};

SetlistSearch.defaultProps = {
  onClick: () => {}
};

export default SetlistSearch;
