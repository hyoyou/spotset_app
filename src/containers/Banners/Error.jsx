/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

export default class Error extends Component {
  render() {
    const { message } = this.props;

    return (
      <div className="Error">
        <p>{message}</p>
      </div>
    );
  }
}
