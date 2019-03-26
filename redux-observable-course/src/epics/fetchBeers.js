import { ajax } from "rxjs/ajax";
import { map, switchMap } from "rxjs/operators";
import { fetchFulfilled, SEARCH, setStatus } from "../reducers/beersActions";
import { ofType } from "redux-observable";
import { concat, of } from "rxjs";
const API = "https://api.punkapi.com/v2/beers";
const search = term => `${API}?beer_name=${encodeURIComponent(term)}`;

export const fetchBeersEpic = action$ => {
  return action$.pipe(
    ofType(SEARCH),
    switchMap(({ payload }) => {
      return concat(
        of(setStatus("pending")),
        ajax
          .getJSON(search(payload))
          .pipe(map(response => fetchFulfilled(response)))
      );
    })
  );
};
