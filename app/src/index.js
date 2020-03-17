import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from './store/configureStore';

import "./assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/scss/argon-dashboard-react.scss";

import AppRouter from "./router/AppRouter";

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById("root")
);
