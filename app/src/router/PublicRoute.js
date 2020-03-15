import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PublicRoute = ({ component: Component, isAuth = false, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            !isAuth ? (
                <Component {...props} />
            ) : (
                    <Redirect to={{ pathname: "/dashboard", state: { from: props.location } }} />
                )
        }
    />
);

export default PublicRoute