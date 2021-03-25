import * as Constants from "../constants/ApiConstants";

class SpotifyFunctions {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  getRedirectUrl = () => {
    const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const REDIRECT_URI = process.env.REACT_APP_SPOTIFY_DEV_REDIRECT_URI;
    const scopes = Constants.SPOTIFY_SCOPES;

    return (
      Constants.SPOTIFY_AUTH_URL +
      CLIENT_ID +
      Constants.SPOTIFY_AUTH_REDIRECT +
      encodeURIComponent(REDIRECT_URI) +
      Constants.SPOTIFY_AUTH_TYPE +
      encodeURIComponent(scopes.join(" "))
    );
  };

  getHashParams = () => {
    const hash = window.location.hash
      .substring(1)
      .split("&")
      .reduce((initial, item) => {
        if (item) {
          const parts = item.split("=");
          initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
      }, {});

    window.location.hash = "";
    return hash;
  };

  checkForSpotifyAccessToken = () => {
    const savedToken = localStorage.getItem("access_token");
    if (savedToken) {
      return savedToken;
    }

    const hash = this.getHashParams();
    const accessToken = hash.access_token;

    if (!accessToken) {
      return false;
    }

    const expiresAt = hash.expires_in * 1000 + new Date().getTime();

    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("expires_at", expiresAt);
    return accessToken;
  };

  formatBody = (key, value) => {
    return JSON.stringify({ key: value });
  };

  formatHeader = () => {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    };
  };

  formatRequest = (url, headers, data = null) => {
    return data
      ? { url: url, data: data, headers: headers }
      : { url: url, headers: headers };
  };

  getUsername = async () => {
    const url = Constants.SPOTIFY_USER_URL;
    const headers = this.formatHeader();
    const request = this.formatRequest(url, headers);

    let username;

    try {
      await this.httpClient.get(request).then((response) => {
        username = response.data.id;
      });
    } catch (error) {
      throw new Error(Constants.SPOTIFY_USER_ERROR);
    }

    return username;
  };

  createPlaylist = async (userId, title) => {
    const url =
      Constants.SPOTIFY_NEW_PLAYLIST_URL + userId + Constants.SPOTIFY_PLAYLIST;
    const data = JSON.stringify({ name: title });
    const headers = this.formatHeader();
    const request = this.formatRequest(url, headers, data);

    let id;

    await this.httpClient
      .post(request)
      .then((response) => {
        id = response.data.id;
      })
      .catch((error) => {
        throw new Error(Constants.SPOTIFY_PLAYLIST_ERROR);
      });

    return id;
  };

  addTracksToPlaylist = async (playlistId, playlist) => {
    const url =
      Constants.SPOTIFY_NEW_TRACKS_URL + playlistId + Constants.SPOTIFY_TRACKS;
    const data = JSON.stringify({ uris: playlist });
    const headers = this.formatHeader();
    const request = this.formatRequest(url, headers, data);

    let snapshotId;

    await this.httpClient
      .post(request)
      .then((response) => {
        snapshotId = response.data.url;
      })
      .catch((error) => {
        throw new Error(Constants.SPOTIFY_TRACKS_ERROR);
      });

    return snapshotId;
  };

  createAndSavePlaylist = async (playlist, title) => {
    const username = await this.getUsername();
    const playlistId = await this.createPlaylist(username, title);
    await this.addTracksToPlaylist(playlistId, playlist);

    return playlistId;
  };
}

export default SpotifyFunctions;
