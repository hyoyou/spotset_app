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
  
  checkForSpotifyAccessToken = () => {
    const savedToken = localStorage.getItem('access_token');
    if (savedToken) {
      return savedToken;
    };

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

  formatBody = (key, value) => {
    return JSON.stringify({ key : value });
  }

  formatHeader = () => {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    };
  }
  
  formatRequest = (url, headers, data = null) => {
    return data ? { url: url, data: data, headers: headers } : { url: url, headers: headers };
  }
  
  getUsername = async () => {
    const url = 'https://api.spotify.com/v1/me';
    const headers = this.formatHeader();
    const request = this.formatRequest(url, headers);

    let username;

    try {
      await this.httpClient.get(request)
        .then((response) => {
          username = response.data.id;
        });
    } catch (error) {
      throw new Error('Could not get the username.')
    }
  
    return username;
  }
  
  createPlaylist = async (userId, title) => {
    const url = `https://api.spotify.com/v1/users/${userId}/playlists`;
    const data = JSON.stringify({ 'name': title });
    const headers = this.formatHeader();
    const request = this.formatRequest(url, headers, data);

    let id;
  
    await this.httpClient.post(request)
      .then((response) => {
        id = response.data.id;
      })
      .catch((error) => {
        throw new Error('Could not create a new playlist.')
      });
  
    return id;
  }
  
  addTracksToPlaylist = async (playlistId, playlist) => {
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
    const data = JSON.stringify({ 'uris': playlist });
    const headers = this.formatHeader();
    const request = this.formatRequest(url, headers, data);

    let snapshotId;

    await this.httpClient.post(request)
    .then((response) => {
      snapshotId = response.data.url;
    })
    .catch((error) => {
      throw new Error('Could not add tracks to playlist.')
    });

    return snapshotId;
  }
  
  createAndSavePlaylist = async (playlist, title) => {
    let username;
    let playlistId;

    try {
      username = await this.getUsername()
    } catch (error) {
      throw new Error('Could not get the username.')
    }

    try {
      playlistId = await this.createPlaylist(username, title);
    } catch (error) {
      throw new Error('Could not create a new playlist.')
    }

    try {
      await this.addTracksToPlaylist(playlistId, playlist)
    } catch (error) {
      throw new Error('Could not add tracks to playlist.')
    }

    return playlistId;
  }
}

export default SpotifyFunctions;
