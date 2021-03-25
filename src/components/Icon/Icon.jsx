import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Icon = ({ id, icon, size, shouldPulse }) => {
  return (
    <FontAwesomeIcon id={id} icon={icon} size={size} pulse={shouldPulse} />
  );
};

Icon.propTypes = {
  id: PropTypes.string,
  icon: PropTypes.object.isRequired,
  size: PropTypes.string,
  shouldPulse: PropTypes.bool
};

Icon.defaultProps = {
  id: null,
  size: null,
  shouldPulse: false
};

export default Icon;
