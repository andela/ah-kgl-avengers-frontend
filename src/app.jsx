import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadUser } from './redux/action-creators/user';
import Welcome from './components/container/Welcome';
import Signup from './components/Auth/Signup';
import Redirect from './components/Auth/Redirect';
import Login from './components/Auth/login';
import ReadArticle from './components/readArticle';
import Editor from './components/editor/editor';
import Articles from './components/articles';
import Reset from './components/container/requestReset';
import UpdatePassword from './components/container/updatePassword';
import Bookmark from './components/container/bookmark';
import Profile from './components/container/profile';
import ProfileEditor from './components/container/profileEditor';
import './index.scss';

import Follow from './components/container/follower';
import 'react-toastify/dist/ReactToastify.css';

toast.configure({
  autoClose: 5000,
  draggable: false,
});

class App extends Component {
  componentDidMount() {
    const { onLoadUser } = this.props;
    onLoadUser();
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route path="/signup" component={Signup} />
          <Route path="/redirect" component={Redirect} />
          <Route path="/login" component={Login} />
          <Route exact path="/articles/:slug" component={ReadArticle} />
          <Route exact path="/new-post" component={Editor} />
          <Route exact path="/my-articles" component={Articles} />
          <Route exact path="/reset" component={Reset} />
          <Route exact path="/me/bookmarks" component={Bookmark} />
          <Route exact path="/updatePassword/:token" component={UpdatePassword} />
          <Route exact path="/:username" component={Profile} />
          <Route exact path="/:username/edit" component={ProfileEditor} />
          <Route exact path="/:username/follow" component={Follow} />
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  onLoadUser: PropTypes.func.isRequired,
};

const mapStateToProps = ({ user: userReducer }) => {
  const { user } = userReducer;
  return { user };
};

export default connect(
  mapStateToProps,
  { onLoadUser: loadUser },
)(App);
