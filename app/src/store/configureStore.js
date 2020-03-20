import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import mySaga from "./saga";
import * as reducers from "../reducers";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({
    ...reducers
  }),
  compose(
    applyMiddleware(sagaMiddleware)
   // process.env.NODE_ENV === "development" &&
   //   window.__REDUX_DEVTOOLS_EXTENSION__ &&
   //   window.__REDUX_DEVTOOLS_EXTENSION__(),
  )
);

sagaMiddleware.run(mySaga);

export default store;
