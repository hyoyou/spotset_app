import React, { Component } from 'react';
import SetlistView from '../components/SetlistView';

export default class Setlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setlist: "",
      error: "" 
    };
  }

  componentDidMount() {
    this.fetchSetlist(this.props.setlistId);
  }

  async fetchSetlist(setlistId) {
    try {
      await fetch(`/api/setlists/${setlistId}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ setlist: data });
      });
    } catch (error) {
      this.setState({ error: error });
    }
  }
 
  render() {
    const { setlist } = this.state;

    return (
      <div className="Setlist">
        <SetlistView setlist = {this.state.setlist} />
      </div>
    );
  }
}