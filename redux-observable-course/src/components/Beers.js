import React from "react";
import { connect } from "react-redux";
import { cancel, search } from "../reducers/beersActions";
import { BeerList } from "./BeersList";
import { setConfig } from "../configActions";

export const Beers = props => {
  const { status, search, data, messages, cancel, config, setConfig } = props;
  return (
    <>
      <div className={"App-inputs"}>
        <select
          name={"per-page"}
          defaultValue={config.perPage}
          onChange={e => setConfig({ perPage: Number(e.target.value) })}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(value => (
            <option key={value} value={value}>
              {value} results
            </option>
          ))}
        </select>
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

const mapState = state => ({ ...state.beers, config: state.config });

export default connect(
  mapState,
  { search, cancel, setConfig }
)(Beers);
