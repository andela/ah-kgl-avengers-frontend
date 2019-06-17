import React, { Component } from 'react';
import {
  Navbar, Collapse, Nav, NavItem, NavLink, Button,
} from 'reactstrap';

class Navigation extends Component {
  state = {
    isToggled: false,
  };

  toggle = () => {
    const { isToggled } = this.state;
    this.setState({ isToggled: !isToggled });
  };

  render() {
    const { isToggled } = this.state;
    return (
      <Navbar expand="sm">
        <Button onClick={this.toggle} className="btn-toggler navbar-toggler">
          Navigation
        </Button>
        <Collapse isOpen={isToggled} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="/home">MONEY</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">STARTUPS</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">RELIGION</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">SELF-DEVELOPMENT</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">POLITICS</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">TECH</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">BUSINESS</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default Navigation;
