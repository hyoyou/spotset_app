export const SERVER_ERROR = 'There was an error connecting to the server';
export const SPOTIFY_USER_ERROR = 'Could not get the username.';
export const SPOTIFY_PLAYLIST_ERROR = 'Could not create a new playlist.';
export const SPOTIFY_TRACKS_ERROR = 'Could not add tracks to playlist.';

export const SPOTIFY_PLAYLIST_URL = 'https://open.spotify.com/playlist/';
export const SPOTIFY_NEW_PLAYLIST_URL = 'https://api.spotify.com/v1/users/';
export const SPOTIFY_NEW_TRACKS_URL = 'https://api.spotify.com/v1/playlists/';
export const SPOTIFY_PLAYLIST = '/playlists';
export const SPOTIFY_TRACKS = '/tracks';
export const SPOTIFY_USER_URL = 'https://api.spotify.com/v1/me';
export const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize?client_id=';
export const SPOTIFY_AUTH_REDIRECT = '&redirect_uri=';
export const SPOTIFY_AUTH_TYPE = '&response_type=token&scope=';
export const SPOTIFY_SCOPES = [
  'playlist-modify-public',
  'playlist-modify-private',
];
