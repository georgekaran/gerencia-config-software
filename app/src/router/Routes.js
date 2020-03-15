import React from "react";
import { Switch, BrowserRouter as Router } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

import Login from "../pages/Login/Login";
import Admin from "../layout/Admin";

const isAuth = false;

export default function Routes() {
  return !isAuth ? (
    <Admin>
      <Router>
        <Switch>
          <PublicRoute path="/" component={Login} />
        </Switch>
      </Router>
    </Admin>
  ) : null;
}
