import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Welcome from './components/container/Welcome';
import Signup from './components/Auth/Signup';
import Redirect from './components/Auth/Redirect';
import Login from './components/Auth/login';
import ReadArticle from './components/readArticle';
import Editor from './components/editor/editor';
import Articles from './components/articles';
import Reset from './components/container/requestReset';
import UpdatePassword from './components/container/updatePassword';
import Profile from './components/container/profile';
import ProfileEditor from './components/container/profileEditor';
import './index.scss';

const App = () => (
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
      <Route exact path="/updatePassword/:token" component={UpdatePassword} />
      <Route exact path="/:username" component={Profile} />
      <Route exact path="/:username/edit" component={ProfileEditor} />
    </Switch>
  </Router>
);

export default App;
