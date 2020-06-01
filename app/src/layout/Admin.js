import React from "react";

import AdminNavbar from "../components/Navbar/AdminNavbar";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from '../router/routes';

export default function Admin({ children, ...props }) {

  return (
    <>
      <Sidebar
        routes={routes}

      />
      <div className="main-content bg-gradient-info" >
        <AdminNavbar
          brandText="AAAAAaaa"
        />
        {children}
      </div>
    </>
  );
}
