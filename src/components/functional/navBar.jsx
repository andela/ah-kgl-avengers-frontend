import React, { Component } from 'react';
import {
  Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, Button, Container,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import Title from '../../assets/images/ah-logo-text.png';
import Logo from '../../assets/images/ah_logo.png';

class AppBar extends Component {
  state = {
    isToggled: false,
  };

  toggle = () => {
    const { isToggled } = this.state;
    this.setState({ isToggled: !isToggled });
  }

  render() {
    const { isToggled } = this.state;
    return (
      <Navbar dark className="nav-top shadow-sm p-3" expand="sm">
        <Container>
          <Link to="/login">
            <NavbarBrand className="nav-logo">
              <img src={Logo} alt="logo" />
              <img src={Title} alt="title" />
            </NavbarBrand>
          </Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isToggled} navbar>
            <Nav className="ml-auto" navbar>
              <Link to="/login">
                <Button outline className="btn-outline-inverse m-1" color="primary">SIGN IN</Button>
              </Link>
              <Link to="/signup">
                <Button outline className="btn-outline m-1" color="primary">GET STARTED</Button>
              </Link>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default AppBar;
