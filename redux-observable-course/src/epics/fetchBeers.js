import { ajax } from "rxjs/ajax";
import {ignoreElements, map, tap} from "rxjs/operators";
import {fetchFulfilled} from "../reducers/beersActions";
const API = "https://api.punkapi.com/v2/beers";

export const fetchBeersEpic = () => {
  return ajax.getJSON(API).pipe(
     map(response => fetchFulfilled(response))
  );
};
