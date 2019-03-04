import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import {
  branch,
  compose,
  lifecycle,
  renderComponent,
  renderNothing
} from "recompose";

const userIsNotActive = ({ status }) =>
  console.log(status) || status !== "active";
const hideIfNotActive = branch(userIsNotActive, renderNothing);

const users = [
  { name: "Tim", status: "active" },
  { name: "Bob", status: "active" },
  { name: "Joe", status: "inactive" },
  { name: "Jim", status: "pending" }
];
const featured = users[3];

function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {}, 1500);
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

const FeaturedUser = hideIfNotActive(({ status, name }) => (
  <div>
    Today`s featured user: <User status={status} name={name} />
  </div>
));

const UserList = enhancer(() => (
  <div>
    {users && users.map((user, id) => <User key={id} {...user} />)}
    {users && <FeaturedUser status={featured.status} name={featured.name} />}
  </div>
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
