import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Setlist from './containers/Setlist';

export default class App extends Component {
  render() {
    const testSetlistId = '3393481d';

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Setlist setlistId={testSetlistId} />
        </header>
      </div>
    );
  }
}