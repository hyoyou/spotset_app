import React, { Component } from 'react';
import SetlistView from './SetlistView';

export default class Setlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setlist: '',
      error: '',
    };
  }

  componentDidMount() {
    const { setlistId } = this.props;
    this.fetchSetlist(setlistId);
  }

  async fetchSetlist(setlistId) {
    const { httpClient } = this.props;
    const url = `https://localhost:5001/api/setlists/${setlistId}`;

    try {
      await httpClient.get(url)
        .then((response) => {
          this.setState({ setlist: response.data });
        });
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render() {
    const { setlist } = this.state;

    return (
      <div className="Setlist">
        <SetlistView setlist={setlist} />
      </div>
    );
  }
}
