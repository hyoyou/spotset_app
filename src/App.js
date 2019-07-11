/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import './App.css';
import Spotify from './containers/Spotify';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>SpotSet</h1>
        </header>

        <Spotify />

        <footer className="App-footer">
          <h4>Created with APIs provided by setify.fm and Spotify</h4>
        </footer>
      </div>
    );
  }
}
