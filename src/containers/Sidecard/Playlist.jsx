import React from "react";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import ConditionalContainer from "../../components/ConditionalContainer";
import { Button, ButtonElementType } from "../../components/Button";
import Icon from "../../components/Icon/Icon";

export const Playlist = ({
  clearSetlist,
  createPlaylist,
  isUser,
  playlistUrl
}) => {
  return (
    <div id="Playlist">
      <ConditionalContainer condition={isUser && !playlistUrl}>
        <Button id="btn-spotify" onClick={createPlaylist}>
          Save as Playlist
        </Button>
      </ConditionalContainer>

      <ConditionalContainer condition={!isUser}>
        <h2>Log in to save playlist</h2>
      </ConditionalContainer>

      <ConditionalContainer condition={playlistUrl}>
        <>
          <Button
            id="btn-playlist"
            href={playlistUrl}
            buttonType={ButtonElementType.ANCHOR}
            isExternalLink={true}
          >
            Go to Playlist
          </Button>

          <h3>
            <Icon id="icon-thumbsUp" icon={faThumbsUp} />
            {" Your playlist has been created"}
          </h3>
        </>
      </ConditionalContainer>

      <Button id="btn-setlists" onClick={clearSetlist}>
        Find a Different Setlist
      </Button>
    </div>
  );
};

Playlist.propTypes = {
  clearSetlist: PropTypes.func,
  createPlaylist: PropTypes.func,
  isUser: PropTypes.bool,
  playlistUrl: PropTypes.string
};

Playlist.defaultProps = {
  clearSetlist: () => {},
  createPlaylist: () => {},
  isUser: false,
  playlistUrl: ""
};

export default Playlist;
