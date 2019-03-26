import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";
import Beers from "./components/Beers";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Beers />
      </div>
    );
  }
}

export default connect(state => state.app)(App);
