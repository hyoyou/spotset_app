import React, { Component } from "react";
import * as Constants from "../constants/ApiConstants";
import Error from "../components/Banner/Error";
import HttpClient from "../utilities/HttpClient";
import { loadState, saveState, removeState, Properties } from "../utilities";
import Login from "./Sidecard/Login";
import Logout from "./Sidecard/Logout";
import SetlistContainer from "./SetlistResults/SetlistContainer";
import SetlistSearch from "./SetlistSearch/SetlistSearch";
import SpotifyFunctions from "../helpers/SpotifyFunctions";
import ConditionalContainer from "../components/ConditionalContainer";

export default class SpotSet extends Component {
  constructor(props) {
    super(props);

    this.httpClient = new HttpClient();
    this.spotifyFunctions = new SpotifyFunctions(this.httpClient);

    this.state = {
      setlistId: null,
      isAuthenticated: false,
      accessToken: null,
      playlistUrl: null,
      error: null
    };
  }

  componentDidMount() {
    this.checkForSetlist();
    this.checkForAccessToken();
  }

  checkForSetlist() {
    const selectedSetlist = loadState(Properties.SETLIST_ID);

    if (selectedSetlist) {
      this.setState({ setlistId: selectedSetlist });
    }
  }

  checkForAccessToken() {
    const accessToken = this.spotifyFunctions.checkForSpotifyAccessToken();
    accessToken
      ? this.setState({ isAuthenticated: true, accessToken })
      : this.setState({ isAuthenticated: false, accessToken: null });
  }

  setSetlist = (setlistId) => {
    saveState(Properties.SETLIST_ID, setlistId);
    this.setState({ setlistId });
  };

  clearSetlist = () => {
    removeState(Properties.SETLIST_ID);
    this.setState({
      setlistId: null,
      playlistUrl: null,
      error: null
    });
  };

  isValid = () => {
    const expiresAt = JSON.parse(loadState(Properties.EXPIRES_AT));
    return new Date().getTime() < expiresAt;
  };

  logout = () => {
    removeState(Properties.ACCESS_TOKEN);
    removeState(Properties.EXPIRES_AT);
    removeState(Properties.SETLIST_ID);

    this.setState({
      isAuthenticated: false,
      accessToken: null
    });
  };

  playlistHandler = async (playlist, title) => {
    if (!this.isValid()) {
      this.logout();
    }

    this.spotifyFunctions
      .createAndSavePlaylist(playlist, title)
      .then((response) => {
        const playlistUrl = Constants.SPOTIFY_PLAYLIST_URL + response;
        this.setState({ playlistUrl });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  };

  render() {
    const { error, isAuthenticated, setlistId } = this.state;

    return (
      <>
        {setlistId ? (
          <SetlistContainer
            httpClient={this.httpClient}
            setlistId={setlistId}
            clearSetlist={this.clearSetlist}
            isUser={isAuthenticated}
            createPlaylist={this.playlistHandler}
            playlistUrl={this.state.playlistUrl}
          />
        ) : (
          <SetlistSearch onClick={this.setSetlist} />
        )}

        <div id="Spotify">
          {!isAuthenticated ? (
            <Login spotifyFunctions={this.spotifyFunctions} />
          ) : (
            <Logout logOutHandler={this.logout} />
          )}
        </div>

        <ConditionalContainer condition={error}>
          <Error message={error} />
        </ConditionalContainer>
      </>
    );
  }
}
