import React from "react";
import PropTypes from "prop-types";
import ButtonElementType from "./ButtonElementType";

export const Button = ({
  id,
  href,
  onClick,
  buttonType,
  isExternalLink,
  children
}) => {
  const target = isExternalLink ? "_blank" : null;
  const rel = isExternalLink ? "noopener noreferrer" : null;

  return buttonType === ButtonElementType.ANCHOR ? (
    <a id={id} href={href} target={target} rel={rel}>
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
  isExternalLink: PropTypes.bool,
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
  isExternalLink: false,
  children: ""
};

export default Button;
