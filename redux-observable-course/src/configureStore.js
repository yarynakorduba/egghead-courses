import {createStore, combineReducers} from 'redux'
import {appReducer} from "./appReducer";

export function configureStore() {
    const rootReducer = combineReducers({
        app: appReducer
    })
    return createStore(rootReducer)
}