import React from "react";
import { Switch } from "./switch";

const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args));

class Toggle extends React.Component {
  static defaultProps = {
    onReset: () => {},
    initialOn: false
  };

  static stateChangeTypes = {
    reset: "__reset__",
    toggle: "__toggle__"
  };
  initialState = { on: this.props.initialOn };
  state = this.initialState;
  internalSetState(changes, callback) {
    this.setState(state => {
      const changeObject =
        typeof changes === "function" ? changes(state) : changes;
      const reducedChanges = this.props.stateReducer(state, changeObject);
      const { type: ignoredType, ...onlyChanges } = reducedChanges;
      return onlyChanges;
    }, callback);
  }
  toggle = ({ type = Toggle.stateChangeTypes.toggle } = {}) =>
    this.internalSetState(
      ({ on }) => ({ on: !on, type }),
      () => {
        this.props.onToggle && this.props.onToggle(this.state.on);
      }
    );

  reset = () =>
    this.internalSetState(
      { ...this.initialState, type: Toggle.stateChangeTypes.reset },
      () => this.props.onReset(this.state.on)
    );

  getTogglerProps = ({ onClick, className, ...props }) => {
    return {
      "aria-pressed": this.state.on,
      onClick: callAll(onClick, () => this.toggle()),
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

class Usage extends React.Component {
  initialState = { timesClicked: 0 };
  state = this.initialState;
  handleToggle = (...args) => {
    this.setState(({ timesClicked }) => ({ timesClicked: timesClicked + 1 }));
  };

  handleReset = (...args) => {
    this.setState(this.initialState);
  };

  toggleStateReducer = (state, changes) => {
    if (changes.type === "forced") {
      return changes;
    }
    if (this.state.timesClicked >= 4) {
      return { ...changes, on: false };
    }
    return changes;
  };
  render() {
    const { timesClicked } = this.state;
    return (
      <Toggle
        onToggle={this.handleToggle}
        onReset={this.handleReset}
        stateReducer={this.toggleStateReducer}
      >
        {({ getTogglerProps, on, toggle, reset }) => (
          <div>
            <Switch on={on} {...getTogglerProps({ on })} />
            <hr />
            {timesClicked >= 4 && (
              <>
                <div>Whoa! Too much!</div>
                <button onClick={() => toggle({ type: "forced" })}>
                  Force toggle
                </button>
              </>
            )}
            <button onClick={reset}>Reset</button>

            {on ? "on" : "off"}
          </div>
        )}
      </Toggle>
    );
  }
}

Usage.title = "Render Props";

export { Toggle, Usage as default };
