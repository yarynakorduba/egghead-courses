import React from "react";
import { connect } from "react-redux";
import { cancel, search } from "../reducers/beersActions";
import { BeerList } from "./BeersList";

export const Beers = props => {
  const { status, search, data, messages, cancel } = props;
  return (
    <>
      <div className={"App-inputs"}>
        <input
          type={"text"}
          placeholder={"Search beers..."}
          onChange={evt => search(evt.target.value)}
        />
        {status === "pending" && (
          <>
            <span>Pending request...</span>
            <button onClick={cancel}>cancel</button>
          </>
        )}
        {status === "success" && <BeerList beers={data} />}
        {status === "failure" && <div>Oops! Failure: {messages[0].text}</div>}
      </div>
    </>
  );
};

export default connect(
  state => state.beers,
  { search, cancel }
)(Beers);
