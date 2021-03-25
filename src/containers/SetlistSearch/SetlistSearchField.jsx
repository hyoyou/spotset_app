import React from "react";
import PropTypes from "prop-types";
import Button from "../../components/Button/Button";
import TextInput from "../../components/Form/TextInput";

export const SetlistSearchField = ({ onSubmit, onChange, setlistId }) => {
  return (
    <form onSubmit={onSubmit}>
      <TextInput
        id="setlistId"
        value={setlistId}
        onChange={onChange}
        placeholder="Enter setlist ID"
      />

      <Button id="btn-setlistId" onClick={onSubmit}>
        Display Setlist
      </Button>
    </form>
  );
};

SetlistSearchField.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  setlistId: PropTypes.string
};

SetlistSearchField.defaultProps = {
  onSubmit: () => {},
  onChange: () => {},
  setlistId: ""
};

export default SetlistSearchField;
