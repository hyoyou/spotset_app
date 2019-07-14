/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

export default class Login extends Component {
  render() {
    const { spotifyFunctions } = this.props;

    return (
      <div className="Login">
        <a href={spotifyFunctions.getRedirectUrl()} target="_blank" rel="noopener noreferrer">
          <button id="btn-spotify">Log in to Spotify</button>
        </a>
      </div>
    );
  }
}
