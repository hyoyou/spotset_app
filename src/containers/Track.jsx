import React, { Component } from 'react';
import './SetlistView.css';

export default class Track extends Component {
  state = {
    addedToList: false
  }

  componentDidMount() {
    if (this.props.uri) {
      this.setState({
        addedToList: true
      })
    }
  }

  addTrack = (event, uri) => {
    this.setState({ addedToList: true });
    this.props.addTrack(uri);
  }

  removeTrack = (event, uri) => {
    this.setState({ addedToList: false });
    this.props.removeTrack(uri);
  }

  render() {
    const { addedToList } = this.state;
    const { title, uri } = this.props;

    return (
      <div
        id={ addedToList ? null : 'removed' }
        className={ uri ? 'available' : 'notfound' }
        onClick={ addedToList ? (e) => this.removeTrack(e, uri) : (e) => this.addTrack(e, uri) }
      >
        { title }
      </div>
    )
  }
}
