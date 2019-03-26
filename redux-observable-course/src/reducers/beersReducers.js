import { FETCH_FULFILLED, SET_STATUS } from "./beersActions";

const initialState = {
  data: [],
  status: "idle"
};

export const beersReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FULFILLED:
      return {
        ...state,
        status: "success",
        data: action.payload
      };
    case SET_STATUS:
      return {
        ...state,
        status: action.payload
      };
    default:
      return state;
  }
};