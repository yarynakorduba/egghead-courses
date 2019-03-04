import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { branch, compose, lifecycle, renderComponent } from "recompose";

function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject({ statusCode: "UNAUTHENTICATED" });
    }, 1500);
  });
}

const withUserData = lifecycle({
  componentDidMount() {
    fetchData().then(
      users => this.setState({ users }),
      error => this.setState({ error })
    );
  }
});
const UNAUTHENTICATED = 401;
const UNAUTORIZED = 403;

const errorMsg = {
  UNAUTHENTICATED: "NOT AUTHENTICATED",
  UNAUTORIZED: "NOT AUTHORIZED"
};

const AuthError = ({ error }) => <div>{errorMsg[error.statusCode]}</div>;
const UsersEmptyState = () => "No users";

const hasErrorCode = ({ error }) => error && error.statusCode;
const noUsers = ({ users }) => users && !users.length;

const nonOptimalStates = states =>
  compose(
    ...states.map(state => branch(state.when, renderComponent(state.render)))
  );
const enhancer = compose(
  withUserData,
  nonOptimalStates([
    {
      when: hasErrorCode,
      render: AuthError
    },
    { when: noUsers, render: UsersEmptyState }
  ])
);

const UserList = enhancer(({ users }) => (
  <div>{users && users.map(user => <User {...user} />)}</div>
));
const User = ({ name, status }) => (
  <div>
    <div className={"User"}>
      {name} - {status}
    </div>
  </div>
);

const App = () => (
  <div>
    <UserList />
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
