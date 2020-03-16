import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import * as reducers from "../reducers";

export default (serverState = {}) => {
  return createStore(
    combineReducers({
      ...reducers
    }),
    serverState,
    compose(
      process.env.NODE_ENV === "development" &&
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__(),
      applyMiddleware(thunk)
    )
  );
};
