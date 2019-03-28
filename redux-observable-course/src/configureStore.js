import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import { appReducer } from "./reducers/appReducer";
import { fetchBeersEpic } from "./epics/fetchBeers";
import { beersReducers } from "./reducers/beersReducers";
import { configReducer } from "./reducers/configReducer";
import { hydrateEpic, persistEpic } from "./epics/persist";
import { ajax } from "rxjs/ajax";

export function configureStore(dependencies = {}) {
  const rootEpic = combineEpics(fetchBeersEpic, persistEpic, hydrateEpic);

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const epicMiddleware = createEpicMiddleware({
    dependencies: { getJSON: ajax.getJSON, document, ...dependencies }
  });
  const rootReducer = combineReducers({
    app: appReducer,
    beers: beersReducers,
    config: configReducer
  });
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(epicMiddleware))
  );
  epicMiddleware.run(rootEpic);
  return store;
}
