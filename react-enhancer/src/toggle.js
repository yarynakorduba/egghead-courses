import React from "react";
import { Switch } from "./switch";

const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args));

class Toggle extends React.Component {
  static defaultProps = {
    onReset: () => {},
    initialOn: false
  };
  initialState = { on: this.props.initialOn };
  state = this.initialState;
  toggle = () =>
    this.setState(
      ({ on }) => ({ on: !on }),
      () => {
        this.props.onToggle && this.props.onToggle(this.state.on);
      }
    );

  reset = () =>
    this.setState(this.initialState, () => this.props.onReset(this.state.on));

  getTogglerProps = ({ onClick, className, ...props }) => {
    return {
      "aria-pressed": this.state.on,
      onClick: callAll(onClick, this.toggle),
      className: `${className} our-custom-class-name`,
      ...props
    };
  };
  getStateAndHelpers = () => ({
    on: this.state.on,
    toggle: this.toggle,
    getTogglerProps: this.getTogglerProps,
    reset: this.reset
  });

  render() {
    return this.props.children(this.getStateAndHelpers());
  }
}

function CommonToggle(props) {
  return (
    <Toggle {...props}>
      {({ on, toggle }) => <Switch on={on} onClick={toggle} />}
    </Toggle>
  );
}

function Usage({
  onToggle = (...args) => console.log("onToggle", ...args),
  onButtonClick = (...args) => alert("onButtonClick"),
  onReset = (...args) => console.log("onreset"),
  initialOn = true
}) {
  return (
    <Toggle onToggle={onToggle} onReset={onReset}>
      {({ getTogglerProps, on, reset }) => (
        <div>
          <Switch on={on} {...getTogglerProps({ on })} />
          <hr />
          <button onClick={reset}>Reset</button>
          <button
            aria-label="custom-button"
            {...getTogglerProps({
              "aria-pressed": null,
              "aria-label": "custom-button",
              id: "custom-button-id"
            })}
            onClick={onButtonClick}
            id="custom-button-id"
          >
            {on ? "on" : "off"}
          </button>
        </div>
      )}
    </Toggle>
  );
}
Usage.title = "Render Props";

export { Toggle, Usage as default };
