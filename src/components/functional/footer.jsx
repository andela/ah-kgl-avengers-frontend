import React from 'react';
import {
  Container, Navbar, Nav, NavItem, NavLink,
} from 'reactstrap';

const Footer = () => (
  <Container>
    <Navbar expand="sm">
      <Nav className="footer" navbar>
        <NavItem>
          <NavLink href="/" className="mr-5">
            <i className="zmdi zmdi-help mr-2" />
            HELP
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/" className="mr-5">
            <i className="zmdi zmdi-case mr-2" />
            CAREER
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/" className="mr-5">
            <i className="zmdi zmdi-accounts-alt mr-2" />
            ABOUT
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/" className="mr-5">
            <i className="zmdi zmdi-globe mr-2" />
            PRIVACY POLICY
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/" className="mr-5">
            <i className="zmdi zmdi-book mr-2" />
            TERMS AND CONDITIONS
          </NavLink>
        </NavItem>
      </Nav>
    </Navbar>
    <div className="footer-copyright d-flex justify-content-center">
      <span>&copy; AuthorsHaven 2019</span>
    </div>
  </Container>
);

export default Footer;
