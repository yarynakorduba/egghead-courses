export const FETCH_FULFILLED = "FETCH_FULFILLED";

export const fetchFulfilled = beers => ({
  type: FETCH_FULFILLED,
  payload: beers
});
