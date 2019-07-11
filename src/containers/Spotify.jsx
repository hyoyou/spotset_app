import React, { Component } from 'react';
import * as SpotifyHelper from '../helpers/spotifyHelpers';
import axios from 'axios';
import Login from './Login';
import Logout from './Logout';
import Setlist from './Setlist';

export default class Spotify extends Component {
  state = {
    isAuthenticated: false,
    accessToken: null,
  }

  componentDidMount() {
    const accessToken = SpotifyHelper.checkUrlForSpotifyAccessToken();
    accessToken && this.isValid() ? 
      this.setState({ isAuthenticated: true, accessToken }) 
      : 
      this.setState({ isAuthenticated: false, accessToken: null });
  }

  isValid = () => {
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    console.log("time left", expiresAt)
    return new Date().getTime() < expiresAt;
  }

  logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');

    this.setState({ 
      isAuthenticated: false, 
      accessToken: null
    })
  };

  render() {
    const { isAuthenticated } = this.state;
    const testSetlistId = '3393481d';

    return (
      <>
        <div id="Setlist">
          <Setlist httpClient={axios} setlistId={testSetlistId} isUser={isAuthenticated} />
        </div>

        <div id="Spotify">
          {!this.state.isAuthenticated ? <Login /> : <Logout logOutHandler={this.logout} /> }
        </div>
      </>
    );
  }
}
