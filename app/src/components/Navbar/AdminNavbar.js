/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media
} from "reactstrap";
import './AdminNavBar.scss';
import { removeAuth } from "../../utils/TokenUtils";
import { deleteAuth } from "../../actions/authActions";

const AdminNavbar = () => {
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);

  const handleLogout = () => {
    removeAuth();
    dispatch(deleteAuth());
    window.location.assign("/");
  };

  return (
      <>
        <Navbar className="navbar-top-custom navbar-dark" expand="md" id="navbar-main">
          <Container fluid>
            <Link
                className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
                to="/"
            >
              AGI - PDV
            </Link>
            <Nav className="align-items-center d-none d-md-flex" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                      <i className="far fa-user-circle fa-2x"></i>
                    <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold">
                        {user.nome}
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem className="noti-title" header tag="div">
                    <h6 className="text-overflow m-0">Bem-vindo!</h6>
                  </DropdownItem>
                  <DropdownItem to="/admin/user-profile" tag={Link}>
                    <i className="ni ni-single-02" />
                    <span>Meu perfil</span>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem href="/" onClick={handleLogout}>
                    <i className="ni ni-user-run" />
                    <span>Sair</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Container>
        </Navbar>
      </>
  );
}

export default AdminNavbar;
