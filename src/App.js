import React, { Component } from "react";
import "./App.css";
import SpotSet from "./containers/SpotSet";
import { Header, Footer } from "./components/Card";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Header className="App-header">
          <span id="spot">Spot</span>
          <span id="set">Set</span>
        </Header>

        <SpotSet />

        <Footer className="App-footer">
          Created with APIs provided by setlist.fm and Spotify
        </Footer>
      </div>
    );
  }
}
