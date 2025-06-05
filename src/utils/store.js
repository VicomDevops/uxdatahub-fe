import { createStore, applyMiddleware, compose } from "redux";
import combineReducers from "../reducers";
import thunk from "redux-thunk";

const middleware = [thunk];
const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers,
    {},
    composeEnhancers(applyMiddleware(...middleware))
);

export default store;
