import React, { useMemo } from "react";
import {Switch, BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import { useSelector } from 'react-redux';

import Auth from "../layout/Auth";
import Admin from "../layout/Admin";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

export default function AppRouter() {

    const user = useSelector(store => store.user);

    console.log(user);

    return user.id != null ? (
        <Router>
            <Switch>
                <PrivateRoute exact path="/" component={Admin} isAuth={user.id != null} />
            </Switch>
        </Router>
    ) : (
        <Router>
            <Switch>
                <PublicRoute exact path="/" component={Auth} />
                <Redirect to={{ pathname: "/" }} />
            </Switch>
        </Router>
    );
}
