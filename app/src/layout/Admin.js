import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import AdminNavbar from "../components/Navbar/AdminNavbar";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from '../router/routes';
import Home from "../pages/Home/Home";

export default function Admin({ children, path, ...props }) {

    console.log(props);

  return (
    <>
      <Sidebar
        routes={routes}

      />
      <div className="main-content bg-gradient-info" >
        <AdminNavbar
          brandText="AAAAAaaa"
        />
          <Switch>
              <Route exact path={path}>
                  <Home />
              </Route>
          </Switch>
      </div>
    </>
  );
}
