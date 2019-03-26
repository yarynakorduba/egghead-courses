import { createStore, combineReducers, applyMiddleware } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import { of } from "rxjs";
import { delay } from "rxjs/operators";
import { appReducer } from "./appReducer";

const epic1 = () =>
  of({ type: "SET_NAME", payload: "Sally" }).pipe(delay(2000));

export function configureStore() {
  const rootEpic = combineEpics(epic1);

  const epicMiddleware = createEpicMiddleware();
  const rootReducer = combineReducers({
    app: appReducer
  });
  const store = createStore(rootReducer, applyMiddleware(epicMiddleware));
  epicMiddleware.run(rootEpic);
  return store;
}
