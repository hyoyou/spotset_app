import React, { Component } from 'react';
import SetlistView from './SetlistView';

export default class Setlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setlist: '',
      error: '' 
    };
  }

  componentDidMount() {
    const { setlistId } = this.props;
    this.fetchSetlist(setlistId);
  }

  async fetchSetlist(setlistId) {
    try {
      await fetch(`/api/setlists/${setlistId}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ setlist: data });
      });
    } catch (error) {
      this.setState({ error });
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
