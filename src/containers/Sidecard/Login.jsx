import React from "react";
import PropTypes from "prop-types";
import Button from "../../components/Button/Button";
import ButtonElementType from "../../components/Button/ButtonElementType";

export const Login = ({ redirectUrl }) => {
  return (
    <Button
      buttonType={ButtonElementType.ANCHOR}
      href={redirectUrl}
      id="btn-spotify"
    >
      Log in to Spotify
    </Button>
  );
};

Login.propTypes = {
  redirectUrl: PropTypes.string
};

Login.defaultProps = {
  redirectUrl: null
};

export default Login;
