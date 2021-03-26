import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import * as Constants from "../../constants/ApiConstants";
import Error from "../../components/Banner/Error";
import { Playlist } from "../Sidecard";
import SetlistResults from "./SetlistResults";
import ConditionalContainer from "../../components/ConditionalContainer";
import Icon from "../../components/Icon/Icon";
import { formatTitle } from "../../formatters/title";

export const SetlistContainer = ({
  setlistId,
  clearSetlist,
  isUser,
  playlistUrl,
  createPlaylist,
  httpClient
}) => {
  const [title, setTitle] = useState("");
  const [setlist, setSetlist] = useState({});
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    if (setlistId) {
      fetchSetlist();
    }
  }, [setlistId]);

  const fetchSetlist = async () => {
    const url = `${process.env.REACT_APP_SPOTSET_DEV_SERVER}/setlists/${setlistId}`;
    const request = { url: url };

    await httpClient
      .get(request)
      .then((response) => {
        const formattedTitle = formatTitle(response.data);
        const tracks = getDefaultPlaylistTracks(response.data.tracks);

        setSetlist(response.data);
        setTitle(formattedTitle);
        setPlaylistTracks(tracks);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          setFetchError(error.response.data.message);
        } else {
          setFetchError(Constants.SERVER_ERROR);
        }
      });
  };

  const getDefaultPlaylistTracks = (availableTracks) => {
    const availableUris = [];

    availableTracks.map((track) => {
      if (track.trackUri !== null) {
        availableUris.push(track.trackUri);
      }
      return availableUris;
    });

    return availableUris;
  };

  const saveTitle = (titleToSave) => {
    setTitle(titleToSave);
  };

  const handleAddTrack = (uri) => {
    setPlaylistTracks([...playlistTracks, uri]);
  };

  const handleRemoveTrack = (uri) => {
    const updatedTracks = playlistTracks.filter((track) => {
      return track !== uri;
    });

    setPlaylistTracks(updatedTracks);
  };

  const addToPlaylist = () => {
    createPlaylist(playlistTracks, title);
  };

  return (
    <>
      <ConditionalContainer condition={isLoading}>
        <Icon id="icon-spinner" icon={faSpinner} size="3x" shouldPulse={true} />
      </ConditionalContainer>

      <SetlistResults
        setlist={setlist}
        playlistTracks={playlistTracks}
        title={title}
        saveTitleHandler={saveTitle}
        handleAddTrack={handleAddTrack}
        handleRemoveTrack={handleRemoveTrack}
      />

      <Playlist
        isUser={isUser}
        clearSetlist={clearSetlist}
        createPlaylist={addToPlaylist}
        playlistUrl={playlistUrl}
      />

      <ConditionalContainer condition={fetchError}>
        <Error message={fetchError} />
      </ConditionalContainer>
    </>
  );
};

SetlistContainer.propTypes = {
  setlistId: PropTypes.string,
  clearSetlist: PropTypes.func,
  isUser: PropTypes.bool,
  playlistUrl: PropTypes.string,
  createPlaylist: PropTypes.func,
  httpClient: PropTypes.oneOfType([
    PropTypes.shape({
      get: PropTypes.func
    }),
    PropTypes.func
  ])
};

SetlistContainer.defaultProps = {
  setlistId: "",
  clearSetlist: () => {},
  isUser: false,
  playlistUrl: "",
  createPlaylist: () => {},
  httpClient: {
    get: () => {}
  }
};

export default SetlistContainer;
