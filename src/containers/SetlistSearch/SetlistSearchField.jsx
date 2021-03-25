import React from "react";
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

export default SetlistSearchField;
