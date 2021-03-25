import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/Button/Button';
import ButtonElementType from '../../components/Button/ButtonElementType';

export const Login = ({ spotifyFunctions }) => {
  return (
    <Button
      buttonType={ButtonElementType.ANCHOR}
      href={spotifyFunctions.getRedirectUrl()}
      id="btn-spotify"
    >
      Log in to Spotify
    </Button>
  );
}

Login.propTypes = {
  spotifyFunctions: PropTypes.object.isRequired
}

export default Login;