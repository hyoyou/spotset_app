import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

export const Playlist = ({
  clearSetlist,
  createPlaylist,
  isUser,
  playlistUrl,
}) => {
  return (
    <div id="Playlist">
      {isUser && !playlistUrl && (
        <button id="btn-spotify" onClick={createPlaylist} type="button">
          Save as Playlist
        </button>
      )}
      {!isUser && <h2>Log in to save playlist</h2>}

      {playlistUrl && (
        <>
          <h3>
            <FontAwesomeIcon id="icon-thumbsUp" icon={faThumbsUp} />
            Your playlist has been created
          </h3>
          <a href={playlistUrl} target="_blank" rel="noopener noreferrer">
            <button id="btn-playlist" type="button">
              Go to Playlist
            </button>
          </a>
        </>
      )}

      <h4>Features Coming Soon:</h4>
      <p>Toggle Private/Public Playlist</p>
      <p>Tweet a Link to Your Playlist</p>

      <button id="btn-setlists" onClick={clearSetlist} type="button">
        Find a Different Setlist
      </button>
    </div>
  );
};

Playlist.propTypes = {
  clearSetlist: PropTypes.func,
  createPlaylist: PropTypes.func,
  isUser: PropTypes.bool,
  playlistUrl: PropTypes.string,
};

Playlist.defaultProps = {
  clearSetlist: () => {},
  createPlaylist: () => {},
  isUser: false,
  playlistUrl: "",
};

export default Playlist;
