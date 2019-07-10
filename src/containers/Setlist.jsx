import React, { Component } from 'react';
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
    this.fetchSetlist(setlistId);
  }

  fetchSetlist = async (setlistId) => {
    const { httpClient } = this.props;
    const url = `https://localhost:5001/api/setlists/${setlistId}`;

    try {
      await httpClient.get(url)
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

  addToPlaylist = (playlistTracks) => {
    this.setState({ playlistTracks });
  }

  render() {
    const { playlistTracks, setlist, title } = this.state;

    return (
      <div className="Setlist">
        <SetlistView setlist={setlist} playlistTracks={playlistTracks} title={title} saveTitleHandler={this.saveTitle} handleAddTrack={this.handleAddTrack} handleRemoveTrack={this.handleRemoveTrack} />
      </div>
    );
  }
}
