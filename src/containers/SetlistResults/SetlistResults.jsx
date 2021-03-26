import React from "react";
import TitleField from "./TitleField";
import Track from "./Track";
import PropTypes from "prop-types";

export const SetlistResults = ({
  playlistTracks,
  saveTitleHandler,
  setlist,
  title,
  handleAddTrack,
  handleRemoveTrack
}) => {
  return (
    <div id="SetlistResults">
      <TitleField title={title} saveTitleHandler={saveTitleHandler} />

      {setlist.tracks && (
        <div className="App-list">
          {setlist.tracks.map((track, id) => (
            <Track
              key={id}
              playlistTracks={playlistTracks}
              title={track.name}
              uri={track.trackUri}
              id={id}
              addTrack={handleAddTrack}
              removeTrack={handleRemoveTrack}
            />
          ))}
        </div>
      )}
    </div>
  );
};

SetlistResults.propTypes = {
  playlistTracks: PropTypes.array,
  saveTitleHandler: PropTypes.func,
  setlist: PropTypes.object,
  title: PropTypes.string,
  handleAddTrack: PropTypes.func,
  handleRemoveTrack: PropTypes.func
};

SetlistResults.defaultProps = {
  playlistTracks: [],
  saveTitleHandler: () => {},
  setlist: {},
  title: "",
  handleAddTrack: () => {},
  handleRemoveTrack: () => {}
};

export default SetlistResults;
