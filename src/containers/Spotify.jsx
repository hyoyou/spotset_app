import React, { Component } from 'react';
import SpotifyFunctions from '../helpers/SpotifyFunctions';
import HttpClient from '../utilities/HttpClient';
import Login from './Login';
import Logout from './Logout';
import Setlist from './Setlist';
import Setlists from './Setlists';

export default class Spotify extends Component {
  constructor(props) {
    super(props);

    this.httpClient = new HttpClient();
    this.spotifyFunctions = new SpotifyFunctions(this.httpClient);

    this.state = {
      setlistId: null,
      isAuthenticated: false,
      accessToken: null,
      playlistUrl: null,
    }
  }
  
  componentDidMount() {
    const accessToken = this.spotifyFunctions.checkUrlForSpotifyAccessToken();
    accessToken && this.isValid() ? 
    this.setState({ isAuthenticated: true, accessToken }) 
    : 
    this.setState({ isAuthenticated: false, accessToken: null });
  }

  setSetlist = (setlistId) => {
    this.setState({ setlistId });
  }
  
  isValid = () => {
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
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

  playlistHandler = async (playlist, title) => {
    if (!this.isValid()) {
      this.logout();
    }

    let playlistUrl;

    try {
      await this.spotifyFunctions.createAndSavePlaylist(playlist, title)
        .then((response) => {
          console.log(response)
          playlistUrl = `https://open.spotify.com/playlist/${response}`;
          this.setState({ playlistUrl });
        })
    } catch (error) {
      this.setState({ error });
    }
  }

  render() {
    const { isAuthenticated, setlistId } = this.state;

    return (
      <>
        { !setlistId &&
          <Setlists onClick={this.setSetlist} />
        }

        { setlistId &&
          <Setlist httpClient={this.httpClient} setlistId={setlistId} isUser={isAuthenticated} createPlaylist={this.playlistHandler} playlistUrl={this.state.playlistUrl} />
        }

        <div id="Spotify">
          {!isAuthenticated ? <Login spotifyFunctions={this.spotifyFunctions} /> : <Logout logOutHandler={this.logout} /> }
        </div>
      </>
    );
  }
}
