import React from 'react';
import PropTypes from 'prop-types';
import ButtonElementType from './ButtonElementType'

export const Button = ({ id, href, onSubmit, buttonType, children }) => {

  return buttonType === ButtonElementType.ANCHOR
    ? (
      <a id={id} href={href} onClick={onSubmit}>
        {children}
      </a >
    )
    : (
      <button id={id} onClick={onSubmit}>
        {children}
      </button >
    )
}

Button.propTypes = {
  id: PropTypes.string,
  href: PropTypes.string,
  onSubmit: PropTypes.func,
  buttonType: PropTypes.string,
}

Button.defaultProps = {
  id: null,
  href: null,
  onSubmit: null,
  buttonType: ButtonElementType.BUTTON
}

export default Button;
