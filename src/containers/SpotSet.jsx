import React, { Component } from "react";
import * as Constants from "../constants/ApiConstants";
import Error from "../components/Banner/Error";
import HttpClient from "../utilities/HttpClient";
import Login from "./Sidecard/Login";
import Logout from "./Sidecard/Logout";
import Setlist from "./SetlistResults/Setlist";
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
    const selectedSetlist = localStorage.getItem("setlist_id");

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
    localStorage.setItem("setlist_id", setlistId);
    this.setState({ setlistId });
  };

  clearSetlist = () => {
    localStorage.removeItem("setlist_id");
    this.setState({
      setlistId: null,
      playlistUrl: null,
      error: null
    });
  };

  isValid = () => {
    const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  };

  logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("setlist_id");

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
          <Setlist
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
