export const FETCH_FULFILLED = "FETCH_FULFILLED";
export const SET_STATUS = "SET_STATUS";
export const FETCH_DATA = "FETCH_DATA";
export const SEARCH = "SEARCH";
export const FETCH_FAILED = "FETCH_FAILED";

export const setStatus = status => ({
  type: SET_STATUS,
  payload: status
});

export const fetchFulfilled = beers => ({
  type: FETCH_FULFILLED,
  payload: beers
});

export const fetchData = () => ({
  type: FETCH_DATA
});

export const search = input => ({
  type: SEARCH,
  payload: input
});

export const fetchFailed = errorMessage => ({
  type: FETCH_FAILED,
  payload: errorMessage
});
