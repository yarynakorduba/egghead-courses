import { ajax } from "rxjs/ajax";
import {
  map,
  switchMap,
  debounceTime,
  filter,
  catchError,
  delay,
  takeUntil
} from "rxjs/operators";
import {
  CANCEL,
  fetchFailed,
  fetchFulfilled,
  SEARCH,
  setStatus
} from "../reducers/beersActions";
import { ofType } from "redux-observable";
import { concat, of } from "rxjs";
const API = "https://api.punkapi.com/v2/beers";
const search = term => `${API}?beer_name=${encodeURIComponent(term)}`;

export const fetchBeersEpic = action$ => {
  return action$.pipe(
    ofType(SEARCH),
    debounceTime(500),
    filter(({ payload }) => payload.trim() !== ""),
    switchMap(({ payload }) => {
      return concat(
        of(setStatus("pending")),
        ajax.getJSON(search(payload)).pipe(
            delay(5000),

            takeUntil(action$.pipe(ofType(CANCEL))),
          map(response => fetchFulfilled(response)),

          catchError(err => {
            return of(fetchFailed(err.response.message));
          })
        )
      );
    })
  );
};
