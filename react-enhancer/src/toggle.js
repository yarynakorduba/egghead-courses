import React, { Component } from "react";
import { Switch } from "./switch";

const ToggleContext = React.createContext();

const ToggleConsumer = props => (
  <ToggleContext.Consumer>
    {context => {
      if (!context) {
        throw new Error(
          "Toggle Compound Components must be rendered within the toggle component"
        );
      }
      return props.children(context);
    }}
  </ToggleContext.Consumer>
);

class Toggle extends Component {
  static On = ({ children }) => (
    <ToggleConsumer>{({ on }) => (on ? children : null)}</ToggleConsumer>
  );
  static Off = ({ children }) => (
    <ToggleConsumer>{({ on }) => (on ? null : children)}</ToggleConsumer>
  );

  static Button = props => (
    <ToggleConsumer>
      {({ on, toggle }) => <Switch on={on} onClick={toggle} {...props} />}
    </ToggleConsumer>
  );

  state = { on: false };
  toggle = () =>
    this.setState(
      currentState => ({ on: !currentState.on }),
      () => {
        this.props.onToggle(this.state.on);
      }
    );
  render() {
    return (
      <ToggleContext.Provider
        value={{ on: this.state.on, toggle: this.toggle }}
      >
        {this.props.children}
      </ToggleContext.Provider>
    );
  }
}

function Usage({ onToggle = (...args) => console.log("onToggle", ...args) }) {
  return (
    <Toggle onToggle={onToggle}>
      <div>
        <Toggle.Button />
      </div>
      <Toggle.On>The button is on</Toggle.On>
      <Toggle.Off>The button is off</Toggle.Off>
    </Toggle>
  );
}

export default Usage;
