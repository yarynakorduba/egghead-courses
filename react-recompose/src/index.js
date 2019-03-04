import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { lifecycle } from "recompose";

const config = {
  showStatus: true,
  canDeleteUsers: true
};

function fetchConfiguration() {
  return new Promise(resolve => {
    setTimeout(() => resolve(config), 300);
  });
}

const configPromise = fetchConfiguration();

const withConfig = lifecycle({
  state: { config: {} },
  componentDidMount() {
    configPromise.then(config => this.setState({ config }));
  }
});

const User = withConfig(({ name, status, config }) => (
  <div className={"User"}>
    {name}
    {config && config.showStatus && "-" + status}
    {config && config.canDeleteUsers && <button>x</button>}
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
