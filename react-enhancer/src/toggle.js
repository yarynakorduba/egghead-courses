import React from "react";
import { Switch } from "./switch";

const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args));

class Toggle extends React.Component {
  state = { on: false };
  isControlled(prop) {
    return this.props[prop] !== undefined;
  }
  getState() {
    return {
      on: this.isControlled("on") ? this.props.on : this.state.on
    };
  }
  toggle = () => {
    if (this.isControlled("on")) {
      this.props.onToggle(!this.getState().on);
    } else {
      this.setState(
        ({ on }) => ({ on: !on }),
        () => {
          this.props.onToggle(this.getState().on);
        }
      );
    }
  };
  render() {
    return <Switch on={this.props.on} onClick={this.toggle} />;
  }
}

class Usage extends React.Component {
  state = { bothOn: false };
  handleToggle = on => {
    this.setState({ bothOn: on });
  };

  render() {
    const { bothOn } = this.state;
    return (
      <div>
        <Toggle onToggle={this.handleToggle} />
        <Toggle on={bothOn} onToggle={this.handleToggle} />
      </div>
    );
  }
}

Usage.title = "Render Props";

export { Toggle, Usage as default };
