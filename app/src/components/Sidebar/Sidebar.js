import React from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";

import routes from "../../router/routes";

// reactstrap components
import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";
import SidebarHeading from "./SidebarHeading";

const Sidebar = () => {
  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    // collapseOpen: !this.state.collapseOpen
  };
  // closes the collapse
  const closeCollapse = () => {
    // collapseOpen: false
  };
  // creates the links that appear in the left menu / Sidebar
  const createLinks = routes => {
    return routes.filter(route => route.showOnSideBar).map((prop, key) => {
      return (
        <NavItem key={key}>
          <NavLink
            to={prop.path}
            tag={NavLinkRRD}
            onClick={closeCollapse}
            activeClassName="active"
          >
            <i className={prop.icon} />
            {prop.name}
          </NavLink>
        </NavItem>
      )
    });
  };

  const getLogo = () => {
    return require(`../../assets/img/icons/logo_pdv.png`);
  }

  const navbarBrandProps = { to: undefined, tag: Link };
  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-white"
      expand="md"
      id="sidenav-main"
    >
      <Container fluid>
        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleCollapse}
        >
          <span className="navbar-toggler-icon" />
        </button>

          <NavbarBrand className="pt-0" {...navbarBrandProps}>
            <img
              alt={"Brand"}
              className="navbar-brand-img"
              src={getLogo()}
            />
            AGI - PDV
          </NavbarBrand>

        <Nav className="align-items-center d-md-none">
          <UncontrolledDropdown nav>
            <DropdownToggle nav className="nav-link-icon">
              <i className="ni ni-bell-55" />
            </DropdownToggle>
            <DropdownMenu
              aria-labelledby="navbar-default_dropdown_1"
              className="dropdown-menu-arrow"
              right
            >
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another action</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Something else here</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav>
            <DropdownToggle nav>
              <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    {/*<img*/}
                    {/*  alt="..."*/}
                    {/*  src={null}*/}
                    {/*/>*/}
                  </span>
              </Media>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem className="noti-title" header tag="div">
                <h6 className="text-overflow m-0">Welcome!</h6>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-single-02" />
                <span>My profile</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-settings-gear-65" />
                <span>Settings</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-calendar-grid-58" />
                <span>Activity</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-support-16" />
                <span>Support</span>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                <i className="ni ni-user-run" />
                <span>Logout</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/* Collapse */}
        <Collapse navbar isOpen={false}>
          {/* Collapse header */}
          <div className="navbar-collapse-header d-md-none">
            <Row>
              {/*{logo ? (*/}
              {/*  <Col className="collapse-brand" xs="6">*/}
              {/*    {logo.innerLink ? (*/}
              {/*      <Link to={logo.innerLink}>*/}
              {/*        <img alt={logo.imgAlt} src={logo.imgSrc} />*/}
              {/*      </Link>*/}
              {/*    ) : (*/}
              {/*      <a href={logo.outterLink}>*/}
              {/*        <img alt={logo.imgAlt} src={logo.imgSrc} />*/}
              {/*      </a>*/}
              {/*    )}*/}
              {/*  </Col>*/}
              {/*) : null}*/}
              <Col className="collapse-close" xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={toggleCollapse}
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          {/* Form */}
          <Form className="mt-4 mb-3 d-md-none">
            <InputGroup className="input-group-rounded input-group-merge">
              <Input
                aria-label="Search"
                className="form-control-rounded form-control-prepended"
                placeholder="Search"
                type="search"
              />
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <span className="fa fa-search" />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Form>
          <SidebarHeading title="Cadastros" />
          {/* Navigation */}
          <Nav navbar>{createLinks(routes)}</Nav>
          {/* Divider */}
          <hr className="my-3" />
        </Collapse>
      </Container>
    </Navbar>
  );
}

Sidebar.defaultProps = {
  routes: [{}]
};

export default Sidebar;
