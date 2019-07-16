import React, { Component } from 'react';
import Error from './Error';
import HttpClient from '../utilities/HttpClient';
import Login from './Login';
import Logout from './Logout';
import Setlist from './Setlist';
import Setlists from './Setlists';
import SpotifyFunctions from '../helpers/SpotifyFunctions';

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
      error: null,
    }
  }
  
  componentDidMount() {
    if (!this.isValid()) {
      this.logout();
    }

    this.checkForSetlist();
    const accessToken = this.spotifyFunctions.checkForSpotifyAccessToken();
    
    accessToken ? 
    this.setState({ isAuthenticated: true, accessToken }) 
    : 
    this.setState({ isAuthenticated: false, accessToken: null });
  }

  checkForSetlist = () => {
    const selectedSetlist = localStorage.getItem('setlist_id');

    if (selectedSetlist) {
      this.setState({ setlistId: selectedSetlist });
    }
  }

  setSetlist = (setlistId) => {
    localStorage.setItem('setlist_id', setlistId);
    this.setState({ setlistId });
  }

  clearSetlist = () => {
    localStorage.removeItem('setlist_id');
    this.setState({ setlistId: null });
  }
  
  isValid = () => {
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('setlist_id');

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
    await this.spotifyFunctions.createAndSavePlaylist(playlist, title)
    .then((response) => {
        playlistUrl = `https://open.spotify.com/playlist/${response}`;
        this.setState({ playlistUrl });
      })
      .catch(error => {
        this.setState({ error: error.message })
      });
  }

  render() {
    const { error, isAuthenticated, setlistId } = this.state;

    return (
      <>
        { !setlistId &&
          <Setlists onClick={this.setSetlist} />
        }

        { setlistId &&
          <Setlist 
            httpClient={this.httpClient}
            setlistId={setlistId}
            clearSetlist={this.clearSetlist}
            isUser={isAuthenticated}
            createPlaylist={this.playlistHandler}
            playlistUrl={this.state.playlistUrl}
          />
        }

        <div id="Spotify">
          {!isAuthenticated ? <Login spotifyFunctions={this.spotifyFunctions} /> : <Logout logOutHandler={this.logout} /> }
        </div>

        { error &&
          <Error message={error} />
        }
      </>
    );
  }
}
