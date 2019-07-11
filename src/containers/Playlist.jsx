/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

export default class Playlist extends Component {
  render() {
    const { logOutHandler } = this.props;

    return (
      <div className="Playlist">
        <button id="btn-spotify" onClick={logOutHandler} type="button">Log Out</button>
      </div>
    );
  }
}
