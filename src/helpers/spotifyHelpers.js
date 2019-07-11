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

  const expiresAt = JSON.stringify((hash.expires_in * 1000) + new Date().getTime());

  localStorage.setItem('access_token', accessToken);
  localStorage.setItem('expires_at', expiresAt);
  return accessToken;
}

export function createAndSavePlaylist() {
  const hash = getHashParams();
  const accessToken = hash;
  if (!accessToken) {
    return false;
  }

  return accessToken;
}
