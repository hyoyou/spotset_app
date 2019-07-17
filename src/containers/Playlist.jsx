/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

export default class Playlist extends Component {
  render() {
    const {
 clearSetlist, createPlaylist, isUser, playlistUrl 
} = this.props;

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
            <h3>
              <FontAwesomeIcon id="icon-thumbsUp" icon={faThumbsUp} />
              Your playlist has been created
            </h3>
            <a href={playlistUrl} target="_blank" rel="noopener noreferrer">
              <button id="btn-playlist">Go To Playlist</button>
            </a>
          </>
        )}

        <h4>Features Coming Soon:</h4>
        <p>Toggle Private/Public Playlist</p>
        <p>Tweet a Link to Your Playlist</p>

        <button id="btn-setlists" onClick={clearSetlist}>Find a Different Setlist</button>
      </div>
    );
  }
}
