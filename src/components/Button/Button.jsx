import React from 'react';
import PropTypes from 'prop-types';
import ButtonElementType from './ButtonElementType'

export const Button = ({ id, href, onClick, buttonType, children }) => {

  return buttonType === ButtonElementType.ANCHOR
    ? (
      <a href={href}>
        <button id={id}>
          {children}
        </button>
      </a >
    )
    : (
      <button id={id} onClick={onClick}>
        {children}
      </button >
    )
}

Button.propTypes = {
  id: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  buttonType: PropTypes.string,
}

Button.defaultProps = {
  id: null,
  href: null,
  onClick: null,
  buttonType: ButtonElementType.BUTTON
}

export default Button;
