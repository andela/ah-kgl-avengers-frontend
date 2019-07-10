import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  Button,
  Container,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from 'reactstrap';

import PropTypes from 'prop-types';
import { logoutUser } from '../../redux/action-creators/user';
import Title from '../../assets/images/ah-logo-text.png';
import Logo from '../../assets/images/ah_logo.png';
import ImageAvatar from '../imageAvatar';
import helpers from '../../helpers/decodeToken';

class AppBar extends Component {
  state = {
    isToggled: false,
    isLoggedIn: false,
  };

  componentDidMount = () => {
    this.checkLogin();
  };

  componentDidUpdate = (prevProps) => {
    const { redirect, history } = this.props;
    if (prevProps.redirect !== redirect) {
      if (redirect.to) {
        history.push(redirect.to);
      } else history.push('/');
    }
  };

  static getDerivedStateFromProps(props) {
    const { loggedIn } = props;
    if (typeof loggedIn !== 'undefined' && !loggedIn) {
      return { isLoggedIn: false };
    }
    return null;
  }

  checkLogin = () => {
    const { isLoggedIn } = this.state;
    const profile = helpers.decodeToken();
    if (profile) {
      this.setState({ isLoggedIn: !isLoggedIn });
    }
  };

  logout = () => {
    const { isLoggedIn } = this.state;
    const { onLogoutUser, match } = this.props;
    if (isLoggedIn) {
      const { path: location } = match;
      onLogoutUser({ location });
    }
  };

  toggle = () => {
    const { isToggled } = this.state;
    this.setState({ isToggled: !isToggled });
  };

  render() {
    const { isToggled, isLoggedIn } = this.state;
    const { image, minimal, user } = this.props;
    const { username: userName } = user;
    if (isLoggedIn) {
      return (
        <Navbar dark className="nav-top shadow-sm " expand="sm">
          <Container>
            <Link to="/" className="nav-logo navbar-brand">
              <img src={Logo} alt="logo" className={minimal ? 'nav-logo-hidden' : ''} />
              <img src={Title} alt="title" />
            </Link>
            <NavbarToggler onClick={this.toggle}>
              <ImageAvatar image={image} />
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
                      <li>My Articles</li>
                    </Link>
                    <Link to="/me/bookmarks">
                      <li>Bookmarks</li>
                    </Link>
                    <DropdownItem divider />
                    <Link to={`/${userName}`}>
                      <li>Profile</li>
                    </Link>
                    <DropdownItem divider />
                    <DropdownItem />
                    <li>
                      <DropdownItem className="list-footer" onClick={this.logout}>
                        Log Out
                      </DropdownItem>
                    </li>
                  </ul>
                  <DropdownToggle className="button01">
                    <ImageAvatar image={image || user.image} />
                  </DropdownToggle>
                  <DropdownMenu>
                    <div className="up-chev">
                      <i className="zmdi zmdi-caret-up zmdi-hc-3x" />
                    </div>
                    <Link to="/my-articles">
                      <DropdownItem>My Articles</DropdownItem>
                    </Link>
                    <Link to="/me/bookmarks">
                      <DropdownItem>Bookmarks</DropdownItem>
                    </Link>
                    <DropdownItem divider />
                    <Link to={`/${userName}`}>
                      <DropdownItem>Profile</DropdownItem>
                    </Link>
                    <DropdownItem divider />
                    <DropdownItem />
                    <DropdownItem onClick={this.logout}>Log Out</DropdownItem>
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
          <Link to="/" className="navbar-brand nav-logo">
            <img src={Logo} alt="logo" />
            <img src={Title} alt="title" />
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

AppBar.propTypes = {
  image: PropTypes.string,
  minimal: PropTypes.bool,
  redirect: PropTypes.instanceOf(Object),
  onLogoutUser: PropTypes.func.isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
};

AppBar.defaultProps = {
  image: '',
  minimal: false,
  redirect: { to: '' },
};

const mapStateToProps = ({ user: userReducer }) => {
  const { redirect, loggedIn, user } = userReducer;
  return {
    redirect,
    loggedIn,
    user,
  };
};

export default connect(
  mapStateToProps,
  { onLogoutUser: logoutUser },
)(withRouter(AppBar));
