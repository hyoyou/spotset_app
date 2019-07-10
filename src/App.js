/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import logo from './logo.svg';
import Setlist from './containers/Setlist';

export default class App extends Component {
  render() {
    const testSetlistId = '3393481d';

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="App-body">
          <Setlist httpClient={axios} setlistId={testSetlistId} />
        </div>
      </div>
    );
  }
}