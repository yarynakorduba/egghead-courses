import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";
import BeerList from "./components/BeersList";

class App extends Component {
  render() {
    console.log(this.props.name);

    return (
      <div className="App">
        <BeerList />
      </div>
    );
  }
}

export default connect(state => state.app)(App);
