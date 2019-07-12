/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import * as SpotifyHelper from '../helpers/spotifyHelpers';

export default class Login extends Component {
  render() {
    return (
      <div className="Login">
        <a href={SpotifyHelper.getRedirectUrl()}>
          <button id="btn-spotify">Log in to Spotify</button>
        </a>
      </div>
    );
  }
}
