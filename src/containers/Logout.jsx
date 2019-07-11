/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

export default class Logout extends Component {
  render() {
    const { logOutHandler } = this.props;

    return (
      <div className="Logout">
        <button id="btn-spotify" onClick={logOutHandler} type="button">Log Out</button>
      </div>
    );
  }
}
