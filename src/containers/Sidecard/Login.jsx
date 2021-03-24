import React from 'react';
import PropTypes from 'prop-types';

export const Login = ({ spotifyFunctions }) => {
  return (
    <div className="Login">
      <a href={spotifyFunctions.getRedirectUrl()}>
        <button id="btn-spotify" type="button">Log in to Spotify</button>
      </a>
    </div>
  );
}

Login.propTypes = {
  spotifyFunctions: PropTypes.object.isRequired
}

export default Login;