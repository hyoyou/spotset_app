import React from "react";
import PropTypes from "prop-types";

export const TextInput = ({ id, value, placeholder, onChange }) => {
  return (
    <input
      id={id}
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

TextInput.propTypes = {
  id: PropTypes.string,
  value: PropTypes.any,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
};

TextInput.defaultProps = {
  id: "",
  value: "PropTypes.any",
  placeholder: "PropTypes.string",
  onChange: () => {}
};

export default TextInput;
