import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { values: [] };
 
    fetch('/api/values')
      .then(response => response.json())
      .then(data => {
        this.setState({ values: data });
      });
  }
 
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Values from API:</h2>
          <ul>
            {this.state.values.map((value, index) => <li key={index}>{value}</li>)}
          </ul>
        </header>
      </div>
    );
  }
}