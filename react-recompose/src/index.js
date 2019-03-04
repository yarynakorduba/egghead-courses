import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { compose, flattenProp, withProps } from "recompose";

function ReactRedux() {
  const state = {
    user: { name: "Tim", status: "active" }
  };

  return {
    connect: map => withProps(map(state))
  };
}

const { connect } = ReactRedux();

const mapStateToProps = state => ({ user: state.user });

const enhance = compose(
  connect(mapStateToProps),
  flattenProp("user")
);

const User = enhance(({ name, status }) => (
  <div className={"User"}>
    {name} - {status}
  </div>
));

const App = () => (
  <div>
    <User />
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
