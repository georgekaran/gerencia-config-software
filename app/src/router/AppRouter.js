import React, {useEffect, useState} from "react";
import {Switch, BrowserRouter as Router, Redirect} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';

import Auth from "../layout/Auth";
import Admin from "../layout/Admin";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

import { setAuth } from "../actions/authActions";
import { isTokenExpirationDateValid, getAuth, removeAuth } from "../utils/TokenUtils";

export default function AppRouter() {
    const [isTokenValid, setTokenValid] = useState(false);

    const dispatch = useDispatch();
    const auth = useSelector(store => store.auth);

    useEffect(() => {
        if (auth.token == null) {
            if (isTokenExpirationDateValid()) {
                setTokenValid(true);
                dispatch(setAuth(getAuth()));
                return;
            }
            removeAuth();
        } else {
            setTokenValid(true);
        }
    }, [auth]);

    console.log(auth);

    return isTokenValid ? (
        <Router>
            <Switch>
                <PrivateRoute exact path="/" component={Admin} isAuth={isTokenValid} />
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
