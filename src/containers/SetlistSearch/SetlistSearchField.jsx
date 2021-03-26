import React from "react";
import PropTypes from "prop-types";
import { Button } from "../../components/Button";
import TextInput from "../../components/Form/TextInput";

export const SetlistSearchField = ({ onSubmit, onChange, setlistId }) => {
  return (
    <form onSubmit={onSubmit}>
      <TextInput
        id="setlistId"
        value={setlistId}
        onChange={onChange}
        placeholder="Enter Setlist ID"
      />

      <Button id="btn-setlistSearch" onClick={onSubmit}>
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
