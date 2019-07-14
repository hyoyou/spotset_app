class SpotifyFunctions {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  getRedirectUrl = () => {
    const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const REDIRECT_URI = process.env.REACT_APP_SPOTIFY_DEV_REDIRECT_URI;
    const scopes = [
      'playlist-modify-public',
      'playlist-modify-private',
    ];
  
    return `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID
    }&redirect_uri=${encodeURIComponent(REDIRECT_URI)
    }&response_type=token`
    + `&scope=${encodeURIComponent(scopes.join(' '))}`;
  }
  
  getHashParams = () => {
    const hash = window.location.hash
      .substring(1)
      .split('&')
      .reduce((initial, item) => {
        if (item) {
          const parts = item.split('=');
          initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
      }, {});
  
    window.location.hash = '';
    return hash;
  }
  
  checkUrlForSpotifyAccessToken = () => {
    const hash = this.getHashParams();
  
    const accessToken = hash.access_token;
    if (!accessToken) {
      return false;
    }
  
    const expiresAt = (hash.expires_in * 1000) + new Date().getTime();
  
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('expires_at', expiresAt);
    return accessToken;
  }
  
  getUserId = async () => {
    const url = 'https://api.spotify.com/v1/me';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    };
    const request = { url: url, headers: headers };

    let id;

    try {
      await this.httpClient.get(request)
        .then((response) => {
          id = response.data.id;
        });
    } catch (error) {
      return error;
    }
  
    return id;
  }
  
  createPlaylist = async (userId, title) => {
    const url = `https://api.spotify.com/v1/users/${userId}/playlists`;
    const data = JSON.stringify({
      'name': `${title}` 
    });
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    };
    const request = { url: url, data: data, headers: headers };

    let id;
  
    try {
      await this.httpClient.post(request)
        .then((response) => {
          id = response.data.id;
        });
    } catch (error) {
      return error;
    }
  
    return id;
  }
  
  addTracksToPlaylist = async (playlistId, playlist) => {
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
    const data = JSON.stringify({
      uris: playlist,
    });
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    };
    const request = { url: url, data: data, headers: headers };

    let playlistUrl;
  
    try {
      await this.httpClient.post(request)
        .then((response) => {
          playlistUrl = response.data.url
        });
    } catch (error) {
      return error;
    }

    return playlistUrl;
  }
  
  createAndSavePlaylist = async (playlist, title) => {
    const userId = await this.getUserId();
    const playlistId = await this.createPlaylist(userId, title);
    await this.addTracksToPlaylist(playlistId, playlist);
    return playlistId;
  }
}

export default SpotifyFunctions;
