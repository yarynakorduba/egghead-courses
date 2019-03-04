import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import {
  setDisplayName,
  setPropTypes,
  compose,
  withProps,
  withState,
  withHandlers
} from "recompose";
import PropTypes from "prop-types";

const withToggle = compose(
  withState("toggledOn", "toggle", false),
  withHandlers({
    show: ({ toggle }) => e => toggle(true),
    hide: ({ toggle }) => e => toggle(false),
    toggle: ({ toggle }) => e => toggle(current => !current)
  })
);

function Redux() {
  return {
    connect: () => BaseComponent => props => (
      <BaseComponent
        {...props}
        dispatch={({ type }) => console.log(type + " dispatched")}
      />
    )
  };
}

const { connect } = Redux();

const StatusList = () => (
  <div>
    <div>pending</div>
    <div>inactive</div>
    <div>active</div>
  </div>
);

const Status = withToggle(({ status, toggledOn, toggle }) => (
  <span onClick={toggle}>
    {status}
    {toggledOn && <StatusList />}
  </span>
));

const Tooltip = withToggle(({ text, children, toggledOn, show, hide }) => (
  <div>
    {toggledOn && (
      <div
        className={"Tooltip"}
        style={{ background: "aliceblue", color: "gray" }}
      >
        {text}
      </div>
    )}
    <div
      style={{ with: "30rem", height: "2rem" }}
      onMouseEnter={show || (() => console.log("enter"))}
      onMouseLeave={hide}
    >
      {children}
    </div>
  </div>
));

const enhancer = compose(
  setDisplayName("User"),
  setPropTypes({
    name: PropTypes.string.isRequired,
    status: PropTypes.string
  }),
  connect(),
  withProps(({ ...props }) => console.log(props) || props)
);

const User = enhancer(({ name, status, dispatch }) => (
  <div className={"User"} onClick={() => dispatch({ type: "USER_SELECTED" })}>
    <Tooltip text={"Cool, Dude!"}>
      <div>
        {name} : <Status status={status} />
      </div>
    </Tooltip>
  </div>
));

const App = () => (
  <div>
    <User name={"Tim"} status={"active"} />
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
