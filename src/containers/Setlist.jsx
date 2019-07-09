import React, { Component } from 'react';
import SetlistView from './SetlistView';

export default class Setlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setlist: '',
      error: '',
      title: '',
      playlistId: '',
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
          
          this.setState({ 
            setlist: response.data,
            title          
          });
        });
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  formatTitle = (setlist) => {
    return setlist.artist + ' at ' + setlist.venue + ' on ' + setlist.eventDate;
  }

  saveTitle = (title) => {
    this.setState({ title });
  }

  addToPlaylist = (playlistTracks) => {
    this.setState({ playlistTracks });
  }

  render() {
    const { setlist, title } = this.state;

    return (
      <div className="Setlist">
        <SetlistView setlist={setlist} title={title} saveTitleHandler={this.saveTitle} />
      </div>
    );
  }
}
