/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

export default class Playlist extends Component {
  render() {
    const { createPlaylist, isUser } = this.props;

    return (
      <div id="Playlist">
        { isUser && (
          <button id="btn-spotify" onClick={createPlaylist} type="button">Save as Playlist</button>
        )}
        { !isUser && (
          <h2>Log in to save playlist</h2>
        )}
      </div>
    );
  }
}
