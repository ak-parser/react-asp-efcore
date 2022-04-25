import React, { useState } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { signOut } from '../auth/SignOut';
import './NavMenu.css';
import { ChangeSettings } from '../account/ChangeSettings';

export function NavMenu({ username, onSignOut }) {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();

  const onSignInClick = () => {
    navigate("/signin");
  }

  const onSignOutClick = async () => {
    const isLogout = await signOut();
    if (isLogout) {
      onSignOut();
      navigate("/");
    }
  }

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  }

  return (
    <header>
      <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
        <Container>
          <NavbarBrand tag={Link} to="/">
            <img src="/logo_48x48.png" alt="Logo(home)" />
          </NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={collapsed} navbar>
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/products">Products</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/customers">Customers</NavLink>
              </NavItem>
              {username ?
                <NavDropdown title={<span className="text-dark fw-bolder">{username}</span>} className="ms-3">
                  <NavDropdown.Item onClick={() => navigate("/settings")}>Change account settings</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={onSignOutClick}>Sign out</NavDropdown.Item>
                </NavDropdown>
                : <NavLink role="button" className="text-dark fw-bolder ms-3" onClick={onSignInClick}>Sign in</NavLink>}
            </ul>
          </Collapse>
        </Container>
      </Navbar>
    </header >
  );
}
