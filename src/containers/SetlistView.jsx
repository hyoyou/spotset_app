/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import TitleForm from './TitleForm';
import Track from './Track';

export default class SetlistView extends Component {
  render() {
    const {
      playlistTracks, saveTitleHandler, setlist, title, handleAddTrack, handleRemoveTrack,
    } = this.props;

    return (
      <div id="SetlistView">
        <TitleForm title={title} saveTitleHandler={saveTitleHandler} />

        { setlist.tracks
          && <div className="App-list">
            {setlist.tracks.map((track, id) => <Track
              key={id}
              playlistTracks={playlistTracks}
              title={track.name}
              uri={track.trackUri}
              id={id}
              addTrack={handleAddTrack}
              removeTrack={handleRemoveTrack}
            />)}
          </div>}
      </div>
    );
  }
}
