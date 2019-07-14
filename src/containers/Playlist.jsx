/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

export default class Playlist extends Component {
  render() {
    const { clearSetlist, createPlaylist, isUser, playlistUrl } = this.props;

    return (
      <div id="Playlist">
        { isUser && !playlistUrl && (
          <button id="btn-spotify" onClick={createPlaylist} type="button">Save as Playlist</button>
        )}
        { !isUser && (
          <h2>Log in to save playlist</h2>
        )}

        { playlistUrl && (
          <>
            <h3>Your playlist has been created :)</h3>
            <a href={playlistUrl} target="_blank" rel="noopener noreferrer">
              <button id="btn-playlist">Go To Playlist</button>
            </a>
          </>
        )}

        <p>Private / Public Playlist Toggle, Coming Soon!</p>
        <p>Tweet Your Playlist, Coming Soon!</p>

        <button id="btn-setlists" onClick={clearSetlist}>Find a Different Setlist</button>
      </div>
    );
  }
}
