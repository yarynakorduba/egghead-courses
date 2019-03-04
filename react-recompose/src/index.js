import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

const User = ({ name }) => <div className={"User"}>{name}</div>;

const neverRender = BaseComponent => props =>
  class extends Component {
    shouldComponentUpdate() {
      return false;
    }
    render() {
      return <BaseComponent {...props} />;
    }
  };

const User2 = neverRender(User);
const App = () => (
  <div>
    <User name={"Tim"} />
    <User2 name={"Weak Ross"} />
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
