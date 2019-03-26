import React from "react";
import { connect } from "react-redux";

export const BeerList = props => {
  const { data, loading } = props;
  return (
    <div>
      {loading && <p>Please wait...</p>}
      {!loading && (
        <div>
          <p>Got {data.length} beers</p>
        </div>
      )}
    </div>
  );
};

export default connect(state => state.beers)(BeerList);
