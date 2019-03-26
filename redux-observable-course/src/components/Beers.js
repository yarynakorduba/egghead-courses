import React from "react";
import { connect } from "react-redux";
import { search } from "../reducers/beersActions";
import { BeerList } from "./BeersList";

export const Beers = props => {
  const { status, search, data } = props;
  return (
    <>
      <div className={"App-inputs"}>
        <input
          type={"text"}
          placeholder={"Search beers..."}
          onChange={evt => search(evt.target.value)}
        />
        {status === "pending" && <span>Pending request...</span>}
        {status === "success" && <BeerList beers={data} />}
      </div>
    </>
  );
};

export default connect(
  state => state.beers,
  { search }
)(Beers);
