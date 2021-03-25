import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export const Track = ({ uri, addTrack, removeTrack, title }) => {
  const [addedToList, setAddedToList] = useState(false);

  useEffect(() => {
    if (uri) {
      setAddedToList(true);
    }
  }, [uri]);

  const handleAddTrack = (_e, uri) => {
    setAddedToList(true);
    addTrack(uri);
  };

  const handleRemoveTrack = (_e, uri) => {
    setAddedToList(false);
    removeTrack(uri);
  };

  return (
    <div
      id={addedToList ? null : "removed"}
      className={uri ? "available" : "notfound"}
      onClick={
        addedToList
          ? (e) => handleRemoveTrack(e, uri)
          : (e) => handleAddTrack(e, uri)
      }
    >
      {title}
    </div>
  );
};

Track.propTypes = {
  uri: PropTypes.string,
  addTrack: PropTypes.func,
  removeTrack: PropTypes.func,
  title: PropTypes.string,
};

Track.defaultProps = {
  uri: null,
  addTrack: () => {},
  removeTrack: () => {},
  title: "",
};

export default Track;
