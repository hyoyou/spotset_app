import React from "react";
import PropTypes from "prop-types";
import ButtonElementType from "./ButtonElementType";

export const Button = ({ id, href, onClick, buttonType, children }) => {
  return buttonType === ButtonElementType.ANCHOR ? (
    <a href={href}>
      <button id={id} type="button">
        {children}
      </button>
    </a>
  ) : (
    <button id={id} type="button" onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  id: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  buttonType: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string
  ])
};

Button.defaultProps = {
  id: null,
  href: null,
  onClick: null,
  buttonType: ButtonElementType.BUTTON,
  children: ""
};

export default Button;
