import React from "react";
import PropTypes from "prop-types";

export const Header = ({ className, children }) => {
  return <header className={className}>{children}</header>;
};

Header.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any.isRequired
};

Header.defaultProps = {
  className: ""
};

export default Header;
