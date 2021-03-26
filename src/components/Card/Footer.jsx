import React from "react";
import PropTypes from "prop-types";

export const Footer = ({ className, children }) => {
  return (
    <footer className={className}>
      <h4>{children}</h4>
    </footer>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any.isRequired
};

Footer.defaultProps = {
  className: ""
};

export default Footer;
