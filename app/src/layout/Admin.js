import React from "react";

import AdminNavbar from "../components/Navbar/AdminNavbar";
import Sidebar from "../components/Sidebar/Sidebar";

import routes from '../router/routes';

export default function Admin({ children }) {
  return (
    <>
      <Sidebar
        {...this.props}
        routes={routes}
        logo={{
          innerLink: "/admin/index",
          imgSrc: undefined,
          imgAlt: "..."
        }}
      />
      <div className="main-content" ref="mainContent">
        <AdminNavbar
          {...this.props}
          brandText={this.getBrandText(this.props.location.pathname)}
        />
        {children}
      </div>
    </>
  );
}
