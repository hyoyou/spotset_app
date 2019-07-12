import axios from 'axios';

export function getRedirectUrl() {
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

function getHashParams() {
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

  return hash;
}

export function checkUrlForSpotifyAccessToken() {
  const hash = getHashParams();

  const accessToken = hash.access_token;
  if (!accessToken) {
    return false;
  }

  const expiresAt = (hash.expires_in * 1000) + new Date().getTime();

  localStorage.setItem('access_token', accessToken);
  localStorage.setItem('expires_at', expiresAt);
  return accessToken;
}

export async function getUserId() {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  };

  let id = '';

  try {
    await axios.get('https://api.spotify.com/v1/me', { headers })
      .then((response) => {
        id = response.data.id;
      });
  } catch (error) {
    return error;
  }

  return id;
}

export async function createPlaylist(userId, title) {
  const data = JSON.stringify({
    'name': `${title}` 
  });

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  };

  let id = '';

  try {
    await axios.post(`https://api.spotify.com/v1/users/${userId}/playlists`, `${data}`, { headers })
      .then((response) => {
        id = response.data.id;
      });
  } catch (error) {
    return error;
  }

  return id;
}

export async function addTracksToPlaylist(playlistId, playlist) {
  const data = JSON.stringify({
    uris: playlist,
  });

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  };

  let url = '';

  try {
    await axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, `${data}`, { headers })
      .then((response) => {
        url = response.data.url
      });
  } catch (error) {
    return error;
  }

  return url;
}

export async function createAndSavePlaylist(playlist, title) {
  const userId = await getUserId();
  const playlistId = await createPlaylist(userId, title);
  await addTracksToPlaylist(playlistId, playlist);
  return playlistId;
}
