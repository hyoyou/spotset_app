import React from "react";
import PropTypes from "prop-types";

export const Error = ({ message }) => {
  return (
    <div className="Error">
      <p>{message}</p>
    </div>
  );
};

Error.propTypes = {
  message: PropTypes.string,
};

Error.defaultProps = {
  message: "",
};

export default Error;
