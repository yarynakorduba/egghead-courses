import React from "react";
import { connect } from "react-redux";
import { fetchData } from "../reducers/beersActions";
import { BeerList } from "./BeersList";

export const Beers = props => {
  const { status, fetchData, data } = props;
  return (
    <>
      <div className={"App-inputs"}>
        <button
          type={"button"}
          onClick={fetchData}
          disabled={status === "pending"}
        >
          Fetch Beers
        </button>
        {status === "pending" && <span>Pending request...</span>}
        {status === "success" && <BeerList beers={data} />}
      </div>
    </>
  );
};

export default connect(
  state => state.beers,
  { fetchData }
)(Beers);
