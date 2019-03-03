import React, { Component } from "react";
import { Switch } from "./switch";

class Toggle extends Component {



  state = { on: false };
  toggle = () =>
    this.setState(
      currentState => ({ on: !currentState.on }),
      () => {
        this.props.onToggle(this.state.on);
      }
    );
  render() {
    return <Switch on={this.state.on} onClick={this.toggle} />;
  }
}

function Usage({ onToggle = (...args) => console.log("onToggle", ...args) }) {
  return <Toggle onToggle={onToggle} />;
}

export default Usage;
