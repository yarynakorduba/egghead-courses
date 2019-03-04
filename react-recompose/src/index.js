import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { branch, compose, lifecycle, renderComponent } from "recompose";

function fetchData() {
  return new Promise(resolve => {
    setTimeout(() => resolve({ name: "Tim", status: "active" }), 1500);
  });
}

const withUserData = lifecycle({
  state: {
    loading: true
  },
  componentDidMount() {
    fetchData().then(data => this.setState({ ...data, loading: false }));
  }
});

const Spinner = () => <div className={"Spinner"}>Loading the data... </div>;

const isLoading = ({ loading }) => loading;

const withSpinnerWhileLoading = branch(isLoading, renderComponent(Spinner));

const ehnancer = compose(
  withUserData,
  withSpinnerWhileLoading
);

const User = ehnancer(({ name, status }) => (
  <div>
    <div className={"User"}>
      {name} - {status}
    </div>
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
