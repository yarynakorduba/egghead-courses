import {
  CANCEL,
  FETCH_FAILED,
  FETCH_FULFILLED,
  SET_STATUS
} from "./beersActions";

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
    case FETCH_FAILED:
      return {
        ...state,
        status: "failure",
        messages: [
          {
            type: "error",
            text: action.payload
          }
        ]
      };
    case SET_STATUS:
      return {
        ...state,
        status: action.payload
      };
    case CANCEL:
      return {
        ...state,
        status: "idle",
        messages: []
      };

    default:
      return state;
  }
};
