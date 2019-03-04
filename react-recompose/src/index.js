import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { mapProps } from "recompose";

const users = [
  {
    name: "TimActive",
    status: "active"
  },
  {
    name: "TimPending",
    status: "pending"
  },
  { name: "TimInactive", status: "inactive" },
  { name: "Tim2Active", status: "active" }
];

const User = ({ name, status }) => (
  <div className={"User"}>
    {name}
    {" - " + status}
  </div>
);

const UserList = ({ users, status }) => (
  <div>
    <h3>{status} users</h3>
    {users &&
      users.map((user, ind) => <User key={ind} {...user} status={status} />)}
  </div>
);

const filterByStatus = status =>
  mapProps(({ users }) => ({
    status,
    users: users.filter(u => u.status === status)
  }));

const ActiveUsers = filterByStatus("active")(UserList);
const InactiveUsers = filterByStatus("inactive")(UserList);
const PendingUsers = filterByStatus("pending")(UserList);

const App = () => (
  <div>
    <ActiveUsers users={users} />
    <InactiveUsers users={users} />
    <PendingUsers users={users} />
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
