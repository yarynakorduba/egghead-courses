import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import {
  branch,
  componentFromProp,
  compose,
  lifecycle,
  renderComponent,
  renderNothing,
  withProps
} from "recompose";

const Link = compose(
  withProps(({ type = "a", to = "#" }) =>
    type === "a"
      ? { type, href: to }
      : {
          type,
          onClick(e) {
            window.location = to;
          }
        }
  )
)(componentFromProp("type"));

const App = () => (
  <div>
    <Link to={"#/page1"}>Anchor Link</Link>
    <Link to={"#/page2"} type={"button"}>
      Button Link
    </Link>
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
