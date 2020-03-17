import React, { useMemo } from "react";
import { Switch, BrowserRouter as Router } from "react-router-dom";
import { useSelector } from 'react-redux';

import Auth from "../layout/Auth";
import Admin from "../layout/Admin";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import routes from "./routes";

const isAuth = false;

export default function AppRouter() {

  const user = false;

  const privateRoutes = useMemo(() => {
    return routes.filter(route => route.privateRoute);
  }, [routes]);

  const publicRoutes = useMemo(() => {
    return routes.filter(route => !route.privateRoute);
  }, [routes]);

  return user === false ? (
    <Auth>
      <Router>
        <Switch>
          {publicRoutes.map((route, idx) => (
            <PublicRoute key={idx} {...route} />
          ))}
        </Switch>
      </Router>
    </Auth>
  ) : (
    <Admin>
      <Router>
        <Switch>
          {privateRoutes.map((route, idx) => (
            <PrivateRoute key={idx} {...route} />
          ))}
        </Switch>
      </Router>
    </Admin>
  );
}
