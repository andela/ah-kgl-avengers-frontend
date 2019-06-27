import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Button,
  Container,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import Title from '../../assets/images/ah-logo-text.png';
import Logo from '../../assets/images/ah_logo.png';
import ImageAvatar from '../imageAvatar';

class AppBar extends Component {
  state = {
    isToggled: false,
    isLoggedIn: true,
  };

  componentDidMount = () => {
    this.checkLogin();
  };

  checkLogin = () => {
    if (localStorage.token === undefined) {
      const { isLoggedIn } = this.state;
      this.setState({ isLoggedIn: !isLoggedIn });
    }
  };

  toggle = () => {
    const { isToggled } = this.state;
    this.setState({ isToggled: !isToggled });
  };

  render() {
    const { isToggled, isLoggedIn } = this.state;
    if (isLoggedIn) {
      return (
        <Navbar dark className="nav-top shadow-sm " expand="sm">
          <Container>
            <NavbarBrand href="/" className="nav-logo">
              <img src={Logo} alt="logo" />
              <img src={Title} alt="title" />
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle}>
              <ImageAvatar />
            </NavbarToggler>
            <Collapse isOpen={isToggled} navbar>
              <Nav className="ml-auto login-img" navbar>
                <Link to="/new-post">
                  <Button className="btn-outline btn-add-article" color="primary">
                    Add Article
                  </Button>
                </Link>
                <UncontrolledDropdown nav inNavbar>
                  <ul className="drop-btn">
                    <Link to="/new-post">
                      <li className="new-art">New Article</li>
                    </Link>

                    <DropdownItem divider />
                    <Link to="/my-articles">
                      {' '}
                      <li>My Articles</li>
                    </Link>
                    <Link to="/">
                      <li>Bookmarks</li>
                    </Link>
                    <DropdownItem divider />
                    <Link to="/">
                      <li>Profile</li>
                    </Link>
                    <DropdownItem divider />
                    <DropdownItem />
                    <Link to="/">
                      <li className="list-footer">Log Out</li>
                    </Link>
                  </ul>
                  <DropdownToggle className="button01">
                    <ImageAvatar />
                  </DropdownToggle>
                  <DropdownMenu>
                    <div className="up-chev"><i className="zmdi zmdi-caret-up zmdi-hc-3x" /></div>
                    <Link to="/my-articles">
                      {' '}
                      <DropdownItem>My Articles</DropdownItem>
                    </Link>
                    <Link to="/">
                      <DropdownItem>Bookmarks</DropdownItem>
                    </Link>
                    <DropdownItem divider />
                    <Link to="/">
                      <DropdownItem>Profile</DropdownItem>
                    </Link>
                    <DropdownItem divider />
                    <DropdownItem />
                    <Link to="/">
                      <DropdownItem>Log Out</DropdownItem>
                    </Link>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      );
    }
    return (
      <Navbar dark className="nav-top shadow-sm p-3" expand="sm">
        <Container>
          <Link to="/">
            <NavbarBrand className="nav-logo">
              <img src={Logo} alt="logo" />
              <img src={Title} alt="title" />
            </NavbarBrand>
          </Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isToggled} navbar>
            <Nav className="ml-auto" navbar>
              <Link to="/login">
                <Button outline className="btn-outline-inverse m-1" color="primary">
                  SIGN IN
                </Button>
              </Link>
              <Link to="/signup">
                <Button outline className="btn-outline m-1" color="primary">
                  GET STARTED
                </Button>
              </Link>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default AppBar;
