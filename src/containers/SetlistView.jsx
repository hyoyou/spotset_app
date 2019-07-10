/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import TitleForm from './TitleForm';
import Track from './Track';
import './SetlistView.css';

export default class SetlistView extends Component {
  render() {
    const {
      playlistTracks, saveTitleHandler, setlist, title, handleAddTrack, handleRemoveTrack,
    } = this.props;

    return (
      <div className="SetlistView">
        <TitleForm title={title} saveTitleHandler={saveTitleHandler} />

        { setlist.tracks
          && <div className="PlaylistTracks">
            { setlist.tracks.map((track, id) => 
              <Track
                playlistTracks={playlistTracks}
                title={track.name}
                uri={track.trackUri}
                id={id}
                addTrack={handleAddTrack}
                removeTrack={handleRemoveTrack}
              />)}
          </div>
        }
      </div>
    );
  }
}
