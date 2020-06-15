import React, {useEffect, useState} from "react";
import {Switch, BrowserRouter as Router, Redirect, Route} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';

import Auth from "../layout/Auth";
import Admin from "../layout/Admin";

import PublicRoute from "./PublicRoute";

import { setAuth } from "../actions/authActions";
import { isTokenExpirationDateValid, getAuth, removeAuth } from "../utils/TokenUtils";
import routes from "./routes";
import { sortDescendingBy } from "../utils/ArrayUtils";

export default function AppRouter() {
    const [isTokenValid, setTokenValid] = useState(false);
    const [isFetching, setFetching] = useState(false);

    const dispatch = useDispatch();
    const auth = useSelector(store => store.auth);

    useEffect(() => {
        handleAuthFetching();
        // eslint-disable-next-line
    }, [auth]);

    const handleAuthFetching = async () => {
        setFetching(true);
        if (auth.token == null) {
            if (isTokenExpirationDateValid()) {
                setTokenValid(true);
                dispatch(setAuth(getAuth()));
                setFetching(false);
                return;
            }
            removeAuth();
        } else {
            setTokenValid(true);
        }
        setFetching(false);
    };

    if (isFetching) {
        return null;
    } else if (isTokenValid) {
        return (
          <Router>
              <Admin>
                  <Switch>
                      {sortDescendingBy(routes, "path").map(route => {
                          return (
                            <Route key={route.path} { ...route } path={route.path} />
                          )
                      })}
                  </Switch>
              </Admin>
          </Router>
        )
    } else {
        return (
          <Router>
              <Switch>
                  <PublicRoute exact path="/" component={Auth} />
                  <Redirect to={{ pathname: "/" }} />
              </Switch>
          </Router>
        )
    }
}
