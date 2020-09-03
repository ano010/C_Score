import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from "reactstrap";

const NavBar = props => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>
      <Navbar className="nav-bar navbar-expand-lg navbar-dark bg-dark">
        <Link to="/" className="navbar-brand">
          CrickScore
        </Link>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem className=" m-2">
              <NavLink to="/matches/">Matches</NavLink>
            </NavItem>
            <NavItem className="m-2">
              <NavLink to="/login">Login</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
