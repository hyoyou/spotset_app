import React, { useState, useEffect } from "react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import * as Constants from "../../constants/ApiConstants";
import Error from "../../components/Banner/Error";
import Playlist from "../Sidecard/Playlist";
import SetlistView from "./SetlistView";
import ConditionalContainer from "../../components/ConditionalContainer";
import Icon from "../../components/Icon/Icon";

export const Setlist = ({
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
  const [error, setError] = useState("");

  useEffect(() => {
    if (setlistId) {
      fetchSetlist(setlistId);
    }
  }, [setlistId]);

  const fetchSetlist = async (setlistId) => {
    const url = `${process.env.REACT_APP_SPOTSET_DEV_SERVER}/setlists/${setlistId}`;
    const request = { url: url };

    await httpClient
      .get(request)
      .then((response) => {
        let title = formatTitle(response.data);
        let playlistTracks = getDefaultPlaylistTracks(response.data.tracks);

        setSetlist(response.data);
        setTitle(title);
        setPlaylistTracks(playlistTracks);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.message);
        } else {
          setError(Constants.SERVER_ERROR);
        }
      });
  };

  const formatTitle = (setlist) => {
    return setlist.artist + " at " + setlist.venue + " on " + setlist.eventDate;
  };

  const getDefaultPlaylistTracks = (availableTracks) => {
    let availableUris = [];

    availableTracks.map((track) => {
      if (track.trackUri !== null) {
        availableUris.push(track.trackUri);
      }
      return availableUris;
    });

    return availableUris;
  };

  const saveTitle = (title) => {
    setTitle(title);
  };

  const handleAddTrack = (uri) => {
    setPlaylistTracks([...playlistTracks, uri]);
  };

  const handleRemoveTrack = (uri) => {
    let updatedTracks = playlistTracks.filter((track) => {
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

      <SetlistView
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

      <ConditionalContainer condition={error}>
        <Error message={error} />
      </ConditionalContainer>
    </>
  );
};

export default Setlist;
