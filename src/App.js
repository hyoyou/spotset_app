/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import './App.css';
import SpotSet from './containers/SpotSet';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <span id="spot">Spot</span>
          <span id="set">Set</span>
        </header>

        <SpotSet />

        <footer className="App-footer">
          <h4>Created with APIs provided by setlist.fm and Spotify</h4>
        </footer>
      </div>
    );
  }
}
