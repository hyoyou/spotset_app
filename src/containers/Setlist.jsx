import React, { Component } from 'react';
import Playlist from './Playlist';
import SetlistView from './SetlistView';

export default class Setlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setlist: '',
      error: '',
      title: '',
      playlistTracks: []
    };
  }

  componentDidMount() {
    const { setlistId } = this.props;
    if (setlistId) {
      this.fetchSetlist(setlistId);
    }
  }

  fetchSetlist = async (setlistId) => {
    const { httpClient } = this.props;
    const url = `${process.env.REACT_APP_SPOTSET_DEV_SERVER}/setlists/${setlistId}`;
    const request = { url: url };

    try {
      await httpClient.get(request)
        .then((response) => {
          let title = this.formatTitle(response.data);
          let playlistTracks = this.getDefaultPlaylistTracks(response.data.tracks);
          
          this.setState({ 
            setlist: response.data,
            title,
            playlistTracks
          });
        });
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  formatTitle = (setlist) => {
    return setlist.artist + ' at ' + setlist.venue + ' on ' + setlist.eventDate;
  }

  getDefaultPlaylistTracks = (availableTracks) => {
    let availableUris = [];

    availableTracks.map((track) => {
      if (track.trackUri !== null) {
        availableUris.push(track.trackUri)
      }
      return availableUris;
    })

    return availableUris;
  }

  saveTitle = (title) => {
    this.setState({ title });
  }

  handleAddTrack = (uri) => {
    this.setState({ playlistTracks: [...this.state.playlistTracks, uri] });
  }

  handleRemoveTrack = (uri) => {
    let updatedTracks = this.state.playlistTracks.filter((track) => {
      return track !== uri;
    })

    this.setState({ playlistTracks: updatedTracks });
  }

  addToPlaylist = () => {
    const { playlistTracks, title } = this.state;
    this.props.createPlaylist(playlistTracks, title);
  }

  render() {
    const { error, playlistTracks, setlist, title } = this.state;
    const { isUser, playlistUrl } = this.props;

    return (
      <>
        <SetlistView setlist={setlist} playlistTracks={playlistTracks} title={title} saveTitleHandler={this.saveTitle} handleAddTrack={this.handleAddTrack} handleRemoveTrack={this.handleRemoveTrack} />
        <Playlist isUser={isUser} createPlaylist={this.addToPlaylist} playlistUrl={playlistUrl} />
      
        { error &&
          <div id="error">
            <p>{error}</p>
          </div>
        }
      </>
    );
  }
}
